import React from 'react';

import {Route, Link} from 'react-router-dom'
import ProjectForm from '../forms/project-form.component';

class ProjectManage extends React.Component {
    constructor(){
        super();
        this.state = {}
    }

    render(){
        return(
            <div className="width-12">
                <h2>Manage Projects</h2>
                <div className="layout-container">
                    <ProjectForm/>
                </div>
            </div>
        )
    }
}

export default ProjectManage;