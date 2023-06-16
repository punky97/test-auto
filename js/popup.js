document.addEventListener("DOMContentLoaded", () => {
  LoadData();
  addEvent();
});

const getFromStorage = (key) => {
  let res;
  chrome.storage.local.get([key], function (result) {
    res = result[key];
  });
  return res;
};
const getAuth = () => {
  const account = document.getElementById("user").value;
  const token = document.getElementById("token").value;
  return `Basic ${btoa(`${account}:${token}`)}`;
};

const jenkinsFetch = async (url) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", getAuth());

  const response = await fetch(url, {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  });
  const res = { success: true };
  if (response.status !== 201) {
    res.success = false;
    res.status = response.status;
  }
  return Object.assign(res, response.json());
};

// params
const build = async (params) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", getAuth());

  var urlencoded = new URLSearchParams();
  urlencoded.append("TEST_FILE_OR_FOLDER", params.PATH.trim());
  urlencoded.append("SUITE_ID_OR_CASE_ID", params.SUITE_ID_OR_CASE_ID.trim());
  urlencoded.append("BRANCH", params.BRANCH);
  urlencoded.append("CI_ENV", params.CI_ENV);

  if (params.JOB === jobScreenShotUrl) {
    urlencoded.append("IS_GEN_SNAPSHOTS_JOB", "true");
  } else {
    urlencoded.append("SHARDS", "1");
    urlencoded.append("TH_JOB_ID", "-1");
    urlencoded.append("TH_JOB_NAME", params.SUITE_ID_OR_CASE_ID);
  }

  const response = await fetch(params.JOB + "buildWithParameters", {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  });
  const res = { success: true };
  if (response.status !== 201) {
    res.success = false;
    res.status = response.status;
  }
  return res;
};

const getStatusOne = async (url, number) => {
  return await jenkinsFetch(
    `${url}${number}/api/json?tree=number,actions,url,result`
  );
};

const getNextBuild = async (url) => {
  return await jenkinsFetch(`${url}/api/json?tree=nextBuildNumber`);
};

const getLastBuild = async (url) => {
  return await jenkinsFetch(`${url}/api/json?tree=nextBuildNumber`);
};

const buildAction = async () => {
  chrome.cookies.getAll(
    { domain: "autopilot.shopbase.dev" },
    function (cookies) {
      for (var i = 0; i < cookies.length; i++) {
        console.log(cookies[i]);

        chrome.cookies.remove({
          url: "https://" + cookies[i].domain + cookies[i].path,
          name: cookies[i].name,
        });
      }
    }
  );

  document.getElementById("btnSubmit").disabled = true;
  const user = document.getElementById("user").value.trim();
  const token = document.getElementById("token").value.trim();
  // job
  const job = document.getElementById("job").value.trim();
  const jobUrl = getJobUrl(job);

  // get next number
  // const nextNumber = await getNextBuild(jobUrl).then((res) => {
  //   return res.nextBuildNumber;
  // });

  // env
  const envs = document.getElementById("env").value.trim();
  // branch
  const branch = document.getElementById("branch").value.trim();
  const path = document.getElementById("path").value.trim();
  // SUITE_ID_OR_CASE_ID
  const cases = document.getElementById("case").value.replace(/ /g, "");
  const tCases = cases.split(",");

  const errors = [];
  const successTc = [];

  if (isInvalidParams([user, token, envs, branch, path])) {
    errors.push("Params is not valid");
    return handleBuildResponse(400, successTc, errors);
  }

  const allJob = chrome.storage.local;

  //   const multipleCase = supportMultipleTC(job);
  //   const multipleEnv = supportMultipleEnv(job);

  //   let runTc = [];
  //   let runEnv = [];
  //   if (multipleCase) {
  //     runTc.push(`(${tCases.join("|")})`);
  //   } else {
  //     runTc = tCases;
  //   }

  for (const tc of tCases) {
    const res = await build({
      SUITE_ID_OR_CASE_ID: tc,
      CI_ENV: envs,
      BRANCH: branch,
      JOB: jobUrl,
      PATH: path,
    });
    if (!res.success) {
      if (res.status >= 400) {
        return handleBuildResponse(res.status, successTc, errors);
      }
      errors.push(tc);
      continue;
    }
    allJob[tc] = {
      name: tc,
      url: "",
      status: "building",
      mapped: false,
      number: 1,
    };
    successTc.push(tc);
  }
  return handleBuildResponse(200, successTc, errors);
};

const supportMultipleTC = (job) => {
  switch (job) {
    case "hoanguyen":
      return true;
    default:
      return false;
  }
};

const supportMultipleEnv = (job) => {
  switch (job) {
    case "hoanguyen":
      return true;
    default:
      return false;
  }
};

const isInvalidParams = (params) => {
  return params.some((v) => !v || !v.length);
};

const handleBuildResponse = (code, successTc, errors) => {
  document.getElementById("btnSubmit").disabled = false;
  const updateUl = (id, list) => {
    let ul = document.getElementById(id);
    ul.innerHTML = "";
    if (list && list.length) {
      list.forEach((e) => {
        const li = document.createElement("li");
        li.textContent = e;
        ul.appendChild(li);
      });
    }
  };
  switch (code) {
    case 200:
      break;
    case 401:
      errors.push("Unauthorized");
      break;
    case 403:
      errors.push("403, Plz run once again");
      break;
    default:
      errors.push(`Status code: ${code}`);
  }
  updateUl("errors", errors);
  updateUl("successTC", successTc);
};

const getJobUrl = (name) => {
  switch (name) {
    case "hoanguyen":
      return jobHoaNguyenUrl;
    case "screenshot":
      return jobScreenShotUrl;
    default:
      return jobOriginalUrl;
  }
};

const mapUrlOfCase = async (fromNumber, jobUrl, tCases) => {
  const lastBuild = await getLastBuild(jobUrl);
  const lastNumber = lastBuild.number;
  const result = {};
  for (let i = fromNumber; i >= lastNumber; i++) {
    let job;
    if (i === lastNumber) {
      job = lastBuild;
    } else {
      job = await getStatusOne(jobUrl, i);
    }

    const jobCase = getJobCaseId(job);
    if (!tCases.contains(jobCase)) {
      continue;
    }
    result[jobCase] = {
      url: job.url,
      number: job.number,
    };
    if (job.result !== null) {
      result[jobCase].status = job.result;
    }
  }
};

const getJobCaseId = (job) => {
  return job.actions[0].parameters.find((e) => e.name === "SUITE_ID_OR_CASE_ID")
    .value;
};

const addEvent = () => {
  const inputs = document.getElementsByClassName("c-input");
  for (let i = 0; i < inputs.length; i++) {
    const inp = inputs[i];
    inp.addEventListener(
      "keyup",
      debounce(() => saveKeyToLocal())
    );
  }
  document.getElementById("btnSubmit").addEventListener("click", buildAction);
  document.getElementById("job").addEventListener(
    "change",
    debounce(() => saveKeyToLocal())
  );

  document
    .getElementsByClassName("c-head")[0]
    .addEventListener("click", (e) => {
      const content = document.getElementsByClassName("c-body")[0];
      if (content.clientHeight == 0) {
        content.style.opacity = 1;
        content.style.zIndex = 1;
        setTimeout(() => {
          content.style.height = "120px";
        }, 200);
        content.style.height = "120px";
      } else {
        content.style.height = "0px";
        setTimeout(() => {
          content.style.zIndex = -1;
          content.style.opacity = 0;
        }, 200);
      }
    });
};

function getParamsSaved() {
  return ["user", "token", "job", "env", "branch", "case", "path"];
}

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

function LoadData() {
  var paramsSaved = getParamsSaved();
  var storage = chrome.storage.local;
  paramsSaved.forEach((element) => {
    storage.get([element], function (result) {
      if (result[element]) {
        document.getElementById(element).value = result[element];
      }
    });
  });
}

function saveKeyToLocal() {
  var paramsSaved = getParamsSaved();
  var storage = chrome.storage.local;

  paramsSaved.forEach((element) => {
    var obj = {};
    var data = document.getElementById(element).value;
    obj[element] = data;
    storage.set(obj, function () {
      console.log(element + " is set to " + data);
    });
  });
}
