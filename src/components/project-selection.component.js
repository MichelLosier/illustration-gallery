import React from 'react';

import ProjectCard from './project-card.component';
import ProjectService from '../services/project.service';

const project$ = new ProjectService();

class ProjectSelection extends React.Component {
    constructor(){
        super();
        this.state = {
            selectedProject: null,
            projects: []
        }
    }

    componentDidMount(){
        this.getProjects();
    }

    getProjects = () => {
        project$.getProjectAll((data) => {
           this.setState({projects: data});
        });
    }

    projects = () => {
        const {projects, selectedProject} = this.state;
        return projects.map((project) => {
           return( 
                <li
                    id={project._id}
                    key={project._id}
                >
                    <ProjectCard
                        project={project}
                    />
                </li>
           )
        })
    }

    render(){
        return(
            <div>
                <ul className="flex-list-y">
                    {this.projects()}
                </ul>
            </div>
        )
    }
}

export default ProjectSelection;