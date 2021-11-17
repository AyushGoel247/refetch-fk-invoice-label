const fetch = require("node-fetch");
const arr = [];
const failedSpCodes = [];
const cookie =
    "km_ai=HxVglQGzdzRDX4Rsjtl9C7Wkguc=; km_lv=x; _gcl_au=1.1.526282811.1632721958; _fbp=fb.1.1635669394326.1989444895; _hjid=52093fd1-4947-493b-bb4e-495bc6e78913; _ga_0SJLGHBL81=GS1.1.1635905597.1.1.1635906438.0; AMCV_55CFEDA0570C3FA17F000101@AdobeOrg=-227196251|MCIDTS|18935|MCMID|60425124660110599313706078414542779921|MCOPTOUT-1635913640s|NONE|MCAID|NONE; s_nr=1635906440581-New; _clck=iv5t4u|1|ew4|0; _gid=GA1.2.265361282.1636349717; __zlcmid=16xkSste72KzI7t; _ga=GA1.1.266782178.1630497156; _ga_P9KW1K4EYH=GS1.1.1636369950.3.1.1636371626.60; JSESSIONID=BE8F49C4F46A489DFD9265B730791DEC; __utmc=130562333; __utma=130562333.266782178.1630497156.1636379334.1636382718.4; __utmz=130562333.1636382718.4.4.utmcsr=wormhole.unicommerce.com|utmccn=(referral)|utmcmd=referral|utmcct=/; __utmt=1; km_vs=1; _ga_PNTTVDC8DK=GS1.1.1636382715.297.1.1636382721.0; __utmb=130562333.2.10.1636382718; kvcd=1636382727174";
const tenantCode = "capl";

async function refetchLabel() {
    for (let spCode of arr) {
        console.log("Refetching label for  : ", spCode);
        try {
            const res = await fetch(`https://${tenantCode}.unicommerce.com/data/oms/shipment/refetchShippingLabel`, {
                headers: {
                    accept: "application/json, text/plain, */*",
                    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                    "content-type": "application/json",
                    "sec-ch-ua": '"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"',
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": '"macOS"',
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    cookie: cookie,
                    Referer: `https://${tenantCode}.unicommerce.com/ng/order/shipments?orderCode=22332177244906300&shipmentCode=${spCode}`,
                    "Referrer-Policy": "strict-origin-when-cross-origin",
                },
                body: `{"shippingPackageCode":"${spCode}"}`,
                method: "POST",
            });
            const data = await res.json();
            // console.log(`Response for : ${spCode}`, data);
            if (!data.successful) failedSpCodes.push(spCode);
        } catch (error) {
            failedSpCodes.push(spCode);
        }
    }
    console.log("Failed SpCodes : ", failedSpCodes);
}

refetchLabel();
