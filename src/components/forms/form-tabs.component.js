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
                    className={(this.props.selectedKey === key)? "selected" : null}
                    key={key}
                >
                    <a
                        onClick={() => {this.handleSelection(key)}}
                    >{tabs[key]}</a>
                </li>
            )
        })
    }

    classes = () => {
        let classes = "link-list-x tabs";
        if(this.props.sharesEdges){
            return `${classes} shared-edge`;
        }
        return classes;
        
    }

    render(){
        return(
            <div>
                <ul className={this.classes()}>
                    {this.tabItems(this.props.tabMap)}
                </ul>
            </div>
        )}
}

export default FormTabs;