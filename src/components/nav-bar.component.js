import React from 'react';

import { Route, Link } from 'react-router-dom';

class NavBar extends React.Component {
    constructor(){
        super();
    }

    render(){
        return(
            <div className="main-nav">
                <ul>
                    <li>
                        <Link 
                            className="button hover-border"
                            to={`/about`}
                        >about</Link>
                    </li>
                    <li>
                        <Link 
                            className="button hover-border"
                            to={`/projects/illustration`}
                        >illustration</Link>
                    </li>
                    <li>
                        <Link 
                            className="button hover-border"
                            to={`/projects/comics`}
                        >comics</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default NavBar;