import React from 'react';
import PropTypes from 'prop-types'
import ArtworkCard from '../artwork-card.component';

class Gallery extends React.Component {
    constructor(){
        super();
    }

    propTypes = {
        artworks: PropTypes.object,
        selectedArtwork: PropTypes.object,
        onArtworkSelection: PropTypes.func
    }

    handleArtworkClick = (id) => {
        this.props.onArtworkSelection(id)
    }

    handleEditClick = () =>{
        this.props.onEditReq()
    }

    handleDeleteClick = (id) => {
        console.log(`delete ${id}`)
        this.props.onArtworkChange({data: id, action:'DELETE'});
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

                    <ArtworkCard artwork={artwork}>
                        <div 
                            className="delete card"
                            onClick={() => {this.handleDeleteClick(artwork._id)}}
                        >
                            x
                        </div>
                        <div className="options">
                            {artwork.caption}
                            <input 
                                type="button" 
                                value="edit"
                                onClick={this.handleEditClick}
                            />
                        </div>
                    </ArtworkCard>
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