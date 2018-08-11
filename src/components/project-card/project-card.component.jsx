import React from 'react';

import Image from '../image/image.component';

class ProjectCard extends React.Component {
    constructor(){
        super();
        this.state = {}
    }

    render(){
        const {project} = this.props;
        const image = project.featuredImage ? 
            (project.featuredImage.images.previewImage) 
            : (project.gallery[0].images.previewImage);
        return(
            <div className="project-card">
                <div className="project-image">
                    <Image
                        url={image.url}
                        altText={image.altText}
                    />
                </div>
                <div className="project-description">
                    <div className="name">
                        {project.name}
                    </div>
                </div>
            </div>
        )
    }
}

export default ProjectCard;