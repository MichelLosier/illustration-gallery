import React from 'react';
import PropTypes from 'prop-types'
import ArtworkCard from '../artwork-card.component';

class Gallery extends React.Component {
    constructor(){
        super();
        this.state = {
        }
    }

    propTypes = {
        artworks: PropTypes.object,
        selectedArtwork: PropTypes.object,
        onArtworkSelection: PropTypes.func
    }

    handleArtworkClick = (id) => {
        this.props.onArtworkSelection(id)
    }
    
    galleryImages = () => {
        const images = this.props.artworks.map((artwork) => {
            let className = '';
            if(this.props.selectedArtwork){
              className = (this.props.selectedArtwork._id  == artwork._id) ? 'selected' : '';
            }
            return(
                <li
                    key={artwork._id}
                    id={artwork._id}
                    onClick={() => {this.handleArtworkClick(artwork._id)}}
                    className={className}
                >
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
            <div>
                <ul 
                    className="gallery-flex-container border"
                >
                    {this.galleryImages()}
                </ul>
            </div>
        )
    }
}

export default Gallery;