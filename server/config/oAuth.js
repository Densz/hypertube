const fbStrategy = require('passport-facebook').Strategy;
const ftStrategy = require('passport-42').Strategy;
const ghStrategy = require('passport-github').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const gleStrategy = require('passport-google-oauth').OAuth2Strategy;
const kappaStrategy = require('passport-twitch').Strategy;
const config = require('./config');
const User = require('../models/user');

const twitchStrategy = new kappaStrategy({
		clientID: config.twitchApi.clientID,
		clientSecret: config.twitchApi.clientSecret,
		callbackURL: '/api/login/twitch/callback',
		scope: "user_read"
	}, (accessToken, refreshToken, profile, done) => {
		User.findOne({ $or: [{ twitchId: profile.id }, { email: profile.email }] }, (err, user) => {
			if (err) { return done(err) };
			if (!user) {
				user = new User({
					email: profile.email,
					twitchId: profile.id
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
)

const googleStrategy = new gleStrategy({
		clientID: config.googleApi.clientID,
		clientSecret: config.googleApi.clientSecret,
		callbackURL: '/api/login/google/callback'
	}, (accessToken, refreshToken, profile, done) => {
		User.findOne({ $or: [{ googleId: profile.id }, { email: profile.emails[0].value }] }, (err, user) => {
			if (err) { return done(err) };
			if (!user) {
				user = new User({
					firstName: profile.name.givenName,
					lastName: profile.name.familyName,
					email: profile.emails[0].value,
					googleId : profile.id
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

const githubStrategy = new ghStrategy({
		clientID: config.githubApi.clientID,
		clientSecret: config.githubApi.clientSecret,
		callbackURL: '/api/login/github/callback',
		profileFields: ['id', 'first_name', 'last_name'],
		scope: ['user:email']
	}, (accessToken, refreshToken, profile, done) => {
		let indexPrimary = -1;
		profile.emails.forEach((elem, index) => {
			if (elem.primary === true) indexPrimary = index;
		});
		User.findOne({ $or: [{ githubId: profile._json.id }, { email: profile.emails[indexPrimary].value }] }, function (err, user) {
			if (err) { return done(err) }
			if (!user) {
				user = new User({
					firstName: profile._json.first_name,
					lastName: profile._json.last_name,
					email: profile.emails[indexPrimary].value,
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
	  User.findOne({ login: username.toLowerCase() }, function(err, user) {
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
	User.findOne({ $or: [{ fortytwoId: profile._json.id }, { email: profile._json.email }] }, function(err, user) {
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
		User.findOne({ $or: [{ fortytwoId: profile._json.id }, {email: profile._json.email }] }, function(err, user) {
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
	localStrategy: localStrategy,
	googleStrategy: googleStrategy,
	twitchStrategy: twitchStrategy
}