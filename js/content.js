const BASE_URL = "https://gapi.dev.shopbase.net/admin/analytics/app?account_id="
const FB_ADS = "https://www.facebook.com/adsmanager/manage"

const UTM_CAMPAIGN_ID = "utm_campaign_id"
const UTM_ADSET = "utm_adset"
const UTM_AD = "utm_ad"
const EQUALS = "equals"

const DIV_PARENT = "._1gd4._4li._4muv._3c7k"
const INPUT_CHECKED = ".e92713mn.svsqgeze.lftrkhxp.jeej7n5h.qbdq5e12.j90q0chr.rbzcxh88.h8e39ki1.eq4fccyu.qnavoh4n.rjrpm8ub.pu1cs6ci.tds9wb2m.i6alm2u7:checked"
const INPUT_CHECKBOX = ".e92713mn.svsqgeze.lftrkhxp.jeej7n5h.qbdq5e12.j90q0chr.rbzcxh88.h8e39ki1.eq4fccyu.qnavoh4n.rjrpm8ub.pu1cs6ci.tds9wb2m.i6alm2u7"
let HEADER = []
$(document).ready(async function () {
    let db = new Localbase('db')
    getHeader()
    let debounce;
    $("._219p").on('DOMNodeInserted', function (e) {
        clearTimeout(debounce);
        debounce = setTimeout(
            async function () {
                let status = await getFromStorage("status");
                if (status !== "on") {
                    return
                }
                fetchData()
            }, 2000
        );
    });
    $(INPUT_CHECKBOX).on("change", async function () {
        if ($(this).is(':checked')) {
            let param = parserParam()
            if (!param.fb_ads) {
                return
            }
            let name = $(this).parents("._3pzj").find("._3dfi._3dfj").text()
            let ids = []
            let id = ""
            switch (param.group_by) {
                case UTM_CAMPAIGN_ID:
                    ids = param.utm_campaign_id.split(",")
                    id = ids[ids.length - 1]
                    break
                case UTM_ADSET:
                    ids = param.utm_adset.split(",")
                    id = ids[ids.length - 1]
                    break
                case UTM_AD:
                    ids = param.utm_ad.split(",")
                    id = ids[ids.length - 1]
            }

            db.collection('campaign').add({
                id: id,
                name: name
            })
        }
    })

    $("#CAMPAIGN_GROUP_AdsClassicTab").on("click", async function () {
        let status = await getFromStorage("status");
        if (status !== "on") {
            return
        }
        setTimeout(function () {
            fetchData()
        }, 500)
    })
    $("#CAMPAIGN_AdsClassicTab").on("click", async function () {
        let status = await getFromStorage("status");
        if (status !== "on") {
            return
        }
        setTimeout(function () {
            fetchData()
        }, 500)
    })
    $("#ADGROUP_AdsClassicTab").on("click", async function () {
        let status = await getFromStorage("status");
        if (status !== "on") {
            return
        }
        setTimeout(async function () {
            await fetchData()
        }, 2000)
    })
})

function getHeader() {
    HEADER = []
    $("._1eyh._1eyi").each(function (e) {
        let name = $(this).text()
        switch (name) {
            case "Amount spent ":
                HEADER["amount_spent"] = $(this).attr("style").split(";")[2]
                break
            case "Content views ":
                HEADER["view_content"] = $(this).attr("style").split(";")[2]
                break
            case "Adds to cart ":
                HEADER["add_to_cart"] = $(this).attr("style").split(";")[2]
                break
            case "Checkouts Initiated ":
                HEADER["reached_checkout"] = $(this).attr("style").split(";")[2]
                break
            case "Purchases ":
                HEADER["total_orders"] = $(this).attr("style").split(";")[2]
                break
            case "Purchases Conversion Value ":
                HEADER["total_sales"] = $(this).attr("style").split(";")[2]
                break
            case "Purchase ROAS (return on ad spend) ":
                HEADER["roas"] = $(this).attr("style").split(";")[2]
        }
    })
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

function readIndexDB() {

}

function fillData(data) {
    let db = new Localbase('db')
    for (let val of data) {
        let nameCache = ""
        if (UTM_CAMPAIGN_ID in val) {
            db.collection('campaign').doc({id: val[UTM_CAMPAIGN_ID]}).get().then(document => {
                nameCache = document.name
            })
        }
        if (UTM_ADSET in val) {
            db.collection('campaign').doc({id: val[UTM_ADSET]}).get().then(document => {
                nameCache = document.name
            })
        }
        if (UTM_AD in val) {
            db.collection('campaign').doc({id: val[UTM_AD]}).get().then(document => {
                nameCache = document.name
            })
        }
        setTimeout(function () {
            if (nameCache === "undefined" && nameCache.length < 1) {
                return
            }
            $(INPUT_CHECKED).each(function (e) {
                let name = $(this).parents("._3pzj").find("._3dfi._3dfj").text()
                if (nameCache !== name) {
                    return
                }
                if (typeof data[e] === "undefined") {
                    return
                }
                let amount_spent = 0
                if (HEADER["amount_spent"] !== "undefined") {
                    amount_spent = $(this).parents(DIV_PARENT).find(`[style*="${HEADER["amount_spent"]}"]`).text()
                    if (amount_spent.length > 0) {
                        amount_spent = amount_spent.replace(/[^\d\.]/g, '')
                    } else {
                        amount_spent = 0
                    }
                }
                let roas = "-"
                if (amount_spent > 0) {
                    roas = Math.round((data[e].total_sales / amount_spent), 2)
                }
                if (HEADER["view_content"] !== "undefined") {
                    $(this).parents(DIV_PARENT).find(`[style*="${HEADER["view_content"]}"]`).find(".dgpf1xc5.lyf0d8tr").text(val["view_content"])
                }
                if (HEADER["add_to_cart"] !== "undefined") {
                    $(this).parents(DIV_PARENT).find(`[style*="${HEADER["add_to_cart"]}"]`).find(".dgpf1xc5.lyf0d8tr").text(val["add_to_cart"])
                }
                if (HEADER["reached_checkout"] !== "undefined") {
                    $(this).parents(DIV_PARENT).find(`[style*="${HEADER["reached_checkout"]}"]`).find(".dgpf1xc5.lyf0d8tr").text(val["reached_checkout"])
                }
                if (HEADER["total_orders"] !== "undefined") {
                    $(this).parents(DIV_PARENT).find(`[style*="${HEADER["total_orders"]}"]`).find(".dgpf1xc5.lyf0d8tr").text(val["total_orders"])
                }
                if (HEADER["total_sales"] !== "undefined") {
                    $(this).parents(DIV_PARENT).find(`[style*="${HEADER["total_sales"]}"]`).find(".dgpf1xc5.lyf0d8tr").text(val["total_sales"])
                }
                if (HEADER["roas"] !== "undefined") {
                    $(this).parents(DIV_PARENT).find(`[style*="${HEADER["roas"]}"]`).find(".dgpf1xc5.lyf0d8tr").text(roas)
                }
            })
        }, 1000)
    }
}

// call api
function fetchData() {
    let param = parserParam()
    if (!param.fb_ads) {
        return
    }
    if (param.account_id === null || param.date === null || param.account_id.length < 1 || param.date.length < 1) {
        return
    }
    let split_date = param.date.split("_")
    let filters = []
    let utm_campaign_id = parserData(param.utm_campaign_id)
    if (utm_campaign_id.length > 0) {
        filters.push({
            field: UTM_CAMPAIGN_ID,
            operator: EQUALS,
            value: utm_campaign_id
        })
    }
    let utm_adset = parserData(param.utm_adset)
    if (utm_adset.length > 0) {
        filters.push({
            field: UTM_ADSET,
            operator: EQUALS,
            value: utm_adset
        })
    }
    let utm_ad = parserData(param.utm_ad)
    if (utm_ad.length > 0) {
        filters.push({
            field: UTM_AD,
            operator: EQUALS,
            value: utm_ad
        })
    }
    if (filters.length < 1) {
        return
    }
    let is_call = false
    for (let i = 0; i < filters.length; i++) {
        if (filters[i].field === param.group_by) {
            is_call = true
            break
        }
    }
    if (!is_call) {
        return
    }
    $.ajax({
        url: BASE_URL + param.account_id,
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({
            report_type: "fb_ads",
            from_time: split_date[0] + "T00:00:00",
            to_time: split_date[1] + "T23:59:59",
            filters: filters,
            group_by: [param.group_by]
        }),
        dataType: "json",
        success: function (response) {
            if (response.data.length > 0) {
                fillData(response.data)
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
        }
    });
}


function parserData(data) {
    if (data === null || data.length < 1) {
        return ""
    }
    let arr = data.split(",")
    let res = ""
    for (let i = 0; i < arr.length; i++) {
        res = res + `'${arr[i]}',`
    }
    res = res.slice(0, -1);
    return res
}

function parserParam() {
    let url = new URL(window.location.href);
    if (url.href.search(FB_ADS) < 0) {
        return {
            fb_ads: false
        }
    }
    let path_name = url.pathname.split("/")
    let group_by = ""
    switch (path_name[3]) {
        case "campaigns":
            group_by = UTM_CAMPAIGN_ID
            break
        case "adsets":
            group_by = UTM_ADSET
            break
        case "ads":
            group_by = UTM_AD
            break
        default:
            group_by = UTM_AD
    }
    return {
        fb_ads: true,
        group_by: group_by,
        utm_campaign_id: url.searchParams.get("selected_campaign_ids"),
        utm_adset: url.searchParams.get("selected_adset_ids"),
        utm_ad: url.searchParams.get("selected_ad_ids"),
        account_id: url.searchParams.get("act"),
        date: url.searchParams.get("date"),
    }
}
