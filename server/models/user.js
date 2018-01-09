const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const fs = require('fs');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    login: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
	},
	picturePath: {
		type: String,
		required: false
	},
	facebookId: {
		type: String,
		required: false
	},
	fortytwoId: {
		type: String,
		required: false
	},
	githubId: {
		type: String,
		required: false
	},
	googleId: {
		type: String,
		required: false
	},
	twitchId: {
		type: String,
		required: false
	},
	videoSeen: {
		type: Array,
		required: false
	},
	videoLiked: {
		type: Array,
		required: false
	},
	wishList: {
		type: Array,
		required: false
	}
})

// methods ======================
// generating a hash
userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.checkPassword = (candidatePwd, userPwd) => {
	if (!userPwd)
		return null;
	else
    	return bcrypt.compareSync(candidatePwd, userPwd);
}

userSchema.methods.removeFile = (src) => {
	fs.stat(src, function (err, stats) {
		if (err) {
			console.log(err)
			res.send(err)
		}
		fs.unlink(src, (err) => {
			if (err) {
				console.log(err)
				res.send(err)
			}
			console.log('Item Deleted')
		})
	});
}

module.exports = mongoose.model('User', userSchema);