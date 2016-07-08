const getVideos = require('../services/youtube').getAll;
const tumblr = require('../services/tumblr');

module.exports.getYoutubeVideos = (req, res) => {
  getVideos()
    .then(videos => res.send(videos))
    .catch(error => res.send(error));
}


module.exports.get52DinnerBlog = (req, res) => {
  if(!tumblr.isAuthenticated()) {
    tumblr.authenticate();
  }
  tumblr.get52DinnerBlog().then(data => res.send(data));
}
