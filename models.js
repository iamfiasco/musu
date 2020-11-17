const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost", {useNewUrlParser: true})

const songSchema = new mongoose.Schema({
	fpath: {
				type: String,
				required: true
			},
	title: String,
	album: String,
	genre: String,
	trackNumber: String,
	year: String,
	publisher: String,
	image: Buffer
})

const librarySchema = new mongoose.Schema({
	name: String,
	createdBy: String,
	songs: [songSchema],
	description: String,
})

const userSchema = new mongoose.schema({
	username: {
					type: String,
					required: true
			},
	age: Number,
	createdAt: {
					type: Date,
					default: Date.now()
			},
	password: {
					type: String,
					required: true
			}
})

const songsModel = new mongoose.Model("musu", songSchema)
const libraryModel = new mongoose.Model("musu", librarySchema)
const userModel = new mongoose.Model("musuA", userSchema)

module.exports = {
	songsModel: songsModel,
	librarySchema: librarySchema
	userModel: userModel
}



