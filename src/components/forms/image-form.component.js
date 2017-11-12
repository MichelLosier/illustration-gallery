import React from 'react';
import PropTypes from 'prop-types'

import Image from '../image.component'
//TODO
class ImageForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showFields: false
        }
    }
    componentWillMount(){
        if (!this.props.url){
            this.setState({
                showFields: true
            });
        }
    }
    handleClick = () => {
        if(this.props.url && !this.state.showFields){
            this.setState((prevState) => {
                return {
                    showFields: !prevState.showFields
                }
            });
        }
    }

    render(){
        return(
            <div 
                className="padded-group border width-12 gallery-fixed-height"
                onClick={this.handleClick}
            >
                <Image
                    altText={this.props.altText}
                    url={this.props.url}
                />
                {this.state.showFields && this.props.children}
            </div>
        )
    }
}

export default ImageForm;