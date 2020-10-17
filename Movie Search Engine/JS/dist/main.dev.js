"use strict";

$(document).ready(function () {
  $('#searchForm').submit(function (e) {
    e.preventDefault();
    var searchText = $('#searchText').val();
    getMovies(searchText);
  });
});

function getMovies(searchText) {
  var API_URL = "http://www.omdbapi.com/?s=".concat(searchText, "&apikey=387cdace"); // 'http://www.omdbapi.com/?i=tt3896198&apikey=387cdace'

  axios.get(API_URL).then(function (response) {
    console.log(response);
    var output = '';
    var movies = response.data.Search;
    $.each(movies, function (index, movie) {
      output += "\n            <div class=\"col-md-3\">\n            <div class=\"well text-center\">\n            <img src=\"".concat(movie.Poster, "\">\n            <h5>").concat(movie.Title, "</h5>\n            <a onclick=\"movieSelected('").concat(movie.imdbID, "')\" class=\"btn btn-primary\" href=\"#\">Movie Details</a>\n            </div>\n            </div>\n            ");
    });
    /*
    let movie = response.data;
    output +=`
        <div class="col-md-3">
        <div class="well text-center">
        <img src="${movie.Poster}">
        <h5>${movie.Title}</h5>
        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
        </div>
        </div>
        `;
      */

    $('#movies').html(output);
  })["catch"](function (err) {
    console.log(err);
  });
}

function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return true;
}

function getMovie() {
  var movieId = sessionStorage.getItem('movieId');
  var API_URL = "http://www.omdbapi.com/?s=".concat(movieId, "&apikey=387cdace"); // 'http://www.omdbapi.com/?i=tt3896198&apikey=387cdace'

  axios.get(API_URL).then(function (response) {
    console.log(response);
    var movie = response.data;
    var output = "\n<div class=\"row\">\n<div class=\"col-md-4\">\n<img src=\"".concat(movie.Poster, "\" class=\"thumbnail\">\n</div>\n<div class=\"col-md-8\">\n<h2>").concat(movie.Title, "</h2>\n<ul class=\"list-group\">\n<li class=\"list-group-item\"><strong>Genre:</strong> ").concat(movie.Genre, "</li>\n<li class=\"list-group-item\"><strong>Released:</strong> ").concat(movie.Released, "</li>\n<li class=\"list-group-item\"><strong>Rated:</strong> ").concat(movie.Rated, "</li>\n<li class=\"list-group-item\"><strong>IMDB Rating:</strong> ").concat(movie.imdbRating, "</li>\n<li class=\"list-group-item\"><strong>Director:</strong> ").concat(movie.Director, "</li>\n<li class=\"list-group-item\"><strong>Writer:</strong> ").concat(movie.Writer, "</li>\n<li class=\"list-group-item\"><strong>Actors:</strong> ").concat(movie.Actors, "</li>\n</ul>\n\n</div>\n</div>\n<div class=\"row\">\n<div class=\"well\">\n<h3>Plot</h3>\n").concat(movie.Plot, "\n<hr>\n<a href=\"http://imdb.com/title").concat(movie.imdbID, "\" target=\"_blank\" class=\"btn btn-primary\">View IMDB</a>\n<a href=\"index.html\" class=\"btn btn-default\">Go Back To Search</a>\n</div>\n</div>\n");
    $('#movie').html(output);
  })["catch"](function (err) {
    console.log(err);
  });
}