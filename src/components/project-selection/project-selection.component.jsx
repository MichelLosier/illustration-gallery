import React from 'react';

import ProjectCard from '../project-card/project-card.component';
import ProjectService from '../../services/project.service';

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

    handleProjectClick = (id) => {
        this.setState({selectedProject: id});
    }

    projects = () => {
        const {projects, selectedProject} = this.state;

        return projects.map((project) => {
            let selected = (selectedProject == project._id) 
            let className = (selected) ? 'selected' : '';
            return( 
                <li
                    id={project._id}
                    key={project._id}
                    onClick={()=>{this.handleProjectClick(project._id)}}
                    className={className}
                >
                    <div className="card-container">
                        <ProjectCard
                            selected={selected}
                            project={project}
                        />
                    </div>
                </li>
            )
        })
    }

    render(){
        return(
            <div className="project-selection">
                <ul>
                    {this.projects()}
                </ul>
            </div>
        )
    }
}

export default ProjectSelection;