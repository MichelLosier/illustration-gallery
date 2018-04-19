import React from 'react';

import ArtworkService from '../../services/artwork.service';
import ArtworkForm from './artwork-form.component';
import Gallery from './gallery.component';

class ProjectGalleryManage extends React.Component {
    constructor(){
        super()
        this.state = {
            addArtwork: false,
            viewGallery: true,
            selectedArtwork: false
        }
    }

    handleArtworkChange = ({data, action}) => {
        this.props.onGalleryChange({
            name: 'gallery',
            value: data,
            action: action
        });
    }

    handleAddNew = (create) => {
        this.setState({
            addArtwork: true,
            viewGallery: !create,
            selectedArtwork: false
        })
    }

    handleEditReq = () =>{
        this.setState({
            viewGallery: false
        })
    }

    handleCancel = () => {
        this.setState({
            addArtwork: false,
            viewGallery: true
        })
    }

    handleArtworkSelection = (id) => {
        this.setState({
            selectedArtwork: id
        })
    }

    getSelectedArtwork = () => {
        const id = this.state.selectedArtwork;
        const artworks = this.props.gallery.filter((artwork) =>{
            if(artwork._id == id){
                return artwork
            }
        })
        return (artworks.length != 0) ? artworks[0] : false
    }

    addArtworkButtons = () => {
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

    render() {
        const s = this.state;
        
        return(
            <div className="border module">
                {(!s.viewGallery) ? (
                    <div>
                        <ArtworkForm
                            selectedArtwork={this.getSelectedArtwork()}
                            onFormSubmit={this.handleArtworkChange}
                        />
                    </div>
                ):(
                    <div>
                        <Gallery
                            onArtworkChange={this.handleArtworkChange}
                            artworks={this.props.gallery}
                            selectedArtwork={s.selectedArtwork}
                            onArtworkSelection={this.handleArtworkSelection}
                            onEditReq={this.handleEditReq}
                        />
                        {!s.addArtwork && this.addArtworkButtons()}
                    </div>
                )}
            </div>
        )
    }
}

export default ProjectGalleryManage;