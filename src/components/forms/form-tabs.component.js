import React from 'react';
import PropTypes from 'prop-types';

class FormTabs extends React.Component {
    constructor(props){
        super();
    }

    static propTypes = {
        tabMap: PropTypes.object,
        selectedKey: PropTypes.string,
        onSelection: PropTypes.function
    }

    handleSelection = (key) => {
        this.props.onSelection(key);
    }

    tabItems = (tabs) => {
        return Object.keys(tabs).map((key) => {
            return(
                <li 
                    className={(this.props.selectedKey === key)? "active" : null}
                    key={key}
                >
                    <a
                        onClick={() => {this.handleSelection(key)}}
                    >{tabs[key]}</a>
                </li>
            )
        })
    }

    render(){
        return(
            <div>
                <ul className="link-list-x tabs">
                    {this.tabItems(this.props.tabMap)}
                </ul>
            </div>
        )}
}

export default FormTabs;