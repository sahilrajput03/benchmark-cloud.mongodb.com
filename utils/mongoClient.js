const mongoose = require('mongoose')
const {Schema} = mongoose
require('dotenv').config()

const connection_string = process.env.CONNECTION_STRING
// console.log({connection_string})
if (!connection_string) {
	throw new Error(
		'Please use read Readme.md file and put the mongoose connection string to be able to do benchmarks ~sahil.'
	)
}

mongoose.connect(connection_string, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

const COLLECTION_NAME = 'Cat'

const catSchema = new Schema({
	name: String,
	title: String, // String is shorthand for {type: String}
	author: String,
	body: String,
	date: {type: Date, default: Date.now},
})

const catModel = mongoose.model(COLLECTION_NAME, catSchema, COLLECTION_NAME) // providing third parameter as the collection name so mongo db doesn't pluralise my collection name.

module.exports = {catModel, COLLECTION_NAME}
