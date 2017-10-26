const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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
        required: true
    },
    login: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
	},
	facebookId: {
		type: String,
		require: false
	},
	fortytwoId: {
		type: String,
		require: false
	}
})

// methods ======================
// generating a hash
userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.checkPassword = (candidatePwd, userPwd) => {
    return bcrypt.compareSync(candidatePwd, userPwd);
}

module.exports = mongoose.model('User', userSchema);