import React from 'react';
import PropTypes from 'prop-types';

import { Route, Link } from 'react-router-dom';

class VerticalNavBar extends React.Component {
    constructor(){
        super();
        this.state = {
            selectedLink: null
        }
    }

    static propTypes = {
        linkMap: PropTypes.object
    }

    handleClick = (key) => {
        this.setState({
            selectedLink: key
        });
    }

    linkList = () => {
        const {linkMap} = this.props;
        const links = Object.keys(linkMap).map((link) =>{
            return(
                <li
                    className={(link == this.state.selectedLink) ? 'active' : ''}
                >
                    <Link 
                        key={link}
                        className="button hover-border"
                        to={linkMap[link].path}
                        onClick={()=>{this.handleClick(link)}}
                    >{linkMap[link].label}</Link>
                </li>
            )
        })

        return(
            <ul>
                {links}
            </ul>
        )
    }

    render(){
        return(
            <div className="vertical-nav-bar">
                {this.linkList()}
            </div>
        )
    }
}

export default VerticalNavBar;