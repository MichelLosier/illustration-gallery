import React from 'react';
import PropTypes from 'prop-types';

import Image from './image.component';

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
                    <div
                        className="options"
                    >
                        {artwork.caption}
                        <input type="button" value="edit"/>
                    </div>
                }
            </div>
        )
    }
}

export default ArtworkCard;