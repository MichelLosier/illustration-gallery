const Artwork = require('../models/artwork');

exports.listAll = function(req, res, next){
	Artwork.find(function(err, docs){
		if(err) return console.error(err);
		res.json(docs);
	});
};

//get artwork by project id
exports.queryByProject = function(req, res, next) {
	Artwork.find({projects:[req.query._id]}, function(err, docs){
		if(err) return console.error(err);
		res.json(docs);
	});
};
//get artwork by id
exports.queryID = function(req, res, next) {
	Artwork.findOne({_id:req.params._id}, function(err, doc){
		res.json(doc);
	});
};

//create new artwork
exports.createArtwork = function(req, res, next){
	var _artwork = new Artwork(req.body);
	_artwork.save(function(err, artwork){
		if(err) return console.error(err);
		res.status(200).json(artwork);
	});
};

//update artwork
exports.updateArtwork = function(req, res, next){
	Artwork.findOneAndUpdate({_id: req.params._id}, req.body, {new:true},function(err, artwork) {
		if(err) return console.error(err);
		res.status(200).json(artwork);
	});
};

//update multiple artworks by _id set
exports.updateArtworks = function(req, res, next){ //TODO review params)
	Artwork.updateMany({_id: {$in: req.body.artworks}}, {$push: req.body.keys}, function(err, artworks){
		if(err) return console.error(err);
		res.status(200).json(artworks);
	});
};

//delete artwork
exports.deleteArtwork = function(req, res, next){
	Artwork.findOneAndRemove({_id: req.params.id}, function(err){
		if(err) return console.error(err);
		res.status(200);
	});
};

