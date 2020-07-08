const axios = require("axios");
const apiCredentials = require("./apiCredentials");

const BASE_URL = "https://api.tfl.gov.uk";
const service = "/StopPoint";
const stopCodeInput = "/490008660N";

const constructPath = (stopCode) => {
  return `${BASE_URL}${service}${stopCode}/Arrivals?app_id=${apiCredentials.id}&app_key=${apiCredentials.key}`;
};

const getLiveTimes = (stopCode) => {
  const path = constructPath(stopCode);
  try {
    return axios.get(path);
  } catch (error) {
    console.error("first block", error);
    return Promise.reject(error);
  }
};

const getBuses = (stopCode) => {
  getLiveTimes(stopCode)
    .then((response) => {
      const fiveBuses = response.data.slice(0, 5);
      fiveBuses.forEach((el) => {
        console.log(el.lineId, el.destinationName, el.timeToStation);
      });
    })
    .catch((error) => {
      console.log("second block", error);
    });
};

getBuses(stopCodeInput);
