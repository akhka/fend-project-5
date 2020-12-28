# Project 5 (Final Project)

## Introduction
This is the final project in Udacity's web development course.

## APIs
1. Weatherbit (required)
2. Geonames (required)
3. Pixabay (required)

## How to Use

### Geonames API for Location
- Use the following URL for fetching the latitude, longitude and country code information for a place entered by a user.
- `http://api.geonames.org/searchJSON?formatted=true&q=CITY&username=USERNAME&style=full`

### Weatherbit API for Weather Forecase
- Use the following URL for fetching the weather information by latitude and longitude information
- `https://api.weatherbit.io/v2.0/current?city=Raleigh,NC&key=API_KEY`
- Weather Icons downloaded from the API are in the directory `src/client/assets/weather-icons/`

### Pixabay API for Images
- Use the following URL for searching images for a place that a user is visiting
- `https://pixabay.com/api/?key=API_KEY&q=PLACE&image_type=photo`

### How to Run
- Run `npm install`
- Run the application in production mode `npm run build`
- Start the node server, `npm run start`

### Extra Added
- Added end date and displayed the length of trip.
