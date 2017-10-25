const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
import { facebookStrategy, fortytwoStrategy } from './config/oAuth';

passport.use(facebookStrategy);
passport.use(fortytwoStrategy);

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

const app = express();

//Passport Middlewares
app.use(passport.initialize());
app.use(passport.session());

const index = require('./routes/index');
const auth = require('./routes/auth');
const catalog = require('./routes/catalog');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/index', index);
app.use('/api/auth', auth);
app.use('/api/catalog', catalog);

// Passport Authentication
app.get('/api/login/facebook', passport.authenticate('facebook'));
app.get('/api/login/facebookCallback', passport.authenticate('facebook', { failureRedirect: '/' }), function(req, res) {
	res.redirect('http://localhost:3000/catalog');
})
app.get('/api/login/fortytwo', passport.authenticate('42'));
app.get('/api/login/fortytwoCallback', passport.authenticate('42', { failureRedirect: '/' }), function(req, res) {
	res.redirect('http://localhost:3000/catalog');
})

app.get('/robots.txt', function (req, res) {
	res.type('text/plain');
	res.send("User-agent: *\nDisallow: /");
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
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
