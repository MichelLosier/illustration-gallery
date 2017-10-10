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
                        >About</Link>
                    </li>
                    <li>

                    </li>
                    <li>

                    </li>
                </ul>
            </div>
        )
    }
}

export default NavBar;