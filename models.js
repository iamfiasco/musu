const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost", {useNewUrlParser: true})

const songSchema = new mongoose.Schema({
	fpath: String,
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

const songsModel = new mongoose.Model("musu", songSchema)
const libraryModel = new mongoose.Model("musu", librarySchema)

module.exports = {
	songsModel: songsModel,
	librarySchema: librarySchema
}
