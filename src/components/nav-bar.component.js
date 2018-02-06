import React from 'react';

import { Route, Link } from 'react-router-dom';

class NavBar extends React.Component {
    constructor(){
        super();
    }

    render(){
        return(
            <div className="main-nav">
                <ul className="link-list-x">
                    <li>
                        <Link 
                            className="button hover-border"
                            to={`/artwork`}
                        >Artwork</Link>
                    </li>
                    <li>
                        <Link 
                            className="button hover-border"
                            to={`/projects`}
                        >Projects</Link>
                    </li>
                    <li>
                        <Link 
                            className="button hover-border"
                            to={`/config`}
                        >Configuration</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default NavBar;