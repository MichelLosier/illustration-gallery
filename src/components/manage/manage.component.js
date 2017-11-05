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
            <div>
                <h2>Management</h2>
                <Route
                    exact path="/manage/"
                    render={null}
                />
                <ArtworkForm/>
            </div>
        )
    }
}

export default Manage;