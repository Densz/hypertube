const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/hypertube', {useMongoClient: true});
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting with mongodb database:'));
db.once('open', function () {
    console.log('Connected to mongodb database');
});

module.exports = mongoose.connection;