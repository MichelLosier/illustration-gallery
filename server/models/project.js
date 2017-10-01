const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Artwork = require ('./artwork');

const projectSchema = new Schema({
	name: String,
	position: Number,
	dateAdded: { type: Date, default: Date.now },
	description: String,
	featuredImage: {type: Schema.Types.ObjectId, ref: 'artwork'},
	category: String,
	tags: [String],
	gallery: [{type: Schema.Types.ObjectId, ref: 'artwork'}]
});

const Project = mongoose.model('project', projectSchema);

module.exports = Project;