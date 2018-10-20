import React from 'react';
import {Link} from 'react-router-dom';

import Image from '../image/image.component';


class ProjectCard extends React.Component {
    constructor(){
        super();
        this.state = {}
    }

    fullDescription = () => {
        const {project} = this.props;
        return(
            <div className="full-description">
                <div className="description">{project.description}</div>
            </div>
        )
    }

    actions = () => {
        return(
            <div className="actions">
                <Link to={`/projects/${this.props.project._id}`}>
                    <input type='button' value="Edit" />
                </Link>
            </div>
        )
    }

    render(){
        const {project, selected} = this.props;
        const image = project.featuredImage ? 
            (project.featuredImage.images.previewImage) 
            : (project.gallery[0].images.previewImage);
        const cardClasses = (selected) ? "project-card selected" : "project-card";
        return(
            <div className={cardClasses}>
                <div className="project-image">
                    <Image
                        url={image.url}
                        altText={image.altText}
                    />
                </div>
                <div className="project-information">
                    <div className="name">
                        {project.name}
                    </div>
                    {selected && this.fullDescription()}
                    <div className="details">
                        <div>Category: {project.category}</div>
                        <div>Created: {project.dateAdded}</div>
                        <div>{`Artworks: ${project.gallery.length}`}</div>
                    </div>
                    {selected && this.actions()}
                </div>
 
            </div>
        )
    }
}

export default ProjectCard;