import React from 'react';
import PropTypes from 'prop-types';

import Field from './field.component';
import TagManage from './tag-manage.component';
import ProjectGalleryManage from './project-gallery-manage.component';

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
            showGallery: false
        }
    }

    static propTypes = {
        project: PropTypes.object,
        onSubmit: PropTypes.func
    }

    handleFormSubmit = (evt) => {

    }

    handleInputChange = ({name, value, error}) => {

    }

    handleCollectionChange = ({name, value, action}) => {

    }

    handleFormTabClick = (bool) => {
        this.setState({showGallery: bool});
    }

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
                            Project Information
                        </li>
                        <li
                             onClick={() => {this.handleFormTabClick(true)}}
                        >
                            Project Gallery
                        </li>
                    </ul>
                </div>
                {(this.state.showGallery) ? (
                    <ProjectGalleryManage/>
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
                                label='category'
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
                    </form>
                )}
            </div>
        )
    }
}

export default ProjectForm;