const flickr = require('../services/flickr');
const moment = require('moment');
const url = require('url');
var refreshTime = null;
var photosCache = null;

module.exports.getFlickrPhotos = (req, res) => {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  const shouldRefresh = query.refresh || typeof query.refresh === 'string';

  if(refreshTime && !shouldRefresh) {
    const expireTime = moment(new Date(refreshTime.toString())).add(24, 'hours');
    if(photosCache && expireTime.isAfter(moment())) {
      return res.send(photosCache);
    }
  }

  flickr.getPhotos().then(data => {
    var sizePromises = [];
    var photos = [];
    for(var i=0; i<data.photos.photo.length; i++) {
      var photoObj = data.photos.photo[i];
      var photoSizesReq = flickr.getPhotoSizes(photoObj.id).then(function(sizeData) {
        var alteredPhoto = setImages(sizeData, this);
        photos.push(alteredPhoto);
      }.bind(photoObj));
      sizePromises.push(photoSizesReq);
    }
    Promise.all(sizePromises).then(() => {
      refreshTime = moment(new Date());
      const response = { photos };
      photosCache = response;
      res.send(response);
    });
  });
}

function setImages(sizeData, photoObj) {
  var sizes = sizeData.sizes.size;
  var small = sizes.find(size => size.label === 'Small 320');
  var medium = sizes.find(size => size.label === 'Medium 640');
  var large = sizes.find(size => size.label === 'Large');
  photoObj.small = small;
  photoObj.medium = medium;
  photoObj.large = large;
  return photoObj;
}
