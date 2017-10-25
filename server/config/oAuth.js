const fbStrategy = require('passport-facebook').Strategy;
const ftStrategy = require('passport-42').Strategy;
const config = require('./config');

const facebookStrategy = new fbStrategy({
	clientID: config.facebookApi.clientID,
	clientSecret: config.facebookApi.clientSecret,
	callbackURL: 'http://localhost:3000/catalog',
	profileFields: ['id', 'email', 'first_name']
}, function(accessToken, refreshToken, profile, cb) {
	console.log('Facebook Strategy');
	return cb(null, profile);
});

const fortytwoStrategy = new ftStrategy({
	clientID: config.fortytwoApi.clientID,
	clientSecret: config.facebookApi.clientSecret,
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
		console.log('42 Strategy');
		console.log(profile);
		return cb(null, profile);
});

module.exports = {
	facebookStrategy: facebookStrategy,
	fortytwoStrategy: fortytwoStrategy
}