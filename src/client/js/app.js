import {
  getDestination,
  getStartDate,
  getEndDate,
  fetchDestination,
  fetchWeatherForecast,
  fetchImage,
  getCountdown,
  getTripDays
} from "./travel";

// global variables

const tripInfo = {};

let savedTrip = [];

async function handleSubmit(e) {
  e.preventDefault();

  // fetch trip details
  tripInfo.destination = getDestination();
  tripInfo.startDate = getStartDate();
  tripInfo.endDate = getEndDate();

  if (!tripInfo.destination || !tripInfo.startDate || !tripInfo.endDate) {
    alert("Please fill all fields!");
    return;
  }

  // get countdown till trip starts, and the length of the trip
  tripInfo.countdown = getCountdown(tripInfo.startDate);
  tripInfo.tripLength = getTripDays(tripInfo.startDate, tripInfo.endDate);

  // fetch the destination info from geonames
  tripInfo.desinfo = await fetchDestination(tripInfo.destination);

  if (tripInfo.desinfo === null) {
    alert("Error fetching location details... Try again later!");
    return;
  }

  // fetch weather forecast from Weatherbit
  tripInfo.weatherForecast = await fetchWeatherForecast(tripInfo.desinfo.latitude, tripInfo.desinfo.longitude);
  const weatherObj = tripInfo.weatherForecast;
  console.log("Tempreture:  ", weatherObj.temperature)

  // fetch destination image from pixabay
  tripInfo.image = await fetchImage(tripInfo.destination);

  console.log(tripInfo);
  updateUI(tripInfo);
}

// Save trip information
async function handleSave() {
  try {
    const response = await fetch("http://localhost:8080/save", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ trip: tripInfo }),
    });

    if (!response.ok) {
      return null;
    }

    savedTrip = await response.json();
    updateUI(savedTrip);

    console.log(savedTrip);
    return savedTrip;
  } catch (error) {
    console.log(error);
  }
}



function updateUI(savedTrip) {
  if (!savedTrip) {
    alert("Could not find any saved result. Try again later!");
    return;
  }

  document.getElementById('title-result').classList.remove('hide');
  let resultForm = document.getElementById('result-form');
  resultForm.classList.remove('hide');
  resultForm.scrollIntoView({ behavior: "smooth" });
  document.getElementById('result-city').innerHTML = savedTrip.destination;
  document.getElementById('result-sdate').innerHTML = savedTrip.startDate;
  document.getElementById('result-edate').innerHTML = savedTrip.endDate;
  document.getElementById('result-edate').innerHTML = savedTrip.endDate;
  document.getElementById('result-count-days').innerHTML = savedTrip.tripLength + " Day(s)";
  document.getElementById('result-remainig-days').innerHTML = savedTrip.countdown + " Day(s)";

  const weatherObject = savedTrip.weatherForecast;
  const weatherCond = weatherObject.weather;
  const condition = weatherCond.description;

  try{
    const obj = weatherObject.json();
    console.log("This is temp: " + obj.tempreture)
  } catch(e){
    console.log("error", e)
  }

  document.getElementById('result-temp').innerHTML = weatherObject.temperature + "°C";
  document.getElementById('result-weather').innerHTML = condition;

  document.getElementById('result-image').setAttribute('src', `${savedTrip.image}`)


}

export { handleSubmit, handleSave };
