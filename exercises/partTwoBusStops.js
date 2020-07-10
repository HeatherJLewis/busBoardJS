const axios = require("axios");
const apiCredentials = require("../apiCredentials");

const BASE_URL = "https://api.tfl.gov.uk";
const stopTypes = "NaptanPublicBusCoachTram";
const radius = 500;
const service = "/StopPoint";

const constructPath = (lat, lon) => {
  return `${BASE_URL}${service}?lat=${lat}&lon=${lon}&stoptypes=${stopTypes}&radius=${radius}&app_id=${apiCredentials.id}&app_key=${apiCredentials.key}`;
};

const getPostcodeData = async (postcode) => {
  const path = `https://api.postcodes.io/postcodes/${postcode}`;
  try {
    return await axios.get(path);
  } catch (error) {
    console.error("getPostcodeData", error);
    return Promise.reject(error);
  }
};

const getBusStopsData = async (path) => {
  try {
    return await axios.get(path);
  } catch (error) {
    console.error("getBusStopsData", error);
    return Promise.reject(error);
  }
};

const getBusStops = async (postcode) => {
  try {
    const postcodeData = await getPostcodeData(postcode);
    const { latitude, longitude } = postcodeData.data.result;
    const path = constructPath(latitude, longitude);
    const busStopsData = await getBusStopsData(path);
    busStopsData.data.stopPoints.forEach((busStop) =>
      console.log(busStop.commonName)
    );
    const localBusStops = busStopsData.data.stopPoints.map(
      (busStop) => busStop.commonName
    );
    return localBusStops;
  } catch (error) {
    console.log("getBusStops", error);
  }
};

const getClosestBusStops = async (postcode) => {
  try {
    const postcodeData = await getPostcodeData(postcode);
    const { latitude, longitude } = postcodeData.data.result;
    const path = constructPath(latitude, longitude);
    const busStopsData = await getBusStopsData(path);
    const closestTwoBusStops = busStopsData.data.stopPoints
      .slice(0, 2)
      .map((el) => el.id);
    return closestTwoBusStops;
  } catch (error) {
    console.log("getBusStops", error);
  }
};

getBusStops("nw51tl");

module.exports = {
  getBusStops,
  getClosestBusStops,
};
