const geonamesApi = require( "../api/geonames.json");
const pixabayApi = require( "../api/pixabay.json");
const restcountriesApi = require( "../api/restcountries.json");
const weatherbitApi = require( "../api/weatherbit.json");

// DOM interaction
function getDestination() {
    return document.getElementById('dep-to').value;
}

function getStartDate() {
    return document.getElementById('start-date').value;
}

function getEndDate() {
    return document.getElementById('end-date').value;
}

function getCountdown (sDate) {

    const currentDate = new Date();
    const startDate = new Date(sDate);
    
    const diffTime = Math.abs(startDate - currentDate);
    const diffInDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    return diffInDays;
  }

  function getTripDays (sDate, eDate) {

    const startDate = new Date(sDate);
    const endtDate = new Date(eDate);
    
    const diffTime = Math.abs(endtDate - startDate);
    const diffInDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    return diffInDays;
  }

// API Calls
async function fetchDestination(destination) {
    
    const url = `${geonamesApi.baseUrl}${destination}`;
    
    try {
        
        const response = await fetch(url);

        // return if no response
        if (!response.ok) {
            return null;
        }

        const location = {};
        const responseBody = await response.json();
        
        location.latitude = responseBody.geonames[0].lat;
        location.longitude = responseBody.geonames[0].lng;
        location.countryName = responseBody.geonames[0].countryName;
        
        console.log(location);
        return location;
    } 
    catch (error) {
        console.log("Error while fetching location: " + error);
    };
}

async function fetchWeatherForecast(latitude, longitude) {

    const url = `${weatherbitApi.baseUrl}${latitude}&lon=${longitude}`;
    
    try {
        
        const response = await fetch(url);

        // return if no response
        if (!response.ok) {
            return null;
        }

        const forecast = {};
        
        const responseBody = await response.json();
        
        forecast.temperature = responseBody.data[0].temp;
        forecast.weather = responseBody.data[0].weather;

        return forecast;
    } 
    catch (error) {
        console.log("Error while fetching forecast: " + error);
    };
}

async function fetchImage(destination) {
    
    const url = `${pixabayApi.baseUrl}${destination}`;
    
    try {
        
        const response = await fetch(url);

        // return if no response
        if (!response.ok) {
            return null;
        }

        const responseBody = await response.json();

        // return if destination images is availabe
        if (responseBody.hits !== 0) {
            return responseBody.hits[0].largeImageURL;
        }

        // else, fetch images for the country
        else{
            return "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
        }
        
    } 
    catch (error) {
        console.log("Error while fetching photo: " + error);
    };
}

export {
    getDestination,
    getStartDate,
    getEndDate,
    getTripDays,
    fetchDestination,
    fetchWeatherForecast,
    fetchImage,
    getCountdown
}