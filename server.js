'use strict';
console.log('file connected');

const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');
console.log(data);
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5005;
app.use(cors());

app.get('/', (request, response) => {
  response.send('Server Working!');
});

app.get('/weather', (request, response) => {
  let searchQuery = request.query.searchQuery;
  let weatherDataToInstant = data.find(weather => weather.city_name === searchQuery);
  try {
    // console.log(request.query);
    // let lat = request.query.lat;
    // let lon = request.query.lon;
    // console.log('request object', lat , lon, searchQuery);
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

class WeatherForcast {
  constructor(weatherObjects) {
    this.date = weatherObjects.datetime;
    this.description = weatherObjects.weather.description;
  }
}




// Test

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
