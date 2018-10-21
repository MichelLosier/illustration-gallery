import React from 'react';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom'

import TextField from '../text-field/text-field.component';
import TagManage from '../tag-manage/tag-manage.component';
import FormTabs from '../form-tabs/form-tabs.component';

import ProjectGalleryManage from '../project-gallery-manage/project-gallery-manage.component';

import ProjectService from '../../services/project.service';
import ArtworkService from '../../services/artwork.service';

const Project$ = new ProjectService();
const Artwork$ = new ArtworkService();

class ProjectForm extends React.Component {
    constructor(){
        super()
        this.state = {
            fields: {
                name: '',
                description: '',
                featuredImage: null,
                category: ''
            },
            fieldErrors: {

            },
            collections: {
                gallery: [],
                tags: []
            },
            selectedProject: null,
            selectedTab: 'INFO',
            newArtworks: []
        }
        this.tabMap = {
            'INFO':'Project Information',
            'GALLERY':'Gallery'
        }

    }

    static propTypes = {
        project: PropTypes.object,
        onSubmit: PropTypes.func
    }


    handleFormSubmit = (evt) => {
        const s = this.state
        const artworks = s.collections.gallery.map((artwork) => {
            return artwork._id
        });
        const project = Object.assign({}, 
            s.selectedProject, 
            s.fields, 
            s.collections.tags, 
            {gallery: artworks}
        ) //merge form state into project object state
    
        evt.preventDefault();
    
        if (this.validate()) return;

        console.log(`Submitted Project: ${JSON.stringify(project)}`);
        Project$.createProject(project).then((data) => {
            if (s.newArtworks.length > 0) {
                Artwork$.updateArtworks({
                    artworks: [...s.newArtworks],
                    keys: {$push: {projects: data._id}}
                })
            }
            this.setState({
                fields: {
                    name: '',
                    description: '',
                    featuredImage: null,
                    category: ''
                },
                collections: {
                    gallery: [],
                    tags: []
                },
                selectedProject: null,
                selectedTab: 'INFO',
                newArtworks: []
            })
        })

    }

    handleInputChange = ({name, value, error}) => {
        const fields = this.state.fields;
        const fieldErrors = this.state.fieldErrors;

        fields[name] = value;
        fieldErrors[name] = error; 

        this.setState({ fields, fieldErrors });
    }

    handleCollectionChange = ({name, value, action}) => {
        this.setState((prevState) => {
            console.log(`${name}, ${action}, ${JSON.stringify(value)}`)
            const newState = Object.assign({}, prevState);
            const collection = prevState.collections[name]

            if (action == 'CREATE' && collection.indexOf(value) < 0){
               newState.collections[name] = [
                    ...collection, value
                ]
                if(name == 'gallery'){ 
                    newState.newArtworks = [
                        ...prevState.newArtworks, value._id
                    ]
                }
            } else if (action == 'UPDATE') {
                const i = newState.collections[name].findIndex((item) => {
                    return item._id == value._id
                });
                newState.collections[name][i] = value;
            } else if ( action == 'DELETE') {
                if( name == 'gallery'){
                    newState.newArtworks = newState.newArtworks.filter((item) => {
                        return item != value;
                    })
                }
                newState.collections[name] = collection.filter((item)=>{
                    return (item != value) && (item._id != value);
                })
            }
            console.log(`newState: ${JSON.stringify(newState)}`)
            return newState;
        })
    }

    handleFormTabClick = (key) => {
        this.setState({selectedTab: key});
    }

    validate = () => {
        const project = this.state.fields;
        const fieldErrors = this.state.fieldErrors;
        const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k]);

        return false;
    };

    render() {
        const fields = this.state.fields;
        const formClasses = (this.state.selectedTab == "GALLERY") ? "project-form full-width" : "project-form"
        return (
            <div className={formClasses}>
                
                <FormTabs
                    tabMap={this.tabMap}
                    selectedKey={this.state.selectedTab}
                    onSelection={this.handleFormTabClick}
                />
                {(this.state.selectedTab == 'GALLERY') ? (
                    <ProjectGalleryManage
                        gallery={this.state.collections.gallery}
                        onGalleryChange={this.handleCollectionChange}
                    />
                ) : (
                    <form onSubmit={this.handleFormSubmit}>
                        <h3>Create Project</h3>
                        <div className="padded-group">
                            <TextField
                                placeholder='Project Name'
                                name='name'
                                label='Name'
                                value={fields.name}
                                onChange={this.handleInputChange}
                                validate={false}
                            />
                            <TextField
                                placeholder='Description'
                                name='description'
                                label='Description'
                                value={fields.description}
                                onChange={this.handleInputChange}
                                validate={false}
                            />
                            <TextField //change to dropdown selection
                                placeholder='Category'
                                name='category'
                                label='Category'
                                value={fields.category}
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
                        <div className="padded-group button-row">
                            <input type='submit' value="Submit" disabled={this.validate()} />
                        </div>
                    </form>
                )}
            </div>
        )
    }
}

export default ProjectForm;