import React from 'react';
import PropTypes from 'prop-types';

import Field from './field.component';
import TagManage from './tag-manage.component';
import ProjectGalleryManage from './project-gallery-manage.component';

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
            showGallery: false,
            newArtworks: []
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
        Project$.createProject(project, (data) => {
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
                showGallery: false,
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
            console.log(`${name}, ${action}, ${value}`)
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
                return newState.collections[name][i] = value;
            } else if ( action == 'DELETE') {
                newState.collections[name] = collection.filter((item)=>{
                    return item !== value
                })
            }
            return newState;
        })
    }

    handleFormTabClick = (bool) => {
        this.setState({showGallery: bool});
    }

    validate = () => {
        const project = this.state.fields;
        const fieldErrors = this.state.fieldErrors;
        const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k]);

        return false;
    };

    render() {
        const fields = this.state.fields;
        return (
            <div className="min-width-40 width-6">
                <h3>Create Project</h3>
                <div>
                    <ul className="link-list-x">
                        <li
                            onClick={() => {this.handleFormTabClick(false)}}
                        >
                            <a>Project Information</a>
                        </li>
                        <li
                             onClick={() => {this.handleFormTabClick(true)}}
                        >
                            <a>Project Gallery</a>
                        </li>
                    </ul>
                </div>
                {(this.state.showGallery) ? (
                    <ProjectGalleryManage
                        gallery={this.state.collections.gallery}
                        onGalleryChange={this.handleCollectionChange}
                    />
                ) : (
                    <form onSubmit={this.handleFormSubmit}>
                        <div className="padded-group">
                            <Field
                                placeholder='Project Name'
                                name='name'
                                label='Name'
                                value={fields.name}
                                onChange={this.handleInputChange}
                                validate={false}
                            />
                            <Field
                                placeholder='Description'
                                name='description'
                                label='Description'
                                value={fields.description}
                                onChange={this.handleInputChange}
                                validate={false}
                            />
                            <Field //change to dropdown selection
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
                        <div className="padded-group">
                            <input type='submit' value="Submit" disabled={this.validate()} />
                        </div>
                    </form>
                )}
            </div>
        )
    }
}

export default ProjectForm;