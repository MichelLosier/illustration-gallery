const Project = require('../models/project');
const Sync = require('./collectionSync');
//get all projects
exports.listAll = function(req, res, next){
	Project.find()
	.populate('featuredImage gallery')
	.exec(function(err, doc){
		if(err) return console.error(err);
		res.json(doc);
	});
};
//get all projects by category type
exports.categoryListAll = function (req, res, next) {
	Project.find({ category: req.params.cat })
	.populate('featuredImage gallery')
	.exec(function(err, doc){
		if(err) return console.error(err);
		res.json(doc);
	});
};

//get project by id
exports.queryID = function(req, res, next) {
	Project.findOne({_id: req.params._id})
	.populate('featuredImage gallery')
	.exec(function(err, doc){
		if(err) return console.error(err);
		res.json(doc);
	});
};

//create new project
exports.createProject = function(req, res, next){
	var _project = new Project(req.body);

	_project.save()
	.then(function(project){
		return Sync.syncArtworksToProject(_project);
	}).then(function(updatedArtworks){
		return _project.populate('featuredImage gallery');
	}).then(function(populatedProject){
		res.status(200).json(populatedProject);
	}).catch(function(err){
		console.error(err)
		res.status(500)
	})
};

//update project
exports.updateProject = function(req, res, next){
	let _project;
	Project.findOneAndUpdate({_id: req.params._id}, {$set: req.body}, {new: true})
	.then(function(project) {
		_project = project;
		return Sync.syncArtworksToProject(project);
	}).then(function(updatedArtworks){
		return Project.populate(_project, 'featuredImage gallery');
	}).then(function(populatedProject){
		res.status(200).json(populatedProject);
	}).catch(function(err){
		console.error(err)
		res.status(500)
	})
};

//delete project
exports.deleteProject = function(req, res, next){
	Project.findOneAndRemove({_id: req.params._id}, function(err, project){
		if(err) return console.log(err);
		res.status(200).json(project);
	});
};