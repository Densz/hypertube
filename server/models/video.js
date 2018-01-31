const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    imdb_id: {
        type: String,
        required: true
    },
    quality: {
        type: String,
        required: true
    },
    series: {
        type: Boolean,
        required: true,
        default: false
    },
    season: {
        type: Number,
        required: false
    },
    episode: {
        type: Number,
        required: false
    },
    hash: {
        type: String,
        required: true
    },
    last_watched: {
        type: Date,
        required: true,
        default: Date.now
    }
});

videoSchema.statics.getEpisode = function(imdb_id, season, episode, quality, cb) {
    if (!quality || quality === '')
        return this.findOne({ imdb_id: imdb_id, season: season, episode: episode }, cb);
    else
        return this.findOne({ imdb_id: imdb_id, season: season, episode: episode, quality: quality }, cb);
}

videoSchema.statics.getFilm = function(imdb_id, quality, cb) {
    if (!quality || quality === '')
        return this.findOne({ imdb_id: imdb_id }, cb);
    else
        return this.findOne({ imdb_id: imdb_id, quality: quality }, cb);
}

videoSchema.methods.updateLastWatched = function(cb) {
    this.last_watched = Date.now();
    this.save(cb);
}

module.exports = mongoose.model('Video', videoSchema);