import React from 'react';

import Image from '../image.component';

class Gallery extends React.Component {
    constructor(){
        super();
    }
    
    galleryImages = () => {
        const images = this.props.artworks.map((artwork) => {
            return(
                <li>
                    <Image
                        url={artwork.images.previewImage.url}
                        altText={artwork.images.previewImage.altText}
                    />
                </li>
            )
        })
        return images;
    }

    render() {
        return(
            <div 
                className="gallery-flex-container"
            >
                {this.galleryImages()}
            </div>
        )
    }
}

export default Gallery;