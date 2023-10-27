'use strict';

console.log('weather js file connected');

let cache = require('./cache.js');
let axios = require('axios');




async function getWeather(lat, lon, locationName) {
  console.log('in the get weather', locationName);
  const key = 'weather ' + lon + lat;
  let url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&days=5&api-no&alerts=no&q=${locationName}`;



  if (cache[key] && (Date.now() - cache[key].timestamp < 5000)) {
    console.log('Cache hit');
  } else {
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = await axios.get(url)
      .then(apiResponse => parseWeather(apiResponse.data));

  }
  return cache[key].data;

}




function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.forecast.forecastday.map(day => {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (error) {
    return Promise.reject(error);
  }

}

class Weather {
  constructor(day) {
    this.forecast = day.day.condition.text;
    this.time = day.date;

  }
}

module.exports = getWeather;
