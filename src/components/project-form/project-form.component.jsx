import React from 'react';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom'

import TextField from '../text-field/text-field.component';
import TagManage from '../tag-manage/tag-manage.component';
import FormTabs from '../form-tabs/form-tabs.component';

import ProjectGalleryManage from '../project-gallery-manage/project-gallery-manage.component';

import ProjectService from '../../services/project.service';
import ArtworkService from '../../services/artwork.service';

const project$ = new ProjectService();
const artwork$ = new ArtworkService();

class ProjectForm extends React.Component {
    constructor(){
        super()
        this.state = {
            fieldErrors: {},
            project: {
                name: '',
                description: '',
                featuredImage: null,
                category: '',
                tags: [],
                gallery: []
            },
            selectedTab: 'INFO',
            newArtworks: []
        }
        this.tabMap = {
            'INFO':'Project Information',
            'GALLERY':'Gallery'
        }
        this.defaultProject = {
            name: '',
            description: '',
            featuredImage: null,
            category: '',
            tags: [],
            gallery: []
        }
    }

    static propTypes = {
        project: PropTypes.object,
        onSubmit: PropTypes.func
    }


    componentWillMount = () => {
        const projectId = this.props.project;
        console.log(`received projectid: ${projectId}`)
        if(projectId){
            project$.getProjectByID(projectId).then((project) => {
                this.setState({
                    project: project
                })
            })
        } 
    }

    handleFormSubmit = (evt) => {
        const s = this.state
        const artworks = s.collections.gallery.map((artwork) => {
            return artwork._id
        });
        const project = Object.assign({}, 
            s.selectedProject, 
            {gallery: artworks}
        ) //merge form state into project object state
    
        evt.preventDefault();
    
        if (this.validate()) return;

        console.log(`Submitted Project: ${JSON.stringify(project)}`);
        project$.createProject(project).then((data) => {
            if (s.newArtworks.length > 0) {
                artwork$.updateArtworks({
                    artworks: [...s.newArtworks],
                    keys: {$push: {projects: data._id}}
                })
            }
            this.setState({
                selectedProject: {},
                selectedTab: 'INFO',
                newArtworks: []
            })
        })

    }

    handleInputChange = ({name, value, error}) => {
        this.setState((prevState) => {
            prevState.project[name] = value;
            prevState.fieldErrors[name] = error;
            return prevState;
        })

    }

    handleArtworkChange = ({name, id}) => {
        this.setState((prevState) => {
            const {project} = this.prevState
            
        })
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
        const project = this.state.project;
        const fieldErrors = this.state.fieldErrors;
        const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k]);

        return false;
    };

    render() {
        const {project, selectedTab} = this.state;
        const formClasses = (selectedTab == "GALLERY") ? "project-form full-width" : "project-form"
        return (
            <div className={formClasses}>
                
                <FormTabs
                    tabMap={this.tabMap}
                    selectedKey={selectedTab}
                    onSelection={this.handleFormTabClick}
                />
                {(this.state.selectedTab == 'GALLERY') ? (
                    <ProjectGalleryManage
                        gallery={project.gallery}
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
                                value={project.name}
                                onChange={this.handleInputChange}
                                validate={false}
                            />
                            <TextField
                                placeholder='Description'
                                name='description'
                                label='Description'
                                value={project.description}
                                onChange={this.handleInputChange}
                                validate={false}
                            />
                            <TextField //change to dropdown selection
                                placeholder='Category'
                                name='category'
                                label='Category'
                                value={project.category}
                                onChange={this.handleInputChange}
                                validate={false}
                            />
                        </div>
                        <div className="padded-group">
                            <TagManage
                                collection={project.tags}
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