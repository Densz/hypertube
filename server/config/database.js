const mongoose = require('mongoose');
const credentials = require('./mLab.js');

let mongoUri = "mongodb://" + credentials.username + ":" + credentials.password + "@ds159845.mlab.com:59845/dankertube";

mongoose.connect(mongoUri, {useMongoClient: true});
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting with mongodb database:'));
db.once('open', function () {
    console.log('Connected to mongodb database');
});

module.exports = mongoose.connection;