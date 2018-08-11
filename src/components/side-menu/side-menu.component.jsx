import React from 'react';

class SideMenu extends React.Component {
    constructor(){
        super();
        this.state = {}
    }


    render(){
        const {children} = this.props;
        return(
            <div className="module border float-menu">
                Menu
                {children}
            </div>
        )
    }
}

export default SideMenu;