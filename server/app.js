// Import Middlewares
const express = require('express');
const session = require('express-session');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const db = require('./config/database.js');
const setInterval = require('timers').setInterval;
// Import Routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const catalog = require('./routes/catalog');
const user = require('./routes/user');
const movie = require('./routes/movie');
const torrent = require('./routes/torrent');
const comment = require('./routes/comment');
const stream = require('./routes/stream');
const subtitles = require('./routes/subtitles');
const maintenance = require('./controllers/maintenance');

// Import Strategies
import { 
	facebookStrategy,
	fortytwoStrategy,
	localStrategy,
	githubStrategy,
	googleStrategy,
	twitchStrategy
} from './config/oAuth';
// Import test
const User = require('./models/user');

passport.use(githubStrategy);
passport.use(facebookStrategy);
passport.use(googleStrategy);
passport.use(fortytwoStrategy);
passport.use(localStrategy);
passport.use(twitchStrategy);

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

const app = express();

app.use(flash());
//Passport Middlewares\
app.use(session({secret: 'max', saveUninitialized: false, resave: false}));
app.use(passport.initialize());
app.use(passport.session());


// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/index', index);
app.use('/api/catalog', catalog);
app.use('/api/user', user);
app.use('/api/movie', movie);
app.use('/api/comment', comment);
app.use('/api/torrent', torrent);
app.use('/api/auth', auth);
app.use('/api/stream', stream);
app.use('/api/subtitles', subtitles);

app.get('/api/loginFailure', (req, res) => {
	let error = req.flash().error[0]
	let message = {message : error};
	res.json(message);
})

// Authentication Routes using Passport
app.post('/api/login', passport.authenticate('local',  { failureRedirect: '/api/loginFailure', failureFlash: true }), function(req, res) {
	res.json({success: true, msg: 'Login succesfully done'})
});
app.get('/api/login/facebook', passport.authenticate('facebook', { scope: ['email'] }));
app.get('/api/login/facebookCallback', passport.authenticate('facebook', { failureRedirect: '/' }), function(req, res) {
	res.redirect('http://localhost:3000/catalog');
});
app.get('/api/login/fortytwo', passport.authenticate('42'));
app.get('/api/login/fortytwoCallback', passport.authenticate('42', { failureRedirect: '/' }), function(req, res) {
	res.redirect('http://localhost:3000/catalog');
});
app.get('/api/login/github', passport.authenticate('github'));
app.get('/api/login/github/callback', passport.authenticate('github', { failureRedirect: '/' }), function(req, res) {
	res.redirect('http://localhost:3000/catalog');
});
app.get('/api/login/google', passport.authenticate('google', { scope: 
	['https://www.googleapis.com/auth/plus.login',
	 'https://www.googleapis.com/auth/plus.profile.emails.read'] }
));
app.get('/api/login/google/callback', passport.authenticate('google', { failureRedirect: '/' }), function(req, res) {
	res.redirect('http://localhost:3000/catalog');
});
app.get('/api/login/twitch', passport.authenticate('twitch'));
app.get('/api/login/twitch/callback', passport.authenticate('twitch', { failureRedirect: '/' }), function(req, res) {
	res.redirect('http://localhost:3000/catalog');
});
app.use(function() {
	setInterval(maintenance.removeOld, 86400000);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log('Errors !', err, err.message);
  res.status(err.status || 500);
  res.json({msg: err.message, error: err});
});

// Adding string methods

String.prototype.capitalize = function () {
	return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}

module.exports = app;
