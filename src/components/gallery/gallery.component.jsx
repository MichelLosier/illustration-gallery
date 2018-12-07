import React from 'react';
import PropTypes from 'prop-types'
import ArtworkCard from '../artwork-card/artwork-card.component';

class Gallery extends React.Component {
    constructor(){
        super();
    }

    propTypes = {
        artworks: PropTypes.arrayOf(PropTypes.object),
        //currently selected artwork by id
        selectedArtwork: PropTypes.string,
        //handle selection of an artwork
        onArtworkSelection: PropTypes.func,
        //handle requests to edit an artwork
        onArtworkEdit: PropTypes.func,
        //handle request to delete an artwork
        onArtworkDelete: PropTypes.func,

    }

    handleArtworkClick = (id) => {
        this.props.onArtworkSelection(id)
    }

    handleEditClick = (id) =>{
        this.props.onArtworkEdit(id)
    }

    handleDeleteClick = (id) => {
        this.props.onArtworkDelete(id);
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
                                onClick={()=>{this.handleEditClick(artwork._id)}}
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
            <div className="gallery">
                <ul>
                    {this.galleryImages()}
                </ul>
            </div>
        )
    }
}

export default Gallery;