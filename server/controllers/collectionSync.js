const Project = require('../models/project');
const Artwork = require('../models/project');

exports.syncArtworksToProject = (project) => {
    const artworksToUpdate = project.gallery.filter((artwork) => {
        return artwork.projects.indexOf(project._id) == -1;
    })
    return Artwork.updateMany({_id: {$in: artworksToUpdate}}, {$push: {projects: project_id}}, function(err, updatedArtworks){
        if (err) return err;
        
        updatedArtworks.forEach(function(updatedArtwork){
           const i = project.gallery.findIndex((artwork) => {
                artwork._id == updatedArtwork._id
           })

           project.gallery[i] = updatedArtwork;
        })
        return project;
    })
}