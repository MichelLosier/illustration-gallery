import React from 'react';

import ArtworkService from '../../services/artwork.service';
import ArtworkForm from './artwork-form.component';
import Gallery from './gallery.component';

class ProjectGalleryManage extends React.Component {
    constructor(){
        super()
        this.state = {
            addArtwork: false,
            newArtwork: true
        }
    }
    handleArtworkChange = ({data, action}) => {
        this.props.onGalleryChange({
            name: 'gallery',
            value: data,
            action: action
        });
    }

    handleViewChange = (bool) => {
        this.setState({
            addArtwork: bool
        })
    }
    render() {
        return(
            <div className="min-width-40 width-6">
                {(this.state.addArtwork) ? (
                    <div>
                        Create or Select Existing
                        <div
                            className='padded-group'
                        >
                            <input
                                type="button"
                                value="View Gallery"
                                onClick={() => {this.handleViewChange(false)}}
                            />
                        </div>
                        <ArtworkForm
                            onFormSubmit={this.handleArtworkChange}
                        />
                    </div>
                ):(
                    <div>
                        <Gallery
                            artworks={this.props.gallery}
                        />
                        <div
                            className='padded-group'
                        >
                            <input
                                type="button"
                                value="Add New Artwork"
                                onClick={() => {this.handleViewChange(true)}}
                            />
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default ProjectGalleryManage;