import React from 'react';
import { Route, Link } from 'react-router-dom'

import NavBar from './nav-bar.component'
import Manage from './manage/manage.component';

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
                            <h1>Michel Losier</h1>
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
                        path="/about"
                        render={null}
                    />
                    <Route
                        path="/projects/:category"
                        render={null}
                    />
                    <Route
                        path="/projects/detail/:id"
                        render={null}
                    />
                    <Route
                        path="/manage"
                        component={Manage}
                    />
                </div>
                <div className="main-footer layout-container">
                </div>
            </div>
        )
    }
}

export default Main;