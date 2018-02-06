import React from 'react';
import PropTypes from 'prop-types';

class ImageUpload extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            selectedFile: null,
            name:null,
            size:null
        }
    }

    handleFileSelect = (evt) =>{
        const file = evt.target.files[0];
        const reader = new FileReader

        reader.onload = (event) => {
            const url = event.target.result
            this.setState({
                selectedFile: url
            })
        }
        if(file){
            reader.readAsDataURL(file);
        }
    }

    render(){

        return(
            <div>
                <div className="column-centered">
                    {(this.state.selectedFile)&&
                        <div
                            className="preview-fixed-height"
                        >
                            <img
                                className='border contained'
                                src={this.state.selectedFile}
                            ></img>
                        </div>
                    }
                </div>
                <div className="form-group">
                    <label>Upload File</label>
                    <input 
                        type='file' 
                        onChange={this.handleFileSelect}
                    />
                </div>
            </div>
        )
    }
}

export default ImageUpload