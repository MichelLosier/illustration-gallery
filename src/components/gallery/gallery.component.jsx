import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
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
        //Is gallery embedded in form or part of view
        //This will determine if edit button triggers navigation
        isEmbedded: PropTypes.bool,

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

    cardOptions = (artwork) => {
            const {isEmbedded} = this.props;
            return(
                <div className="actions">
                {(isEmbedded) ? (
                    <input 
                        type="button" 
                        value="edit"
                        onClick={()=>{this.handleEditClick(artwork._id)}}
                    />
                ):(
                    <Link to={`/artwork/${artwork._id}`}>
                        <input type='button' value="Edit" />
                    </Link>
                )}
                    <input type='button' value="Delete" onClick={() => {this.handleDeleteClick(artwork._id)}} />
                </div>
            )

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
                        <div className="options">
                            {artwork.caption}
                            {this.cardOptions(artwork)}
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