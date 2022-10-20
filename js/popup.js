$(document).ready(async function () {
    await getInfoAds()
    let status = await getFromStorage("status");
    if (status === "on") {
        $("input[name=on_off]").prop("checked", true)
    } else {
        $("input[name=on_off]").prop("checked", false)
    }
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    $('input[name=on_off]').on("change", async function () {
        if ($(this).is(":checked")) {
            chrome.storage.sync.set({"status": "on"});
            chrome.tabs.sendMessage(tab.id, {"message": "start"});
        } else {
            chrome.storage.sync.set({"status": "off"});
            chrome.tabs.sendMessage(tab.id, {"message": "close"});
        }
    })
})

async function getInfoAds() {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    let url = new URL(tab.url);
    let account_id = url.searchParams.get("act");
    if (account_id === null || account_id.length < 1) {
        return
    }
    $.ajax({
        url: ACCOUNT_URL + account_id,
        type: 'GET',
        contentType: "application/json",
        success: function (response) {
            if (response.hasOwnProperty('fb_ads_element') && response.fb_ads_element.length) {
                chrome.storage.sync.set({"ele": response.fb_ads_element})
            }
            $(".acc_id").text(response.account_id)
            $(".time_zone").text(getTimeZone(response.timezone))
            $(".has_data").removeClass("hide");
            $(".not_found").addClass("hide");
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $(".not_found").removeClass("hide");
            $(".has_data").addClass("hide");
        }
    });
}

function getTimeZone(timezone) {
    const date = new Date()
    let val = TIME_ZONE.filter(v => v.value === timezone)
    if (val.length < 1) {
        return timezone
    }
    return `(GMT${moment(date).tz(timezone).format('Z')}) ${
        val[0].name
    }`
}

async function getFromStorage(key) {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(key, resolve);
    })
        .then(result => {
            if (key == null) return result;
            else return result[key];
        });
}