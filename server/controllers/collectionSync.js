const Project = require('../models/project');
const Artwork = require('../models/artwork');


//associate artworks listed in gallery of project to the project
exports.syncArtworksToProject = (project) => {

    //query: get artworks by each id in project gallery
    //that don't have the project id associated with it
    const query = {
        _id: {$in: project.gallery}, 
        projects: {$ne: project._id}
    }
    
    //update found artworks with with project._id
    const update = { $push: {projects: project._id}}
    
    return Artwork.updateMany(query, update)
    .then((result) => {
        return result;
    })
}

//remove references of project from associated artworks
exports.deleteProjectFromArtworks = (project) => {
    //find all artworks referenced in the project gallery
    const query = {_id: {$in: project.gallery}}

    //pull project id from artwork projects id
    const update = { $pull: {projects: project._id}}

    return Artwork.updateMany(query, update)
    .then((result) => {
        return result
    })
}

//remove references of artwork from associated projects
exports.deleteArtworkFromProjects = (artwork) => {
    //find all projects referenced in the artwork projects
    const query = {_id: {$in: artwork.projects}}

    //pull artwork ids from project gallery
    const update = { $pull: {gallery: artwork._id}}

    return Project.updateMany(query, update)
    .then((result) => {
        return result
    })
}