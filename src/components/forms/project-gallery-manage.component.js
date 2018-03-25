import React from 'react';

import ArtworkService from '../../services/artwork.service';
import ArtworkForm from './artwork-form.component';
import Gallery from './gallery.component';

class ProjectGalleryManage extends React.Component {
    constructor(){
        super()
        this.state = {
            addArtwork: false,
            viewGallery: true
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
            viewGallery: !create
        })
    }

    handleCancel = () => {
        this.setState({
            addArtwork: false,
            viewGallery: true
        })
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
            <div className="min-width-40 width-6 border module">
                {(!s.viewGallery) ? (
                    <div>
                        <ArtworkForm
                            onFormSubmit={this.handleArtworkChange}
                        />
                    </div>
                ):(
                    <div>
                        <Gallery
                            artworks={this.props.gallery}
                        />
                        {!s.addArtwork && this.addArtworkButtons()}
                    </div>
                )}
            </div>
        )
    }
}

export default ProjectGalleryManage;