import React from 'react';

import Gallery from '../gallery/gallery.component';

import ArtworkService from '../../services/artwork.service';

const artworkService = new ArtworkService();

class ArtworkSelection extends React.Component {
    constructor(){
        super();
        this.state = {
            artworks: [],
            selectedArtwork: null,
        }
    }

    componentDidMount(){
        this.getArtworks();
    }

    getArtworks = () => {
        artworkService.getArtworkAll().then((data) => {
            this.setState({artworks: data})
        })
    }

    handleArtworkClick = (id) => {
        this.setState({selectedArtwork: id})
    }

    handleArtworkDelete = (id) => {
        artworkService.deleteArtwork(id).then(() => {
            this.setState((prevState) => {
                prevState.artworks = prevState.artworks.filter((artwork) => {
                    return artwork._id != id;
                })
                return prevState;
            })
        })
    }

    render(){
        const {selectedArtwork, artworks} = this.state;

        return(
            <div className="artwork-selection">
                <Gallery
                    artworks={artworks}
                    selectedArtwork={selectedArtwork}
                    onArtworkSelection={this.handleArtworkClick}
                    onArtworkDelete={this.handleArtworkDelete}
                    isEmbedded={false}
                />
            </div>
        )
    }
}

export default ArtworkSelection;