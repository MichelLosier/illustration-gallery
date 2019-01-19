import React from 'react';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom'

import TextField from '../text-field/text-field.component';
import TagManage from '../tag-manage/tag-manage.component';
import FormTabs from '../form-tabs/form-tabs.component';

import ProjectGalleryManage from '../project-gallery-manage/project-gallery-manage.component';

import ProjectService from '../../services/project.service';
import ArtworkService from '../../services/artwork.service';

import DEFAULT_PROJECT from './defaultProject.model';

const projectService = new ProjectService();

class ProjectForm extends React.Component {
    constructor(){
        super()
        this.state = {
            fieldErrors: {},
            project: Object.assign({},DEFAULT_PROJECT),
            selectedTab: 'INFO',
            populatedGallery: [],
            toProjects: false,
        }
        this.tabMap = {
            'INFO':'Project Information',
            'GALLERY':'Gallery'
        }

    }

    static propTypes = {
        //handler to return submitted data
        onSubmit: PropTypes.func,
        projectId: PropTypes.string,
    }


    componentWillMount = () => {
        const {projectId} = this.props;

        if(projectId && projectId.match(/new/i) == null){
            projectService.getProjectByID(projectId).then((project) => {
                const populatedGallery  = project.gallery

                project.gallery = project.gallery.map((artwork) => {
                    return artwork._id
                })

                this.setState({
                    project: project,
                    populatedGallery: populatedGallery
                })
            })
        } 
    }

    handleFormSubmit = (evt) => { 
        const {project} = this.state
        const projectId = this.props.projectId
        
        evt.preventDefault();
    
        if (this.validate()) return;
        console.log(`Submitting Project: ${JSON.stringify(project)}`);

        if(projectId.match(/new/i) == null){
            projectService.updateProject(projectId, project).then((data) => {
                if(data){
                    if (this.props.onSubmit){
                        this.props.onSubmit(data)
                    }
                    //if no submit handler then back to /projects

                    this.setState({
                        project: Object.assign({},DEFAULT_PROJECT),
                        populatedGallery: [],
                        selectedTab: 'INFO',
                        toProjects: true,
                    })
                    return;
                }  
            })
        } else {
            projectService.createProject(project).then((data) => {
                if(data){
                    if(this.props.onSubmit){
                        this.props.onSubmit(data)
                    }
                    console.log("Project submission returned");
                    this.setState({
                        project: Object.assign({},DEFAULT_PROJECT),
                        populatedGallery: [],
                        selectedTab: 'INFO',
                    })
                }

            })
        }
    }

    handleInputChange = ({name, value, error}) => {
        this.setState((prevState) => {
            prevState.project[name] = value;
            prevState.fieldErrors[name] = error;
            return prevState;
        })
    }

    //only add or remove items from collection fields (like tags)
    handleCollectionChange = (name, value) => {
        this.setState((prevState) => {
            const newState = Object.assign({}, prevState);
            const index = prevState.project[name].indexOf(value)

            if (index > -1) {
                newState.project[name] = prevState.project[name].filter((item) => {
                    return item != value
                })
                
            } else {
                newState.project[name] = [...prevState.project[name], value]
            }
            return newState
        })
    }

    handleArtworkChange = (artworkUpdate) => {
        console.log(artworkUpdate)
        this.setState((prevState) => {
            const project = Object.assign({}, prevState.project);
            const populatedGallery = [...prevState.populatedGallery]

            const index = populatedGallery.findIndex((artwork) => {
                return artworkUpdate._id == artwork._id
            })

            if (index > -1) {
                populatedGallery[index] = artworkUpdate;
            } else {
                project.gallery.push(artworkUpdate._id);
                populatedGallery.push(artworkUpdate);
            }

            return {project: project, populatedGallery: populatedGallery}
        })
    }

    handleArtworkDelete = (id) => {
        this.setState((prevState) => {
            const project = Object.assign({}, prevState.project);
            const populatedGallery = [...prevState.populatedGallery];

            project.gallery.filter((artwork) => {
                return artwork._id != id
            })

            populatedGallery.filter((artwork) => {
                return artwork._id != id
            })

            return {project: project, populatedGallery: populatedGallery}
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
        const {project, selectedTab, populatedGallery} = this.state;
        const formClasses = (selectedTab == "GALLERY") ? "project-form full-width" : "project-form"
        if (this.state.toProjects === true) {
            return <Redirect to='/projects' />
        }

        return (

            <div className={formClasses}>
                
                <FormTabs
                    tabMap={this.tabMap}
                    selectedKey={selectedTab}
                    onSelection={this.handleFormTabClick}
                />
                {(this.state.selectedTab == 'GALLERY') ? (
                    <ProjectGalleryManage
                        gallery={populatedGallery}
                        onArtworkChange={this.handleArtworkChange}
                        onArtworkDelete={this.handleArtworkDelete}
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
                                onTagChange={(value) => {this.handleCollectionChange('tags', value)}}
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