import React from 'react';
import PropTypes from 'prop-types';

class ManagementBar extends React.Component {
    constructor(){
        super();
    }

    static propTypes = {
        viewTitle: PropTypes.string
    }

    render(){
        const {viewTitle} = this.props
        return(
            <div className="management-bar">
                <div className="viewTitle">
                    <h2>{viewTitle}</h2>
                </div>
                <div className="searchBar">
                </div>
                <div className="actions">
                </div>
            </div>
        )
    }
}

export default ManagementBar;