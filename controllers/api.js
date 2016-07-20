const flickr = require('../services/flickr');

module.exports.getFlickrPhotos = (req, res) => {
  flickr.getPhotos().then(data => {
    for(var i=0; i<data.photos.photo.length; i++) {
      var obj = data.photos.photo[i];
      var smallUrl = 'https://farm'+ obj.farm +'.staticflickr.com/'+ obj.server +'/'+ obj.id +'_'+ obj.secret +'_n	.jpg';
      var medUrl = 'https://farm'+ obj.farm +'.staticflickr.com/'+ obj.server +'/'+ obj.id +'_'+ obj.secret +'_z	.jpg';
      data.photos.photo[i].thumbnailUrl = smallUrl;
      data.photos.photo[i].mediumUrl = medUrl;
    }
    res.send(data);
  });
}
