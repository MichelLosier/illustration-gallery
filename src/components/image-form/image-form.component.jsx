import React from 'react';
import PropTypes from 'prop-types';

import TextField from '../text-field/text-field.component';
import FormTabs from '../form-tabs/form-tabs.component';
import Image from '../image/image.component';
import ImageUpload from '../image-upload/image-upload.component';
//TODO
class ImageForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showFields: false,
            showButtons: false
        }
    }

    static propTypes = {
        //handle input field change
        onInputChange: PropTypes.func,
        //handle selecting image
        onImageSelect: PropTypes.func,
        //selected image
        selectedImage: PropTypes.string,
        images: PropTypes.object,
        //map of image types for tab selection
        labelMap: PropTypes.object,
    }


    componentWillReceiveProps(newProps){
        const {images, selectedImage} = newProps;
        const image = images[selectedImage];
        if (!image.url.length > 0 ){
            this.setState({
                showFields: true
            });
        }
    }

    componentWillMount(){
        const {images, selectedImage} = this.props;
        const image = images[selectedImage];
        if (!image.url.length > 0 ){
            this.setState({
                showFields: true
            });
        }
    }

    handleEditClick = () => {
        this.setState({showFields: true});
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
        if(!this.state.showFields){
            this.setState({showButtons: show})
        }

    }
    handleImageSelection = (key) => {
        this.props.onImageSelect(key);
        const showFields = (this.props.images[key].url.length > 0)?
            false:true;
        this.setState({
            showFields: showFields,
            showButtons: false
         })
    }

    render(){
        const {selectedImage, images, labelMap, onInputChange} = this.props;
        return(
            <div className="image-form-container">
                <FormTabs
                    tabMap={labelMap}
                    selectedKey={selectedImage}
                    onSelection={this.handleImageSelection}
                />
                <div 
                    className="image-form"
                    onMouseEnter={() => {this.handleMouse(true)}}
                    onMouseLeave={() => {this.handleMouse(false)}}
                >
                    <Image
                        altText={images[selectedImage].altText}
                        url={images[selectedImage].url}
                    />
                    {(!this.state.showFields && this.state.showButtons) &&
                        <div 
                            className="transparent-form-overlay"
                        >
                            <input 
                                type='button' 
                                value='Edit'
                                onClick={this.handleEditClick}
                            />
                        </div>
                    }
                    {(this.state.showFields)&& 
                        <div className="transparent-form-overlay">
                            {/* <div className="padded-group">
                                <ImageUpload/>
                            </div> */}
                            <div className = "padded-group">
                                <TextField
                                    placeholder='URL to Image'
                                    name='url'
                                    label={labelMap[selectedImage]}
                                    value={images[selectedImage].url}
                                    onChange={onInputChange}
                                    validate={false}
                                />
                                <TextField
                                    placeholder='alt-text description'
                                    name='altText'
                                    label='Alt-Text'
                                    value={images[selectedImage].altText}
                                    onChange={onInputChange}
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