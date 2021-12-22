const BASE_URL = "https://gapi.dev.shopbase.net/admin/sales-channel/app?account_id="
$(document).ready(async function () {
    await getInfoAds()
    let status = await getFromStorage("status");
    if (status === "on") {
        $("input[name=on_off]").prop("checked", true)
    } else {
        $("input[name=on_off]").prop("checked", false)
    }
    $('input[name=on_off]').on("change", async function () {
        if ($(this).is(":checked")) {
            chrome.storage.sync.set({"status": "on"});
        } else {
            chrome.storage.sync.set({"status": "off"});
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
        url: BASE_URL + account_id,
        type: 'GET',
        contentType: "application/json",
        success: function (response) {
            $(".acc_id").text(response.account_id)
            $(".time_zone").text(response.timezone)
            $(".has_data").removeClass("hide");
            $(".not_found").addClass("hide");
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $(".not_found").removeClass("hide");
            $(".has_data").addClass("hide");
        }
    });
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