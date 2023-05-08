// const lighthouse  = require("lighthouse"); // This should be at the top of the file
import lighthouse from "lighthouse";
import puppeteer from "puppeteer";
export const createBrowser = () => {
   return puppeteer.launch({
     args: ["--show-paint-rects"] // Required by lighthouse
   });
}


export const createReportWithBrowser = (browser, url, options = { output: "html" }) => {
  const endpoint = browser.wsEndpoint(); // Allows us to talk via DevTools protocol
  const endpointURL = new URL(endpoint); // Lighthouse only cares about the port, so we have to parse the URL so we can grab the port to talk to Chrome on
  return lighthouse(
    url,
    Object.assign({}, {
      port: endpointURL.port
    }, options) // Allow options to override anything here
  );
}