import React from 'react';

import {Route, Link} from 'react-router-dom'
import ProjectForm from '../project-form/project-form.component';
import ProjectSelection from '../project-selection/project-selection.component';

class ProjectManage extends React.Component {
    constructor(){
        super();
        this.state = {
            selection: true
        }
    }

    componentDidMount(){
        this.props.getContext('Manage Projects');
    }


    render(){
        return(
            <div className="project-manage-container">
                <div className="layout-container">
                    {(this.state.selection)?(
                        <ProjectSelection/>
                    ):(
                        <ProjectForm/>
                    )}
                </div>
            </div>
        )
    }
}

export default ProjectManage;