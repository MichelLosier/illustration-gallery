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
            populatedGallery: [],
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

        if(projectId && projectId.match(/new/i) == null){
            project$.getProjectByID(projectId).then((project) => {
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
        evt.preventDefault();
    
        if (this.validate()) return;
        console.log(`Submitting Project: ${JSON.stringify(project)}`);

        if(this.props.project.match(/new/i) == null){
            project$.updateProject(this.props.project, project).then((data) => {
                if(data.status == 200){
                    window.history.pushState('/projects');
                    return;
                }  
            })
        } else {
            project$.createProject(project).then((data) => {
                this.setState({
                    project: this.defaultProject,
                    selectedTab: 'INFO',
                })
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

    handleCollectionItemAddOrRemove = (name, value) => {
        this.setState((prevState) => {
            const newState = Object.assign({}, prevState);
            const index = prevState.project[name].indexOf(value)
            console.log(`field name: ${name}, value: ${value}`)
            if (index > -1) {
                newState.project[name] = prevState.project[name].filter((item) => {
                    item != value
                })
            } else {
                newState.project[name] = [...prevState.project[name], value]
            }
            return newState
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
                        onGalleryChange={(value) => {this.handleCollectionItemAddOrRemove('gallery', value)}}
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
                                onTagChange={(value) => {this.handleCollectionItemAddOrRemove('tags', value)}}
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