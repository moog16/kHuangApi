const Promise = require('promise');
const http = require('http');
const request = require('request');

const flickrBaseUrl = 'https://api.flickr.com/services/rest/';
const flickrApiKey = process.env.FLICKR_API_KEY;
const flickrSecret = process.env.FLICKR_SECRET;
const katUserId = '143864920@N04';
const flickrOptions = {
  api_key: flickrApiKey,
  secret: flickrSecret
};

module.exports.getPhotos = () => {
  return new Promise((resolve, reject) => {
    request(`${flickrBaseUrl}?method=flickr.people.getPhotos&api_key=${flickrApiKey}&user_id=${katUserId}&format=json&nojsoncallback=1&page=1&per_page=100`, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        resolve(JSON.parse(body));
      } else if(error) {
        reject(error);
      }
    });
  });
}


module.exports.getPhotoSizes = (photoId) => {
  return new Promise((resolve, reject) => {
    request(`${flickrBaseUrl}?method=flickr.photos.getSizes&api_key=${flickrApiKey}&photo_id=${photoId}&format=json&nojsoncallback=1`, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        resolve(JSON.parse(body));
      } else if(error) {
        reject(error);
      }
    });
  });
}
