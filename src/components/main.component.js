import React from 'react';
import { Route, Link } from 'react-router-dom'

import NavBar from './nav-bar.component'
import ArtworkManage from './views/artwork-manage.component';

// import '../main.css';

class Main extends React.Component {
    constructor(){
        super();
        this.state = {}
    }

    feed(props){
        return(
            <div>
                <p>Content Feed Component Place Holder</p>
            </div>
        );
    }

    render(){
        return(
            <div>
                <div className="main-header layout-container">
                    <div className="header">
                        <Link to={`/`}>
                            <h1>Manage Portfolio</h1>
                        </Link>
                    </div>
                    <NavBar/>
                </div>
                <div className="main-body layout-container">
                    <Route
                        exact path="/"
                        render={(props) => this.feed(props)}
                    />
                    <Route
                        path="/artwork/"
                        component={ArtworkManage}
                    />
                </div>
                <div className="main-footer layout-container">
                </div>
            </div>
        )
    }
}

export default Main;