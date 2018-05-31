import React from 'react';

import {Route, Link} from 'react-router-dom'
import ProjectForm from '../forms/project-form.component';
import SideMenu from '../side-menu.component';

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
                    <div className="col-1">
                        <SideMenu/>
                    </div>
                    <div className="col-3">
                        <ProjectForm/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProjectManage;