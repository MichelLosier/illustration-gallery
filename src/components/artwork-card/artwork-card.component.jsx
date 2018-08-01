import React from 'react';
import PropTypes from 'prop-types';

import Image from '../image/image.component';

class ArtworkCard extends React.Component {
    constructor(){
        super();
        this.state = {
            showDetail: false
        }
    }
    static propTypes = {
        artwork: PropTypes.object
    }

    handleClick = () => {
        this.setState({
            showDetail: true
        })
    }
    

    handleMouseLeave = () => {
        this.setState({
            showDetail: false
        })
    }

    options = () => {
        return(
            <div>
                {this.props.children}
            </div>
        )
    }

    render() {
        const {artwork} = this.props
        return(
            <div
                className="artwork-card"
                onClick={this.handleClick}
                onMouseLeave={this.handleMouseLeave}
            >
                <Image
                    url={artwork.images.previewImage.url}
                    altText={artwork.images.previewImage.altText}
                />
                {this.state.showDetail &&
                    this.options()
                }
            </div>
        )
    }
}

export default ArtworkCard;