import React from 'react';
import PropTypes from 'prop-types';

import ArtworkService from '../../services/artwork.service';
import ArtworkForm from '../artwork-form/artwork-form.component';
import Gallery from '../gallery/gallery.component';

class ProjectGalleryManage extends React.Component {
    constructor(){
        super()
        this.state = {
            addArtwork: false,
            viewGallery: true,
            selectedArtwork: false
        }
    }

    static propTypes = {
        gallery: PropTypes.arrayOf(PropTypes.object),
        //pass new or updated artwork object to handler
        onArtworkChange: PropTypes.func,
        //pass artwork id to handler
        onArtworkDelete: PropTypes.func,
    }

    handleArtworkChange = (artwork) => {
        this.props.onArtworkChange(artwork);
    }

    handleArtworkDelete = (artwork) => {
        //trigger a prompt to confirm deletion 
        //and whether to orphan
        this.props.onArtworkDelete(artwork._id)
    }

    handleAddNew = (create) => {
        this.setState({
            addArtwork: true,
            viewGallery: !create,
            selectedArtwork: false
        })
    }

    handleNewArtworkCancel = () => {
        this.setState({viewGallery: true})
    }

    handleArtworkEdit = () =>{
        this.setState({
            viewGallery: false
        })
    }

    handleArtworkSelection = (id) => {
        this.setState({
            selectedArtwork: id
        })
    }

    getSelectedArtwork = () => {
        const id = this.state.selectedArtwork;
        const artwork = this.props.gallery.findIndex((artwork) =>{
            return artwork._id == id
        })
        return artwork;
    }

    artworkButtons = () => {
        return(
            <div className='padded-group'>
                <input 
                    type="button"
                    value="Create New"
                    onClick={() => {this.handleAddNew(true)}}
                />
                <input 
                    type="button"
                    value="Add Existing"
                    onClick={() => {this.handleAddNew(false)}}
                />
            </div>
        )
    }

    newArtworkFormOverlay = () => {
        return(
            <div className='transparent-overlay-container'>
                <div className="cancel" onClick={this.handleNewArtworkCancel}>
                    x
                </div>
                <ArtworkForm
                    selectedArtwork={this.getSelectedArtwork()}
                    onFormSubmit={this.handleArtworkChange}
                />
            </div>
        )
    }

    render() {
        const {selectedArtwork, viewGallery} = this.state;
        const {gallery} = this.props
        return(
            <div className="project-gallery-manage">
                {!viewGallery && this.newArtworkFormOverlay()}
                <div>
                    <Gallery
                        onArtworkDelete={this.onArtworkDelete}
                        artworks={gallery}
                        selectedArtwork={selectedArtwork}
                        onArtworkSelection={this.handleArtworkSelection}
                        onArtworkEdit={this.handleArtworkEdit}
                    />
                    {this.artworkButtons()}
                </div>
            </div>
        )
    }
}

export default ProjectGalleryManage;