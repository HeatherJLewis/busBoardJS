const axios = require("axios");
const apiCredentials = require("../../apiCredentials");

const BASE_URL = "https://api.tfl.gov.uk";
const service = "/StopPoint";

const constructPath = (stopCode) => {
  return `${BASE_URL}${service}/${stopCode}/Arrivals?app_id=${apiCredentials.id}&app_key=${apiCredentials.key}`;
};

const getLiveTimes = async (stopCode) => {
  const path = constructPath(stopCode);

  try {
    return await axios.get(path);
  } catch (error) {
    console.error("first block", error);
    return Promise.reject(error);
  }
};

const getNextFiveDepartureTimesForBusStops = async (stopCodeArray) => {
  try {
    const arrayOfPromises = stopCodeArray.map((stopCode) =>
      getLiveTimes(stopCode)
    );

    const liveBusTimes = await Promise.all(arrayOfPromises);

    const times = liveBusTimes.map((el) => {
      return el.data.slice(0, 5).map((el) => {
        return (busTimes = {
          lineId: el.lineId,
          destinationName: el.destinationName,
          timeToStation: Math.floor(el.timeToStation / 60),
        });
      });
    });

    let firstBusStopStationName = liveBusTimes[0].data[0].stationName;
    let secondBusStopStationName = liveBusTimes[1].data[0].stationName;

    return {
      [firstBusStopStationName]: times[0],
      [secondBusStopStationName]: times[1],
    };
  } catch (error) {
    console.log("second block", error);
  }
};

module.exports = {
  getNextFiveDepartureTimesForBusStops,
};
