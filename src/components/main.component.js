import React from 'react';
import { Route, Link } from 'react-router-dom'

import NavBar from './nav-bar.component'

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
                    <div class="header">
                        <h1>Michel Losier</h1>
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
                </div>
                <div className="main-footer layout-container">
                </div>
            </div>
        )
    }
}

export default Main;