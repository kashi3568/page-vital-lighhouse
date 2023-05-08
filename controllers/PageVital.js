import pageVitalService from "../service/PageVitalService.js";
import pageVitalComputedService from "../service/PageVitalComputedService.js";
import urlService from "../service/UrlService.js";
import axios from 'axios';
import { psiConfig } from "../config.js";
import {getSpeedData} from "../scripts/generateScore.js";
import moment from "moment";
import puppeteer from 'puppeteer';
import { generateLightHouseReport } from "../scripts/genrateLightHouseReport.js";



export const getAllPageVitals = async (req, res) => {
  try {
    const pageVital = await pageVitalService.getAllPageVitals();
    res.json({ data: pageVital, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// export const createPageVital = async (req, res) => {
//   try {
//     const pageVital = await pageVitalService.createPageVital(req.body);
//     res.json({ data: pageVital, status: "success" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

export const getPageVitalById = async (req, res) => {
  try {
    const pageVital = await pageVitalService.getPageVitalById(req.params.id);
    res.json({ data: pageVital, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePageVital = async (req, res) => {
  try {
    const pageVital = await pageVitalService.updatePageVital(req.params.id, req.body);
    res.json({ data: pageVital, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePageVital = async (req, res) => {
  try {
    const pageVital = await pageVitalService.deletePageVital(req.params.id);
    res.json({ data: pageVital, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export async function createPageVital(data) {
  console.log('storing data', data);
  // let a = {
  //   testUrl: "https://www.99acres.com/property-in-noida-ffid",
  //   PerformanceScore: 84,
  //   TTFB: 1346.067,
  //   labFCP: 2434,
  //   labLCP: 3109,
  //   labCLS: 0.002,
  //   TTI: 5875,
  //   speedIndex: 4826,
  //   TBT: 203,
  //   labMaxFID: 211,
  //   pageSize: 0.893,
  //   firstPartyJSTransfer: 311.462,
  //   firstPartyJSResource: 1308.989,
  //   thirdPartyJSTransfer: 7.203,
  //   thirdPartyJSResource: 29.312,
  //   date: "2023-05-02 14:34",
  //   device: "mobile",
  //   benchmarkIndex: 627,
  // }
  const pageVital = await pageVitalService.createPageVital(data);
  console.log('stored data');

}

async function createPageVitalComputed(data) {
  console.log('storing data', data);
  // let a = {
  //   testUrl: "https://www.99acres.com/property-in-noida-ffid",
  //   PerformanceScore: 73.5,
  //   TTFB: 934.821,
  //   labFCP: 1942,
  //   labLCP: 3137,
  //   labCLS: 0.0035,
  //   TTI: 6196.5,
  //   speedIndex: 3885,
  //   TBT: 638,
  //   labMaxFID: 277,
  //   pageSize: 0.8905000000000001,
  //   date: "2023-05-02 15:38",
  // calculationLogic: "Average" // Median
  // }
  const pageVital = await pageVitalComputedService.createPageVitalComputed(data);
  console.log('stored data');

}

async function computePageVItalData() {
  const date = new moment().subtract(1, 'day')
  const previousDayMedianData = await pageVitalComputedService.getPageVitalComputedByDates(date);

  previousDayMedianData.map(async (urlMedianData) => {

    const urlData = await urlService.getUrlByName(urlMedianData._id.testUrl);
    x
    if (urlMedianData.avgLabLCP > psiConfig.threshold.LCP) {
      sendAlert({ title: `LCP is above thresold`, moduleName: urlData[0]?.module })
    }
    if (urlMedianData.avgLabFCP > psiConfig.threshold.FCP) {
      sendAlert({ title: `FCP is above thresold`, moduleName: urlData[0]?.module })
    }
    if (urlMedianData.avgTTFB > psiConfig.threshold.TTFB) {
      sendAlert({ title: `TTFB is above thresold`, moduleName: urlData[0]?.module })
    }
    if (urlMedianData.avgTTI > psiConfig.threshold.TTI) {
      sendAlert({ title: `TTI is above thresold`, moduleName: urlData[0]?.module })
    }
    if (urlMedianData.avgTBT > psiConfig.threshold.TBT) {
      sendAlert({ title: `TBT is above thresold`, moduleName: urlData[0]?.module })
    }
    if (urlMedianData.avgPageSize > psiConfig.threshold.pageSize) {
      sendAlert({ title: `Page size is above thresold`, moduleName: urlData[0]?.module })
    }
    if (urlMedianData.avgLabMaxFID > psiConfig.threshold.FID) {
      sendAlert({ title: `FID is above thresold`, moduleName: urlData[0]?.module })
    }

    if (urlMedianData.avgSpeedIndex > psiConfig.threshold.speedIndex) {
      sendAlert({ title: `SPeed Index is above thresold`, moduleName: urlData[0]?.module })
    }

    if (+urlMedianData.avgPerformanceScore < psiConfig.threshold.pageScore) {
      sendAlert({ title: `Page score is below thresold`, moduleName: urlData[0]?.module })
    }


  })
  console.log(previousDayMedianData);
}


async function getJsAndCssFiles() {

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium',
    headless: false,
  });
  const page = await browser.newPage();

  // Navigate to the page you want to analyze
  await page.goto('https://www.99acres.com');

  // Get all the JavaScript files loaded on the page
  const jsFiles = await page.$$eval('script[src]', scripts => {
    return scripts.map(script => {
      return {
        url: script.src,
        size: script.src.length // You can also use script.size to get the size in bytes
      };
    });
  });

  // Get all the CSS files loaded on the page
  const cssFiles = await page.$$eval('link[rel="stylesheet"][href]', links => {
    return links.map(link => {
      return {
        url: link.href,
        size: link.href.length // You can also use link.size to get the size in bytes
      };
    });
  });

  console.log(jsFiles);
  console.log(cssFiles);

  await browser.close();
}

async function sendAlert({ title, text, moduleName, Vital }) {


  const webhookUrl = psiConfig.webhookUrl;
  const message = {
    '@type': 'MessageCard',
    'themeColor': '0072C6',
    'title': `${moduleName}-${title}`,
    'text': 'This is a sample message sent from a Node.js app using the Axios library and a Microsoft Teams webhook.'
  };

  await axios.post(webhookUrl, message)
    .then((res) => {
      console.log(`statusCode: ${res.status}`);
    })
    .catch((error) => {
      console.error(error);
    });
}


export const generatePageVitalData = async (req, res) => {
  try {
    // await getJsAndCssFiles();
    const urls = await urlService.getAllUrls();
    // createPageVital();
    let urlList = urls.map((urlsss) => urlsss.name);
    let setSuccessCount = 0;
    let setQueueCount = 0;
    let setTotalUrlCount = 0;
    let setProgress = 0;
    let setMobileTestScores = [];
    let setDesktopTestScores = [];
    let setMobileMedianScores = [];
    let setDesktopMedianScores = [];
    let setMobileAverageScores = [];
    let setDesktopAverageScores = [];
    let setMobileOriginFieldData = [];
    let setDesktopOriginFieldData = [];
    let setSnackBar = {
      open: false,
      message: "",
      type: "info",
    };
    let setErrorCount = 0;
    // await getSpeedData({
    //   iterationNum: psiConfig?.iterationNum,
    //   round: psiConfig?.numberOfRounds,
    //   urlListCSV: urlList,
    //   device: psiConfig.platform,
    //   setMobileTestScores,
    //   setDesktopTestScores,
    //   setMobileMedianScores,
    //   setDesktopMedianScores,
    //   setSnackBar,
    //   apiKey: psiConfig?.apiKey,
    //   setDesktopAverageScores,
    //   setMobileAverageScores,
    //   setSuccessCount,
    //   setErrorCount,
    //   setTotalUrlCount,
    //   setProgress,
    //   setQueueCount,
    //   setMobileOriginFieldData,
    //   setDesktopOriginFieldData,
    //   createPageVital,
    //   createPageVitalComputed,
    // });

    let response = await generateLightHouseReport();
    console.log('finesh')
    res.json({ data: JSON.parse(response), status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const generateLocalLightHouse = async (req, res) => {
  try {
   
    let response = await generateLightHouseReport();
    console.log('finished')
    res.json({ data: JSON.parse(response), status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  getAllPageVitals,
  createPageVital,
  getPageVitalById,
  updatePageVital,
  deletePageVital,
  generatePageVitalData,
  generateLocalLightHouse
}