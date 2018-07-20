import React from 'react';

import {Route, Link} from 'react-router-dom'
import ProjectForm from '../project-form/project-form.component';
import SideMenu from '../side-menu.component';

class ProjectManage extends React.Component {
    constructor(){
        super();
        this.state = {}
    }

    componentDidMount(){
        this.props.getContext('Manage Projects');
    }

    render(){
        return(
            <div className="project-manage-container">
                <div className="layout-container">
                    <ProjectForm/>
                </div>
            </div>
        )
    }
}

export default ProjectManage;