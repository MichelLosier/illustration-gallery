import React from 'react';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom'

import TextField from '../text-field/text-field.component';
import TagManage from '../tag-manage/tag-manage.component';
import ArtworkService from '../../services/artwork.service';
import ImageForm from '../image-form/image-form.component';
import ArtworkCard from '../artwork-card/artwork-card.component';

import DEFAULT_ARTWORK from './defaultArtwork.model';
import {deepMerge} from '../../helpers';

const artworkService = new ArtworkService();

class ArtworkForm extends React.Component {
    constructor(){
        super()
        this.state = {
            artwork: DEFAULT_ARTWORK,
            fieldErrors: {},
            populatedProjects:[],
            selectedImage: 'largeImage',
            toArtwork: false
        }
        this.imageFormLabelMap = {
            'largeImage': 'Hi-Res Detail Image',
            'normalImage': 'Gallery Image',
            'previewImage': 'Preview Image',
        }
    }


    static propTypes = {
        onSubmit: PropTypes.string,
        artworkId: PropTypes.string
    }

    componentWillMount = () => {
        const {artworkId} = this.props;

        if(artworkId && artworkId.match(/new/i) == null){
            artworkService.getArtworkByID(artworkId).then((artwork) => {
                const populatedProjects = artwork.projects;

                if(artwork.projects.length > 0){
                    artwork.projects = artwork.projects.map((project) => {
                        return project._id
                    })
                }
                this.setState({
                    artwork: artwork,
                    populatedProjects: populatedProjects,
                })
            })
        } 
    }
    
    handleFormSubmit = (evt) => {
        const {artwork} = this.state
        const artworkId = this.props.artworkId
        
        evt.preventDefault();
    
        if (this.validate()) return;

        if(artworkId.match(/new/i) == null){
            artworkService.updateArtwork(artworkId, artwork).then((data) => {
                if(data){
                    if (this.props.onSubmit){
                        this.props.onSubmit(data.body)
                        return;
                    }
                    //if no submit handler then back to /artwork
                    this.setState({toArtwork: true})
                    return;
                }  
            })
        } else {
            artworkService.createArtwork(artwork).then((data) => {
                if(data){
                    if(this.props.onSubmit){
                        this.props.onSubmit(data.body)
                    }
                    this.setState({
                        artwork: DEFAULT_ARTWORK,
                        populatedProjects: [],
                        selectedImage: 'largeImage',
                    })
                }

            })
        }
    };
    
    handleInputChange = ({ name, value, error }) => {
        this.setState((prevState) => {
            const {artwork, fieldErrors, selectedImage} = prevState;
            const updatedArtwork = Object.assign({}, artwork)
            const updatedFieldErrors = Object.assign({}, fieldErrors)

            if (name in artwork.images[selectedImage]){
                updatedArtwork.images[selectedImage][name] = value;
                updatedFieldErrors[`${selectedImage}${name}`] = error;
            } else {
                updatedArtwork[name] = value;
                updatedFieldErrors[name] = error;
            }
            return {
                artwork: updatedArtwork,
                fieldErrors: updatedFieldErrors,
            } 
        })
    };

    handleImageSelect = (image) => {
        this.setState({selectedImage: image});
    }

    //only add or remove items from collection fields (like tags)
    handleCollectionChange = (name, value) => {
        this.setState((prevState) => {
            const newState = Object.assign({}, prevState);
            const index = prevState.artwork[name].indexOf(value)

            if (index > -1) {
                newState.artwork[name] = prevState.artwork[name].filter((item) => {
                    return item != value
                })
                
            } else {
                newState.artwork[name] = [...prevState.artwork[name], value]
            }
            return newState
        })
    }
    
    validate = () => {
        const artwork = this.state.fields;
        const fieldErrors = this.state.fieldErrors;
        const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k]);

        return false;
    };
    
    render() {
        const {artwork, selectedImage} = this.state;
        if (this.state.toProjects === true) {
            return <Redirect to='/artwork' />
        }
        return (
            <div className="artwork-form">
                <form 
                    onSubmit={this.handleFormSubmit}
                >
                    <ImageForm
                        onInputChange={this.handleInputChange}
                        onImageSelect={this.handleImageSelect}
                        images={artwork.images}
                        selectedImage={selectedImage}
                        labelMap={this.imageFormLabelMap}
                    />
                    <div className="artwork-fields">
                        <div className="padded-group">

                            <TextField
                                placeholder='Caption'
                                name='caption'
                                label='Caption'
                                value={artwork.caption}
                                onChange={this.handleInputChange}
                                validate={false}
                            />

                            <TextField
                                placeholder='narrative about the artwork'
                                name='description'
                                label='Long Description'
                                value={artwork.description}
                                onChange={this.handleInputChange}
                                validate={false}                   
                            />
                        </div>
                        <div className="padded-group">
                            <TagManage
                                collection={artwork.tags}
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
                    </div>

                </form>
            </div>
        )
    }
}

export default ArtworkForm;