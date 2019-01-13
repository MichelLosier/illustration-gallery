import React from 'react';
import { Route, Link } from 'react-router-dom'

import HorizontalNavBar from '../horizontal-nav-bar/horizontal-nav-bar.component';
import ArtworkManage from '../artwork-manage/artwork-manage.component';
import ProjectManage from '../project-manage/project-manage.component';

// import '../main.css';

class Main extends React.Component {
    constructor(){
        super();
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
            <div className="main">
                <div className="header">
                    <div>
                        <Link to={`/`}>
                            <h1>Manage Portfolio</h1>
                        </Link>
                    </div>
                    <HorizontalNavBar
                            linkMap={this.linkMap}
                        />

                </div>
                <div className="body">
                    <Route
                        exact path="/"
                        render={(props) => this.feed(props)}
                    />
                    <Route
                        path="/artwork/:id?"
                        render={()=> {
                            return(<ArtworkManage/>)
                        }}
                    />
                    <Route
                        path="/projects/:id?"
                        render={()=> {
                            return(<ProjectManage/>)
                        }}
                    />
                </div>
                <div className="footer">
                </div>
            </div>
        )
    }
}

export default Main;