/* Modules */
import axios from 'axios';

/* API Parameters */
const endpoint =
  'https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed'; // Endpoint
const key = 'asdfasdf'; // API Key (https://developers.google.com/speed/docs/insights/v5/get-started)

let tempPsiId = 0;
export const uniquePsiDummyString = 'tempPsiId';
const addtempPsiIdToUrl = (url) => {
  if (url.includes('?')) {
    return `${url}&${uniquePsiDummyString}=${tempPsiId}`;
  }
  return `${url}?${uniquePsiDummyString}=${tempPsiId}`;
}

// Custom function to request PageSpeed API
export const apiRequest = async (url, device, chunkIndex, chunkItemIndex, round, totalChunk, totalItem, totalRound) => {
  tempPsiId += 1;
  let finalUrl = addtempPsiIdToUrl(url);
  console.log(`calling at: ${new Date().toLocaleTimeString()} chunkIndex=${chunkIndex}/${totalChunk} | chunkItemIndex=${chunkItemIndex}/${totalItem} | round=${round}/${totalRound} | url=${finalUrl}`)
  const { data } = await axios(`${endpoint}?url=${encodeURIComponent(finalUrl)}`, {
    params: {
      strategy: device,
      key: key,
    },
  });
  return data;
};
