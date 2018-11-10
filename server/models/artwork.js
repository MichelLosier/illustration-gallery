const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artworkSchema = new Schema({
	projects: [{type: Schema.Types.ObjectId, ref: 'project'}],
	dateAdded: { type: Date, default: Date.now },
	caption: String,
	description: String,
	tags: [String],
	images: {
		previewImage: {
			url: String,
			altText: String
		},
		normalImage: {
			url: String,
			altText: String
		},
		largeImage: {
			url: String,
			altText: String
		}
	}
});

const Artwork = mongoose.model('artwork', artworkSchema);
module.exports = Artwork;