const Project = require('../models/project');
const Artwork = require('../models/artwork');


//takes unpopulated project
exports.syncArtworksToProject = (project) => {
    const query = {
        _id: {$in: project.gallery}, 
        projects: {$ne: project._id}
    }
    
    const update = { $push: {projects: project._id}}
    
    return Artwork.updateMany(query, update)
    .then((result) => {
        return result;
    })
}