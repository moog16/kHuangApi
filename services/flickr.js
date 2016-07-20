const Promise = require('promise');
const Flickr = require('flickrapi');

const flickrApiKey = process.env.FLICKR_API_KEY;
const flickrSecret = process.env.FLICKR_SECRET;
const katUserId = '143864920@N04';
const flickrOptions = {
  api_key: flickrApiKey,
  secret: flickrSecret
};

module.exports.getPhotos = () => {
  return new Promise((resolve, reject) => {
    Flickr.tokenOnly(flickrOptions, function(error, flickr) {
      flickr.people.getPhotos({
        api_key: flickrApiKey,
        user_id: katUserId,
        page: 1,
        per_page: 100
      }, (err, result) => {
        resolve(result);
      });
    });
  });
}
