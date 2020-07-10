const express = require("express");
const getDepartures = require("./middleware/getDepartures");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (request, response) => {
  response.send("Hello World Happy Days");
});

app.get(
  "/departureBoards",
  getDepartures.getNextFiveBusDepartureTimesForGivenPostcode
);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
