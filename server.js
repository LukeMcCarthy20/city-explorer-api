'use strict';
console.log('file connected');

const express = require('express');
const cors = require('cors');
require('dotenv').config();
// let data = require('./data/weather.json');
// console.log(data);
const weather = require('./modules/weather.js');
const movies = require('./modules/movies.js');


const app = express();
const PORT = process.env.PORT || 5005;
app.use(cors());

app.get('/', (request, response) => {
  response.send('Server Working!');
});


app.get('/weather', weatherhandle);
app.get('/movies', moviesHandler);




function moviesHandler(request, response){
  console.log('what is in a req',request.query.city);
  const location = request.query.city;
  movies(location)
    .then(moviesList => response.send(moviesList))
    .catch((error) => {
      console.error(error);
      response.status(500).send('Something is Wrong!');
    });
  // response.send('ok');
}







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










// Test

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

//finished lab 7

