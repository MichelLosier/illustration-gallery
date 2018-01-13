import React from 'react';

import {Route, Link} from 'react-router-dom'
import ArtworkForm from '../forms/artwork-form.component';

class Manage extends React.Component {
    constructor(){
        super();
        this.state = {}
    }

    render(){
        return(
            <div className="width-12">
                <h2>Management</h2>
                <div className="layout-container">
                    <Route
                        exact path="/manage/"
                        component={ArtworkForm}
                    />
                </div>
            </div>
        )
    }
}

export default Manage;