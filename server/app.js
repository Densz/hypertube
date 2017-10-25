const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
// -----------------------------------------------------------------------Facebook Auth
const facebookStrategy = require('passport-facebook').Strategy;
const fortytwoStrategy = require('passport-42').Strategy;

passport.use(new facebookStrategy({
		clientID: "522965928046280",
		clientSecret: "b66006fab4f380fdaf264637722376ba",
		callbackURL: 'http://localhost:3000/catalog',
		profileFields: ['id', 'email', 'first_name']
	}, function(accessToken, refreshToken, profile, cb) {
		return cb(null, profile);
	})
);

passport.use(new fortytwoStrategy({
	clientID: "b55f5cc0fceffcb0cfe581dc7675950764db7b5f55ad733d5bb8bde42785c5c5",
	clientSecret: "2b73dbd0809450ee4b35995108dc89d71df604347eb24733cc50b793c48822ac",
	callbackURL: 'http://localhost:3000/catalog',
	profileFields: {
		'id': function (obj) { return String(obj.id); },
		'username': 'login',
		'displayName': 'displayname',
		'name.familyName': 'last_name',
		'name.givenName': 'first_name',
		'profileUrl': 'url',
		'emails.0.value': 'email',
	  }
}, function(accessToken, refreshToken, profile, cb) {
	console.log(profile);
	return cb(null, profile);
})
)

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
app.get('/', (req, res) => { res.json({ index: true } )})

// Passport Authentication
app.get('/api/login/facebook', passport.authenticate('facebook'));
app.get('/api/login/fortytwo', passport.authenticate('42'));

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
