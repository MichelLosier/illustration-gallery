import React from 'react';
import { Route, Link } from 'react-router-dom'

import VerticalNavBar from './vertical-nav-bar/vertical-nav-bar.component';
import ArtworkManage from './artwork-manage/artwork-manage.component';
import ProjectManage from './project-manage/project-manage.component';

// import '../main.css';

class Main extends React.Component {
    constructor(){
        super();
        this.state = {
            context: ''
        }
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

    setContext = (context) => {
        this.setState({context: context});
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
                <div className="main-header">
                    <div>
                        <Link to={`/`}>
                            <h1>Manage Portfolio</h1>
                        </Link>
                    </div>
                    <div>
                        <h2>{this.state.context}</h2>
                    </div>
                </div>
                <div className="main-body layout-container">

                    <div className="col-1 border-right">
                        <VerticalNavBar
                            linkMap={this.linkMap}
                        />
                    </div>
                    <div className="col-3">
                        <Route
                            exact path="/"
                            render={(props) => this.feed(props)}
                        />
                        <Route
                            path="/artwork/"
                            render={()=> {
                                return(<ArtworkManage
                                    getContext={this.setContext}
                                />)
                            }}
                        />
                        <Route
                            path="/projects/"
                            render={()=> {
                                return(<ProjectManage
                                    getContext={this.setContext}
                                />)
                            }}
                        />
                    </div>
                </div>
                <div className="main-footer layout-container">
                </div>
            </div>
        )
    }
}

export default Main;