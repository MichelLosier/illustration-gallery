import React from 'react';
import {Route, Link} from 'react-router-dom'

import ArtworkSelection from '../artwork-selection/artwork-selection.component';
import ArtworkForm from '../artwork-form/artwork-form.component';

import ManagementBar from '../management-bar/management-bar.component';

class ArtworkManage extends React.Component {
    constructor(){
        super();
        this.state = {}
    }

    render(){
        return(
            <div className="artwork-manage-container">
                <ManagementBar viewTitle="Artwork">
                    <Route
                        exact path="/artwork"
                        render={() => {
                            return(
                                <Link to={'/artwork/new'}>+ Add Artwork</Link>
                            )
                        }}
                    />
                    <Route
                        exact path="/artwork/:id"
                        render={() => {
                            return(
                                <Link to={'/artwork'}>Cancel</Link>
                            )
                        }}
                    />
                </ManagementBar>
                <div className="layout-container">
                    <Route
                        exact path="/artwork"
                        render={()=>{
                            return(
                                <ArtworkSelection/>
                            )
                        }}
                    />
                    <Route
                        path="/artwork/:id"
                        render={(props)=>{
                            return(
                                <ArtworkForm
                                    artworkId={props.match.params.artworkId}
                                />
                            )
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default ArtworkManage;