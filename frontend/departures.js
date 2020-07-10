function myFunction() {
  let value = document.getElementById("postcode").value;
  if (!value) {
    return;
  }
  fetch(`http://localhost:3000/departureBoards?postcode=${value}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const busStopNames = Object.keys(data);
      document.querySelector("#busStopOne").innerHTML = busStopNames[0];
      document.querySelector("#busStopTwo").innerHTML = busStopNames[1];

      let strOne = "<ul>";

      data[busStopNames[0]].forEach((el) => {
        strOne += `<li>${el.timeToStation} minutes: ${el.lineId} to ${el.destinationName}</li>`;
      });

      strOne += "</ul>";
      document.getElementById("busStopOneResults").innerHTML = strOne;

      let strTwo = "<ul>";

      data[busStopNames[1]].forEach((el) => {
        strTwo += `<li>${el.timeToStation} minutes: ${el.lineId} to ${el.destinationName}</li>`;
      });

      strTwo += "</ul>";
      document.getElementById("busStopTwoResults").innerHTML = strTwo;
    });
}

setInterval(myFunction, 5000);
