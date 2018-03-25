import React from 'react';
import PropTypes from 'prop-types';

import Field from './field.component';
import TagManage from './tag-manage.component';
import ArtworkService from '../../services/artwork.service';
import ImageForm from './image-form.component';

const Artwork$ = new ArtworkService();

class ArtworkForm extends React.Component {
    constructor(){
        super()
        this.state = {
            fields: {
                caption: '',
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
            artwork: null,
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
        artwork: PropTypes.object
    }

    handleFormSubmit = (evt) => {
        const s = this.state
        const artwork = Object.assign({}, s.artwork, s.fields, s.collections) //merge form state into artwork object state
    
        evt.preventDefault();
    
        if (this.validate()) return;

        console.log(`Submitted Artwork: ${JSON.stringify(artwork)}`);
        Artwork$.createArtwork(artwork, (data) => {
            if (this.props.onFormSubmit){this.props.onFormSubmit({
                    data: data, 
                    action: this.state.actionType
                })
            };
            this.setState({
                fields: {
                    caption: '',
                    description: '',
                    images: {
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
                collections: {
                    tags:[],
                    projects:[]
                },
                artwork: null
            });
        });
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
                    <h3>Create Artwork</h3>
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