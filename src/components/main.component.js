import React from 'react';
import { Route, Link } from 'react-router-dom'

import NavBar from './nav-bar.component'
import ArtworkManage from './views/artwork-manage.component';
import ProjectManage from './views/project-manage.component';

// import '../main.css';

class Main extends React.Component {
    constructor(){
        super();
        this.state = {}
        this.linkMap = {
            artwork: {
                label:'Artwork',
                path:'/artwork'
            },
            projects: {
                label:'Projects',
                path: '/projects'
            },
            config: {
                label:'Configuration',
                path:'/config'
            }
        }
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
                    <NavBar
                        linkMap={this.linkMap}
                    />
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
                    <Route
                        path="/projects/"
                        component={ProjectManage}
                    />
                </div>
                <div className="main-footer layout-container">
                </div>
            </div>
        )
    }
}

export default Main;