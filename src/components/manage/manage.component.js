import React from 'react';

import {Route, Link} from 'react-router-dom'

class Manage extends React.Component {
    constructor(){
        super();
        this.state = {}
    }

    render(){
        return(
            <div>
                <h2>Management</h2>
                <Route
                    exact path="/manage/"
                    render={null}
                />
            </div>
        )
    }
}

export default Manage;