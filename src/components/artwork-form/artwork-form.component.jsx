import React from 'react';
import PropTypes from 'prop-types';

import TextField from '../text-field/text-field.component';
import TagManage from '../tag-manage/tag-manage.component';
import ArtworkService from '../../services/artwork.service';
import ImageForm from '../image-form/image-form.component';
import ArtworkCard from '../artwork-card/artwork-card.component';

import {deepMerge} from '../../helpers';

const Artwork$ = new ArtworkService();

class ArtworkForm extends React.Component {
    constructor(){
        super()
        this.state = {
            fields: {
                caption:  '',
                description: '',
                images:{
                    previewImage: { //listing views
                        url:'',
                        altText:''
                    }, 
                    normalImage:{ // gallery view
                        url:'',
                        altText:''
                    }, 
                    largeImage:{ // in detail view
                        url:'',
                        altText:''
                    } 
                }
            },
            fieldErrors: {

            },
            collections: {
                tags:[],
                projects:[]
            },
            selectedImage: 'largeImage',
            actionType: 'CREATE'
        }
        this.imageFormLabelMap = {
            'largeImage': 'Hi-Res Detail Image',
            'normalImage': 'Gallery Image',
            'previewImage': 'Preview Image',
        }
    }


    static propTypes = {
        onSubmit: PropTypes.string,
        artwork: PropTypes.object || PropTypes.boolean
    }

    componentDidMount = () => {
        if(this.props.selectedArtwork){
            this.setFields(this.props.selectedArtwork)
        } 
    }

    setFields = (artwork) => {
        this.setState((prevState) => {
            let newState = {}
            if(artwork){
                newState.fields = deepMerge(prevState.fields, artwork);
                newState.collections = deepMerge(prevState.collections, artwork)
                newState.actionType = 'UPDATE';
            } else { //reset fields
                newState = deepMerge(prevState, {
                    defaults:{
                        string: '',
                        array: []
                    },
                    actionType: 'CREATE',
                    selectedImage: 'largeImage'
                })
            }
            return newState;
        })
    }
    
    formSubmitCallback = (data) => {
        if (this.props.onFormSubmit){
            this.props.onFormSubmit({
                data: data, 
                action: this.state.actionType
            });
        };
        this.setFields();
    };
 

    handleFormSubmit = (evt) => {
        const s = this.state
        const artwork = Object.assign({}, s.artwork, s.fields, s.collections) //merge form state into artwork object state
    
        evt.preventDefault();
    
        if (this.validate()) return;

        console.log(`Submitted Artwork: ${JSON.stringify(artwork)}`);
        if(s.actionType === 'CREATE'){
            Artwork$.createArtwork(artwork, this.formSubmitCallback);
        } else {
            Artwork$.updateArtwork(this.props.selectedArtwork._id, artwork, this.formSubmitCallback);
        }
    };
    
    handleInputChange = ({ name, value, error }) => {
        const fields = this.state.fields;
        const fieldErrors = this.state.fieldErrors;
        const selectedImage = this.state.selectedImage;

        if (name in fields.images[selectedImage]){
            fields.images[selectedImage][name] = value;
            fieldErrors[`${selectedImage}${name}`] = error;
        } else {
            fields[name] = value;
            fieldErrors[name] = error;
        }  

        this.setState({ fields, fieldErrors });
    };

    handleImageSelect = (image) => {
        this.setState({selectedImage: image});
    }

    handleCollectionChange = ({name, value, action}) => {
        this.setState((prevState) => {
            console.log(`${name}, ${action}, ${value}`)
            const newState = Object.assign({}, prevState);
            const collection = prevState.collections[name]

            if (action == 'CREATE' && collection.indexOf(value) < 0){
               newState.collections[name] = [
                    ...collection, value
                ]
            } else if ( action == 'DELETE') {
                newState.collections[name] = collection.filter((item)=>{
                    return item !== value
                })
            }
            return newState;
        })
    }
    
    validate = () => {
        const artwork = this.state.fields;
        const fieldErrors = this.state.fieldErrors;
        const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k]);

        return false;
    };
    
    render() {
        const fields = this.state.fields;
        const selectedImage = this.state.selectedImage;
        return (
            <div className="artwork-form">
                <form 
                    onSubmit={this.handleFormSubmit}>
                    <h3>{(this.state.actionType === 'CREATE')? 'Create New' : 'Update'} Artwork
                    </h3>
                    <div className="padded-group">
                        <ImageForm
                            onInputChange={this.handleInputChange}
                            onImageSelect={this.handleImageSelect}
                            images={fields.images}
                            selectedImage={selectedImage}
                            labelMap={this.imageFormLabelMap}
                        />
                    </div>
                    <div className="padded-group">

                        <TextField
                            placeholder='Caption'
                            name='caption'
                            label='Caption'
                            value={fields.caption}
                            onChange={this.handleInputChange}
                            validate={false}
                        />

                        <TextField
                            placeholder='narrative about the artwork'
                            name='description'
                            label='Long Description'
                            value={fields.description}
                            onChange={this.handleInputChange}
                            validate={false}                   
                        />
                    </div>
                    <div className="padded-group">
                        <TagManage
                            collection={this.state.collections.tags}
                            placeHolder='add new tag'
                            name='tags'
                            validate={null}
                            onChange={this.handleCollectionChange}
                            label='Tags'
                        />
                    </div>
                    <div className="padded-group">
                        <input type='submit' value="Submit" disabled={this.validate()} />
                    </div>
                </form>
            </div>
        )
    }
}

export default ArtworkForm;