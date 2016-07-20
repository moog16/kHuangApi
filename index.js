const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.load();
const getFlickrPhotos = require('./controllers/api').getFlickrPhotos;

const appPath = `../kathyHuang/dist/`;
const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
}

// Serve static files
app.use(express.static(`${appPath}`));
//CORS middleware
app.use(allowCrossDomain);

// routes
app.get('/v1/flickr', getFlickrPhotos);

// Get the port from environment variables
var port = process.env.PORT || 3002;

app.listen(port);
console.log('listening on port ', port);
