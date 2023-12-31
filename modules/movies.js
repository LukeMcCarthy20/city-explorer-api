'use strict';

const axios = require('axios');
let cache = require('./cache.js');



async function getMovies(location) {
  const key = 'movies-' + location;
  // const url = `https://api.themoviedb.org/3/search/movie/?api_key=${process.env.MOVIE_API_KEY}&query=${location}`;
  console.log('location', location, 'env', process.env.MOVIE_API_KEY);
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${location}`;



  // https://api.themoviedb.org/3/search/movie?api_key=&query=seattle

  if (cache[key] && (Date.now() - cache[key].timestamp < 5000)) {
    console.log('Cache hit');
  } else {
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = await axios.get(url)
      .then(movieData => parseMoviesData(movieData.data));
    // console.log('the DATA', results);
  }
  return cache[key].data;
}

function parseMoviesData(data) {
  console.log('data!!!!1', data);
  try {
    const movies = data.results.map(movie => {
      return new Movie(movie);
    });
    return Promise.resolve(movies);
  } catch(e) {
    return Promise.reject(e);
  }
}

class Movie {
  constructor(movie) {
    this.title = movie.title;
    this.overview = movie.overview;
    this.averageVotes = movie.vote_average;
    this.totalVotes = movie.vote_count;
    this.imageUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
    this.popularity = movie.popularity;
    this.releasedOn = movie.release_date;
    this.timestamp = Date.now();
  }
}



module.exports = getMovies;
