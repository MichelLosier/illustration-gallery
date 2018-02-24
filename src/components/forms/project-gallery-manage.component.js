import React from 'react';

import ArtworkService from '../../services/artwork.service';
import ImageForm from './image-form.component';

class ProjectGalleryManage extends React.Component {
    constructor(){
        super()
        this.state = {
            artworks: [],
            addArtwork: false
        }
    }

    render() {
        return(
            <div className="min-width-40 width-6">
                {(this.state.addArtwork) ? (
                    <div>
                        Create or Select Existing
                    </div>
                ):(
                    <div>
                        Artwork Gallery
                    </div>
                )}
            </div>
        )
    }
}

export default ProjectGalleryManage;