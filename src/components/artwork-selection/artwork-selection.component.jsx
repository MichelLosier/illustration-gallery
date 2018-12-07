import React from 'react';

import Gallery from '../gallery/gallery.component';

import ArtworkService from '../../services/artwork.service';

const artworkService = new ArtworkService();

class ArtworkSelection extends React.Component {
    constructor(){
        super();
        this.state = {
            artworks: [],
            selectedArtwork: null
        }
    }

    componentDidMount(){
        this.getArtworks()
    }

    getArtworks = () => {
        artworkService.getArtworkAll().then((data) => {
            this.setState({artworks: data})
        })
    }

    handleArtworkSelection = (id) => {
        this.setState({selectedArtwork: id})
    }

    render(){
        const {artworks, selectedArtwork} = this.state;
        return(
            <div className="artwork-selection">
                <Gallery
                    artworks={artworks}
                    selectedArtwork={selectedArtwork}
                    onArtworkSelection={this.handleArtworkSelection}
                    onArtworkEdit={null}
                    onArtworkDelete={null}
                />
            </div>
        )
    }
}

export default ArtworkSelection;