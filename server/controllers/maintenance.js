const db = require('../config/database');
const Torrent = require('../controllers/torrent');
const Video = require('../models/video');

module.exports.removeOld = function() {
    console.log("Removing torrents that have not been watched in the last 30 days...");
    let limit = new Date();
    limit.setDate(limit.getDate() - 30);
    Video.find({ last_watched: { $lt: limit } }, function(err, videos) {
        console.log(videos);
        if (videos) {
            videos.forEach(function (video) {
                try {
                    let torrent = new Torrent(video.hash);
                    torrent.deleteData(function () {
                        console.log("Video " + video.imdb_id + " has been removed due to inactivity.");
                    });
                    video.remove();
                } catch (err) {
                    console.log("Error removing video: " + err);
                }
            });
        }
    });
}