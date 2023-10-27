'use strict';
console.log('file connected');

const express = require('express');
const cors = require('cors');
require('dotenv').config();
let data = require('./data/weather.json');
console.log(data);
const weather = require('./modules/weather.js');


const app = express();
const PORT = process.env.PORT || 5005;
app.use(cors());

app.get('/', (request, response) => {
  response.send('Server Working!');
});


app.get('/weather', weatherhandle);


function weatherhandle(req, res){
  const {lat, lon, locationName} = req.query;
  console.log('request.query', lat, lon,locationName);
  weather(lat, lon,locationName)
    .then(weatherForecasts => res.status(200).send(weatherForecasts))
    .catch((error) => {
      console.error(error);
      res.status(500).send('Sorry, something went wrong!');
    });
}


app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.get('*', (request, response) => {
  response.send('the route does not exsist, sorry. ERROR 404');
});
app.use((error, req, res, next) =>{
  console.log(error.message);
  res.status(500).send(error.message);
});




// app.get('/weather', (request, response) => {
//   let searchQuery = request.query.searchQuery;
//   let weatherDataToInstant = data.find(weather => weather.city_name === searchQuery);
//   try {
//     // console.log(request.query);
//     // let lat = request.query.lat;
//     // let lon = request.query.lon;
//     // console.log('request object', lat , lon, searchQuery);
//     // console.log('from json', weatherDataToInstant);
//     // let datatoSendPE = new Weather(weatherDataToInstant);
//     let weatherObjects = weatherDataToInstant.data.map((day) => new WeatherForcast(day));
//     console.log('back from the constructor', weatherObjects);
//     response.send(weatherObjects);

//   } catch (error) {
//     // eslint-disable-next-line no-undef
//     next(error);
//   }
// });





// class WeatherForcast {
//   constructor(weatherObjects) {
//     this.date = weatherObjects.datetime;
//     this.description = weatherObjects.weather.description;
//   }
// }




// Test

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

//finished lab 7

