import React from 'react';

import {Route, Link} from 'react-router-dom'
import ProjectForm from '../project-form/project-form.component';
import ProjectSelection from '../project-selection/project-selection.component';

import ManagementBar from '../management-bar/management-bar.component';

class ProjectManage extends React.Component {
    constructor(){
        super();
        this.state = {
            selection: true
        }
    }

    render(){
        return(
            <div className="project-manage-container">
                 <ManagementBar
                    viewTitle="Projects"
                />
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
                        path="/projects/new"
                        render={()=>{
                            return(
                                <ProjectForm/>
                            )
                        }}
                    />
                    
                </div>
            </div>
        )
    }
}

export default ProjectManage;