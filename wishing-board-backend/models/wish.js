require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)

const wishSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		maxlength: 50,
	},
	content: {
		type: String,
		required: true,
		maxlength: 300,
	},
})

wishSchema.set('toJSON', {
	transform: (document, returnedObj) => {
		returnedObj.id = returnedObj._id.toString()
		delete returnedObj._id
		delete returnedObj.__v
	},
})

module.exports = mongoose.model('Wish', wishSchema)
