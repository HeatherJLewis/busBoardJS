const busStops = require("../../exercises/partTwoBusStops");
const {
  getNextFiveDepartureTimesForBusStops,
} = require("../services/retrieveLocalBusStops");

const getNextFiveBusDepartureTimesForGivenPostcode = (request, response) => {
  const queryPostcode = request.query.postcode;
  busStops
    .getClosestBusStops(queryPostcode)
    .then((data) => getNextFiveDepartureTimesForBusStops(data))
    .then((nextFiveDepartureTimes) => {
      response.json(nextFiveDepartureTimes);
    });
};

module.exports = {
  getNextFiveBusDepartureTimesForGivenPostcode,
};
