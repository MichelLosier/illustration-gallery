const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artworkSchema = new Schema({
	projects: [String],
	dateAdded: { type: Date, default: Date.now },
	location: String,
	preview: String,
	normal: String,
	large: String,
	caption: String,
	description: String,
	altText: String
});

const Artwork = mongoose.model('artwork', artworkSchema);
module.exports = Artwork;