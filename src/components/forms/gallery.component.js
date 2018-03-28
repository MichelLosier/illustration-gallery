import React from 'react';

import ArtworkCard from '../artwork-card.component';

class Gallery extends React.Component {
    constructor(){
        super();
    }
    
    galleryImages = () => {
        const images = this.props.artworks.map((artwork) => {
            return(
                <li>
                    <ArtworkCard
                        artwork={artwork}
                    />
                </li>
            )
        })
        return images;
    }

    render() {
        return(
            <div 
                className="gallery-flex-container border"
            >
                {this.galleryImages()}
            </div>
        )
    }
}

export default Gallery;