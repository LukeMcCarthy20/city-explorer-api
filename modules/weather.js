'use strict';

console.log('weather js file connected');

let axios = require('axios');




async function getWeather(lat, lon, locationName) {
  console.log('in the get weather', locationName);
  let url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&days=5&api-no&alerts=no&q=${locationName}`;




  let result = await axios.get(url)
    .then(apiResponse => parseWeather(apiResponse.data));


  return result;

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
