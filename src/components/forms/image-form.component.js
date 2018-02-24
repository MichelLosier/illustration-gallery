import React from 'react';
import PropTypes from 'prop-types';

import Field from './field.component';
import Image from '../image.component';
import ImageUpload from './image-upload.component';
//TODO
class ImageForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showFields: false,
            showButtons: false
        }
    }
    
    componentWillMount(){
        const p = this.props;
        const image = p.images[p.selectedImage];
        if (!image.url.length > 0 ){
            this.setState({
                showFields: true
            });
        }
    }

    componentWillReceiveProps(nextProps){
        const p = this.props;
        const image = p.images[p.selectedImage];
        if (!image.url.length > 0 ){
            this.setState({
                showFields: true
            });
        }
    }
    
    handleEditClick = () => {
        const p = this.props;
        this.setState((prevState) => {
            return {
                showFields: true
            }
        });
    }

    handleDoneClick = () => {
        this.setState(
            {
                showFields: false,
                showButtons: false
            }
        )
    }

    handleMouse = (show) => {
        return () => {
            if(!this.state.showFields){
                this.setState((prevState) => {
                    return {
                        showButtons: show
                    }
                })
            }
        }
    }
    handleImageSelection = (evt) => {
        evt.preventDefault();
        this.props.onImageSelect(evt.target.id);
        const showFields = (this.props.images[evt.target.id].url.length > 0)?
            false:true;
        this.setState({
            showFields: showFields,
            showButtons: false
         })
    }
    imageLinks = () => {
        const images = Object.keys(this.props.images).map((key) => {
            return(
                <li key={key}> 
                    <a 
                        onClick={this.handleImageSelection}
                        className={(this.props.selectedImage == key)? "active" : null}
                        id={key}
                    >{this.props.labelMap[key]}</a>
                </li>
            )
        });
        return(
            <ul className="link-list-x">
                {images}
            </ul>
        )
    }

    render(){
        const selectedImage = this.props.selectedImage
        const images = this.props.images
        return(
            <div className="width-12 column-centered">
                <div>
                    {this.imageLinks()}
                </div>
                <div 
                    className="border padded-group gallery-fixed-height column-centered overlay-container"
                    onMouseEnter={this.handleMouse(true)}
                    onMouseLeave={this.handleMouse(false)}
                >
                    <Image
                        altText={images[selectedImage].altText}
                        url={images[selectedImage].url}
                    />
                    {(!this.state.showFields && this.state.showButtons) &&
                        <div 
                            className="overlay column-centered"
                        >
                            <input 
                                type='button' 
                                value='Edit'
                                onClick={this.handleEditClick}
                            />
                        </div>
                    }
                    {(this.state.showFields)&& 
                        <div className="overlay column-centered">
                            {/* <div className="padded-group">
                                <ImageUpload/>
                            </div> */}
                            <div className = "padded-group">
                                <Field
                                    placeholder='URL to Image'
                                    name='url'
                                    label={this.props.labelMap[selectedImage]}
                                    value={images[selectedImage].url}
                                    onChange={this.props.onInputChange}
                                    validate={false}
                                />
                                <Field
                                    placeholder='alt-text description'
                                    name='altText'
                                    label='Alt-Text'
                                    value={images[selectedImage].altText}
                                    onChange={this.props.onInputChange}
                                    validate={false}
                                />
                            </div>
                            <div className="padded-group">
                                <input 
                                    type='button' 
                                    value="Done" 
                                    onClick={this.handleDoneClick}
                                />
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default ImageForm;