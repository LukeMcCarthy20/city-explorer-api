'use strict';
console.log('file connected');

const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');
console.log(data);
const cors = require('cors');

// const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

// const express = require('express');
// require('dotenv').config();
// const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5005;
app.use(cors());

app.get('/', (request, response) => {
  response.send('Server Working!');
});
// http://api.weatherapi.com/v1/forecast.json?key=<YOUR_API_KEY>&q=07112&days=7

app.get('/weather', (request, response) => {
  let searchQuery = request.query.searchQuery;
  let weatherDataToInstant = data.find(weather => weather.city_name === searchQuery);
  let lat = request.query.lat;
  let lon = request.query.lon;
  console.log('request object', lat , lon, searchQuery);
  try {
    // console.log(request.query);
    // console.log('from json', weatherDataToInstant);
    // let datatoSendPE = new Weather(weatherDataToInstant);
    let weatherObjects = weatherDataToInstant.data.map((day) => new WeatherForcast(day));
    console.log('back from the constructor', weatherObjects);
    response.send(weatherObjects);

  } catch (error) {
    // eslint-disable-next-line no-undef
    next(error);
  }
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.get('*', (request, response) => {
  response.send('the route does not exsist, sorry. ERROR 404');
});




class WeatherForcast {
  constructor(weatherObjects) {
    this.date = weatherObjects.datetime;
    this.description = weatherObjects.weather.description;
  }
}




// Test

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

//finished lab 7

