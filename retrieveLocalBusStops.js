const axios = require("axios");
const apiCredentials = require("./apiCredentials");

const BASE_URL = "https://api.tfl.gov.uk";
const service = "/StopPoint";
const stopCodeInput = "/490008660N";

const constructPath = (stopCode) => {
  return `${BASE_URL}${service}/${stopCode}/Arrivals?app_id=${apiCredentials.id}&app_key=${apiCredentials.key}`;
};

const getLiveTimes = async (stopCode) => {
  const path = constructPath(stopCode);
  console.log({path});

  try {
    return await axios.get(path);
  } catch (error) {
    console.error("first block", error);
    return Promise.reject(error);
  }
};

const getLocalLiveBuses = async (stopCodeArray) => {
  try {
    const arrayOfPromises = stopCodeArray.map(stopCode => getLiveTimes(stopCode))

    const liveBusTimes = await Promise.all(arrayOfPromises)

    console.log("HERE", liveBusTimes[0].data[0].lineId);

    // return fiveBuses = liveBusTimes.data
    //   .slice(0, 5)
    //   .forEach((el) => {
    //     console.log(el.lineId, el.destinationName, el.timeToStation)}
    //   );
  } catch (error) {
      console.log("second block", error);
  }
}

module.exports = {
  getLocalLiveBuses
}