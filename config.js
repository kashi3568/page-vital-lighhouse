export const psiConfig = {
    iterationNum: 20,
    numberOfRounds: 1,
    platform: 'desktop,mobile',
    apiKey:'AIzaSyD4bON54gdhILV0mcgsTwFaOvf5SEhxcY0',
    threshold: {
        pageScore: 80,
        TBT: 60,
        LCP: 200,
        TTFB: 1100,
        FCP: 2400,
        TTI: 6000,
        pageSize: 1,
        FID: 150,
        speedIndex: 3200,

    },
    webhookUrl: 'https://infoedge.webhook.office.com/webhookb2/579ee5d7-4bad-4ab1-ad17-88fe7990efc0@0ee9b5f9-52b3-4351-8198-c4804cd66b68/IncomingWebhook/6f3172b14c7e4c86b33adc6b6277ec4c/ae53fe4a-0c45-4124-a96a-362958ffb6d1'
};


export default {
    psiConfig,
}
