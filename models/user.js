const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// User Schema
const UserSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	},
	todos: {
		type: Array
	},
	completed: {
		type: Number
	}
})

const User = module.exports = mongoose.model('User', UserSchema)
