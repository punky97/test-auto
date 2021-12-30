const UTM_CAMPAIGN_ID = "utm_campaign_id"
const UTM_ADSET = "utm_adset"
const UTM_AD = "utm_ad"
const EQUALS = "equals"

const DIV_PARENT = "._1gd4._4li._4muv._3c7k"
const INPUT_UNCHECKED = ".e92713mn.svsqgeze.lftrkhxp.jeej7n5h.qbdq5e12.j90q0chr.rbzcxh88.h8e39ki1.eq4fccyu.qnavoh4n.rjrpm8ub.pu1cs6ci.tds9wb2m.i6alm2u7"
const INPUT_CHECKED = INPUT_UNCHECKED + ":checked"
let HEADER = []
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "start") {
            fetchData()
        }
    }
);
$(document).ready(async function () {
    let db = new Localbase('db')
    getHeader()
    getTimeRange()
    let debounce;
    $("._219p").on('DOMNodeInserted', function (e) {
        clearData()
        clearTimeout(debounce);
        debounce = setTimeout(async function () {
                await checkStatusFetchData()
            }, 1000
        );
    });
    $(document).on("change", "input", async function () {
        clearData()
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
                    if (param.utm_campaign_id === null) {
                        break
                    }
                    ids = param.utm_campaign_id.split(",")
                    id = ids[ids.length - 1]
                    break
                case UTM_ADSET:
                    if (param.utm_adset === null) {
                        break
                    }
                    ids = param.utm_adset.split(",")
                    id = ids[ids.length - 1]
                    break
                case UTM_AD:
                    if (param.utm_ad === null) {
                        break
                    }
                    ids = param.utm_ad.split(",")
                    id = ids[ids.length - 1]
            }

            db.collection('campaign').doc({id: id}).get().then(document => {
                if (typeof document === "undefined") {
                    db.collection('campaign').add({
                        id: id,
                        name: name
                    })
                }
            })
            await checkStatusFetchData()
        }
    })

    $("#CAMPAIGN_GROUP_AdsClassicTab").on("click", async function () {
        await checkStatusFetchData()
    })
    $("#CAMPAIGN_AdsClassicTab").on("click", async function () {
        await checkStatusFetchData()
    })
    $("#ADGROUP_AdsClassicTab").on("click", async function () {
        await checkStatusFetchData()
    })
})

function clearData() {
    $(INPUT_UNCHECKED).each(function () {
        if (!$(this).is(':checked')) {
            $(this).parents(".s7wjoji2.hlufh2qk").parents("._1gd5").find(".generate").remove()
        }
    })
}

function getTimeRange() {
    var e = $(".lfknud7c.ofote1xk.berxdx8z").find("._4u-c.i0ppjblf").find(".icik5mi5").find("._5ldw").find("._1uz0 > div:first")[0];
    if (!e) return [];
    let t = (2 < e.childNodes.length ? e.childNodes[2] : e.childNodes[0]).data;
    var a = t.trim().split("–").map(e => {
            let t = new Date(e.trim());
            let day = t.getDate()
            let month = t.getMonth()
            day = (day < 10) ? '0' + day : day
            month = month + 1
            month = (month < 10) ? '0' + month : month
            return `${t.getFullYear()}-${month}-` + day
        }),
        e = a[0],
        a = a[1] || e;
    return [e, a]
}

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
            case "Website purchase ROAS (return on advertising spend) ":
                HEADER["web_roas"] = $(this).attr("style").split(";")[2]
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

async function checkStatusFetchData(delay = 500) {
    let status = await getFromStorage("status");
    if (status !== "on") {
        return
    }
    getHeader()
    setTimeout(function () {
        fetchData()
    }, delay)
}

function fakeData(data) {
    let param = parserParam()
    let ids = []
    switch (param.group_by) {
        case UTM_CAMPAIGN_ID:
            if (param.utm_campaign_id !== null && param.utm_campaign_id.length > 0) {
                ids = param.utm_campaign_id.split(",")
            }
            break
        case UTM_ADSET:
            if (param.utm_adset !== null && param.utm_adset.length > 0) {
                ids = param.utm_adset.split(",")
            }
            break
        case UTM_AD:
            if (param.utm_ad !== null && param.utm_ad.length > 0) {
                ids = param.utm_ad.split(",")
            }
    }
    if (ids.length < 1) {
        return []
    }
    let map = []
    for (let val of data) {
        if (UTM_CAMPAIGN_ID in val) {
            map[val[UTM_CAMPAIGN_ID]] = true
            break
        }
        if (UTM_ADSET in val) {
            map[val[UTM_ADSET]] = true
            break
        }
        if (UTM_AD in val) {
            map[val[UTM_AD]] = true
        }
    }
    for (let val of ids) {
        if (typeof map[val] === "undefined") {
            let ob = {
                add_to_cart: 0,
                reached_checkout: 0,
                total_orders: 0,
                total_sales: 0,
                view_content: 0
            }
            ob[param.group_by] = val
            data.push(ob)
        }
    }
    fillData(data)

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
            if (typeof nameCache === "undefined" || nameCache.length < 1) {
                return
            }
            $(INPUT_CHECKED).each(function (e) {
                let name = $(this).parents("._3pzj").find("._3dfi._3dfj").text()
                if (nameCache !== name) {
                    return
                }
                let amount_spent = 0
                if (typeof HEADER["amount_spent"] !== "undefined") {
                    amount_spent = $(this).parents(DIV_PARENT).find(`[style*="${HEADER["amount_spent"]}"]`).text()
                    if (amount_spent.length > 0) {
                        amount_spent = amount_spent.replace(/[^\d\.]/g, '')
                    } else {
                        amount_spent = 0
                    }
                }
                let roas = "-"
                if (amount_spent > 0) {
                    roas = (val["total_sales"] / amount_spent).toFixed(2)
                }
                if (typeof HEADER["view_content"] !== "undefined") {
                    let view_content = $(this).parents(DIV_PARENT).find(`[style*="${HEADER["view_content"]}"]`).find(".ellipsis._1ha3")
                    if (view_content.find("span").length === 1) {
                        view_content.prepend(generateHtml(val["view_content"]));
                    } else {
                        view_content.find("span:first").find(".dgpf1xc5.lyf0d8tr").text(val["view_content"])
                    }
                }
                if (typeof HEADER["add_to_cart"] !== "undefined") {
                    let add_to_cart = $(this).parents(DIV_PARENT).find(`[style*="${HEADER["add_to_cart"]}"]`).find(".ellipsis._1ha3")
                    if (add_to_cart.find("span").length === 1) {
                        add_to_cart.prepend(generateHtml(val["add_to_cart"]));
                    } else {
                        add_to_cart.find("span:first").find(".dgpf1xc5.lyf0d8tr").text(val["add_to_cart"])
                    }
                }
                if (typeof HEADER["reached_checkout"] !== "undefined") {
                    let reached_checkout = $(this).parents(DIV_PARENT).find(`[style*="${HEADER["reached_checkout"]}"]`).find(".ellipsis._1ha3")
                    if (reached_checkout.find("span").length === 1) {
                        reached_checkout.prepend(generateHtml(val["reached_checkout"]));
                    } else {
                        reached_checkout.find("span:first").find(".dgpf1xc5.lyf0d8tr").text(val["reached_checkout"])
                    }
                }
                if (typeof HEADER["total_orders"] !== "undefined") {
                    let total_orders = $(this).parents(DIV_PARENT).find(`[style*="${HEADER["total_orders"]}"]`).find(".ellipsis._1ha3")
                    if (total_orders.find("span").length === 1) {
                        total_orders.prepend(generateHtml(val["total_orders"]));
                    } else {
                        total_orders.find("span:first").find(".dgpf1xc5.lyf0d8tr").text(val["total_orders"])
                    }
                }
                if (typeof HEADER["web_roas"] !== "undefined") {
                    let web_roas = $(this).parents(DIV_PARENT).find(`[style*="${HEADER["web_roas"]}"]`).find(".ellipsis._1ha3")
                    if (web_roas.find("span").length === 1) {
                        web_roas.prepend(generateHtml(roas));
                    } else {
                        web_roas.find("span:first").find(".dgpf1xc5.lyf0d8tr").text(roas)
                    }
                }
                if (typeof HEADER["roas"] !== "undefined") {
                    let roas2 = $(this).parents(DIV_PARENT).find(`[style*="${HEADER["roas"]}"]`).find(".ellipsis._1ha3")
                    if (roas2.find("span").length === 1) {
                        roas2.prepend(generateHtml(roas));
                    } else {
                        roas2.find("span:first").find(".dgpf1xc5.lyf0d8tr").text(roas)
                    }
                }
            })
        }, 1000)
    }
}

function generateHtml(val) {
    return `<span class="generate"><div class="dgpf1xc5 lyf0d8tr" style="font-weight: bold;color: orange; padding-right: 5px;">${val}</div></span>`
}

// call api
function fetchData() {
    let param = parserParam()
    if (!param.fb_ads) {
        return
    }
    if (param.account_id === null || param.account_id.length < 1) {
        return
    }
    let split_date = getTimeRange()
    let filters = []
    let utm_campaign_id = parserData(param.utm_campaign_id)
    if (utm_campaign_id.length > 0 && param.group_by === UTM_CAMPAIGN_ID) {
        filters.push({
            field: UTM_CAMPAIGN_ID,
            operator: EQUALS,
            value: utm_campaign_id
        })
    }
    let utm_adset = parserData(param.utm_adset)
    if (utm_adset.length > 0 && param.group_by === UTM_ADSET) {
        filters.push({
            field: UTM_ADSET,
            operator: EQUALS,
            value: utm_adset
        })
    }
    let utm_ad = parserData(param.utm_ad)
    if (utm_ad.length > 0 && param.group_by === UTM_AD) {
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
        url: ANALYTIC_URL + param.account_id,
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
            fakeData(response.data)
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
        account_id: url.searchParams.get("act")
    }
}
