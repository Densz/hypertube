const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('./config');
const db = require('./database');

module.exports = (passport) => {
	let opts = {};

	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
	opts.secretOrKey = config.secret;
	const strategy = new JwtStrategy(opts, (jwt_payload, done) => {
		User.findOne({id: jwt_payload.sub}, (err, user) => {
			if (err) {
				return done(err, false);
			}
			if (user) {
				return done(err, user);
			} else {
				return (null, false);
			}
		});	
	});
	passport.use(strategy);	
}
