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
        console.log(`received projectid: ${projectId}`)

        if(projectId){
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

        project$.createProject(project).then((data) => {
            this.setState({
                project: this.defaultProject,
                selectedTab: 'INFO',
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

    handleCollectionItemAddOrRemove = (name, value) => {
        this.setState((prevState) => {
            const updatePayload = {};
            const index = prevState.project[name].indexOf(value)

            if (index > -1) {
                updatePayload[name] = prevState.project[name].filter((item) => {
                    item != value
                })
            } else {
                updatePayload[name] = [...prevState[name], value]
            }
            return updatePayload
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
                        gallery={project.populatedGallery}
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
                                onChange={(value) => {this.handleCollectionItemAddOrRemove('tags', value)}}
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