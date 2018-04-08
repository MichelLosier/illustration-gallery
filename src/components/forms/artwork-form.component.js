import React from 'react';
import PropTypes from 'prop-types';

import Field from './field.component';
import TagManage from './tag-manage.component';
import ArtworkService from '../../services/artwork.service';
import ImageForm from './image-form.component';
import artworkCardComponent from '../artwork-card.component';

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

    //@state is the state object to walk through to map new state object from
    //@newValues object that contains new values that should be mapped from. 
    //@useDefault if newValue doesn't exist use default value for type

    deepMap = (state, newValues) => {
        let newState = {}
        Object.keys(state).forEach((key) => {
            if(typeof newValues[key] === 'object' && Array.isArray(newValues[key]) === false){
                if(newValues.defaults){newValues[key].defaults = newValues.defaults;}
                newState[key] = this.deepMap(state[key], newValues[key]);
            }else if(key in newValues){
                newState[key] = newValues[key];
            }else if('defaults' in newValues){
                const type = (Array.isArray(state[key]) === true)? 'array' : typeof state[key];
                if(type in newValues.defaults){
                    newState[key] = newValues.defaults[type]
                } else {
                    newState[key] = this.deepMap(state[key], {defaults: newValues.defaults})
                }
            }
            return;
        })
        return newState;
    }

    setFields = (artwork) => {
        this.setState((prevState) => {
            let newState = {}
            if(artwork){
                newState.fields = this.deepMap(prevState.fields, artwork);
                newState.collections = this.deepMap(prevState.collections, artwork)
                newState.actionType = 'UPDATE';
            } else { //reset fields
                newState = this.deepMap(prevState, {
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
            <div className="min-width-40 width-6">
                <form 
                    className="border"
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

                        <Field
                            placeholder='Caption'
                            name='caption'
                            label='Caption'
                            value={fields.caption}
                            onChange={this.handleInputChange}
                            validate={false}
                        />

                        <Field
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