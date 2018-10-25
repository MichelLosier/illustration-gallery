import React from 'react';

import {Route, Link} from 'react-router-dom'
import ProjectForm from '../project-form/project-form.component';
import ProjectSelection from '../project-selection/project-selection.component';

import ManagementBar from '../management-bar/management-bar.component';


class ProjectManage extends React.Component {
    constructor(){
        super();
        this.state = {
            selectedProject: null
        }
    }

    componentWillMount = () => {
        let selectedProject = null;
        const projectId = this.getProjectIdFromURLState();
        if (projectId) {
            selectedProject = projectId
        }
        this.setState({selectedProject: selectedProject})
    }

    getProjectIdFromURLState = () => {
        const {urlParams} = this.props;
        const project = (urlParams.id != /(new|)/) ? urlParams.id : null
        return project;
    }

    render(){
        return(
            <div className="project-manage-container">
                 <ManagementBar viewTitle="Projects">
                    <Route
                        exact path="/projects"
                        render={()=>{
                            return(
                                <Link to={'/projects/new'}>+ Add Project</Link>
                            )
                        }}
                    />
                    <Route
                        exact path="/projects/:id"
                        render={()=>{
                            return(
                                <Link to={'/projects/'}>Cancel</Link>
                            )
                        }}
                    />
                   
                </ManagementBar>
                <div className="layout-container">
                    <Route
                        exact path="/projects"
                        render={()=>{
                            return(
                                <ProjectSelection/>
                            )
                        }}
                    />
                    <Route
                        path="/projects/:id"
                        render={()=>{
                            return(
                                <ProjectForm
                                    project={this.state.selectedProject}
                                />
                            )
                        }}
                    />
                    
                </div>
            </div>
        )
    }
}

export default ProjectManage;