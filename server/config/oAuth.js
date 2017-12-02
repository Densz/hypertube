const fbStrategy = require('passport-facebook').Strategy;
const ftStrategy = require('passport-42').Strategy;
const ghStrategy = require('passport-github').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const config = require('./config');
const User = require('../models/user');

const githubStrategy = new githubStrategy({
		clientID: config.githubApi.clientID,
		clientSecret: config.githubApi.clientSecret,
		callbackURL: '/api/login/githubCallback',
		profileFields: ['id', 'email', 'first_name', 'last_name']
	}, (accessToken, refreshToken, profile, done) => {
		User.findOne({ githubId: profile._json.id }, function (err, user) {
			if (err) { return done(err) }
			if (!user) {
				user = new User({
					firstName: profile._json.first_name,
					lastName: profile._json.last_name,
					email: profile._json.email,
					githubId: profile._json.id
				})
				user.save(function (err) {
					if (err) { console.log(err) };
					return done(err, user);
				})
			} else {
				return done(err, user);
			}
		})
	}
);

const localStrategy = new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password'
	},
	function(username, password, done) {
	  User.findOne({ login: username }, function(err, user) {
		if (err) { return done(err); }
		if (!user) {
			return done(null, false, { message: 'Incorrect username.' });
		}
		if (user.password || user.password !== '') {
			if (!user.checkPassword(password, user.password)) {
				return done(null, false, { message: 'Incorrect password.' });
			}
		} else {
			return done(null, false, { message: 'Incorrect password.' });
		}
		return done(err, user);
	  });
	}
);

const facebookStrategy = new fbStrategy({
	clientID: config.facebookApi.clientID,
	clientSecret: config.facebookApi.clientSecret,
	callbackURL: '/api/login/facebookCallback',
	profileFields: ['id', 'email', 'first_name', 'last_name']
}, function(accessToken, refreshToken, profile, done) {
	User.findOne({facebookId: profile._json.id}, function(err, user) {
		if (err) { return done(err) }
		if (!user) { 
			user = new User({
				firstName: profile._json.first_name,
				lastName: profile._json.last_name,
				email: profile._json.email,
				facebookId: profile._json.id
			})
			user.save(function(err) {
				if (err) { console.log(err) };
				return done (err, user);
			})
		} else {
			return done (err, user);
		}
	});
});

const fortytwoStrategy = new ftStrategy({
	clientID: config.fortytwoApi.clientID,
	clientSecret: config.fortytwoApi.clientSecret,
	callbackURL: '/api/login/fortytwoCallback',
	profileFields: {
		'id': function (obj) { return String(obj.id); },
		'name.familyName': 'last_name',
		'name.givenName': 'first_name',
		'emails.0.value': 'email'
	}}, function(accessToken, refreshToken, profile, done) {
		User.findOne({fortytwoId: profile._json.id}, function(err, user) {
			if (err) { return done(err) }
			if (!user) { 
				user = new User({
					firstName: profile._json.first_name,
					lastName: profile._json.last_name,
					email: profile._json.email,
					fortytwoId: profile._json.id
				})
				user.save(function(err) {
					if (err) { console.log(err) };
					return done(err, user);
				})
			} else {
				return done(err, user);
			}
		})
});

module.exports = {
	facebookStrategy: facebookStrategy,
	fortytwoStrategy: fortytwoStrategy,
	githubStrategy: githubStrategy,
	localStrategy: localStrategy
}