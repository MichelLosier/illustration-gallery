import React from 'react';
import PropTypes from 'prop-types';
import Field from './field.component';


class TagManage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            field: ''
        }
    }
    static propTypes = {
        placeholder: PropTypes.string,
        name: PropTypes.string.isRequired,
        validate: PropTypes.func,
        onChange: PropTypes.func.isRequired,
        label: PropTypes.string,
    }

    handleCollectionChange = (action) => {
        return (evt) => {
            this.props.onChange({
                name: this.props.name,
                value: (action == 'CREATE')? this.state.field : evt.target.dataset.value,
                action: action
            });
            if (action == 'CREATE'){
                this.setState({
                    field: ''
                })
            }
        }  
    }

    onFieldChange = ({name, value, error}) => {
        this.setState({
            field: value
        })
    }

    collectionList = () => {
        const items = this.props.collection.map((item) => {
            return(
                <li 
                    key={item}
                    className="tags"
                >
                    <div>
                        {item}
                    </div>
                    <div
                        onClick={this.handleCollectionChange('DELETE')}
                        data-value={item}
                        className="delete"
                    >
                        x
                    </div>
                </li>
            )
        })
        return(
            <ul className="flex-list-x tags">
                {items}
            </ul>
        )
    }
    render(){
        return(
            <div>
                <Field
                    placeholder={this.props.placeholder}
                    name={this.props.name}
                    label={this.props.label}
                    value={this.state.field}
                    onChange={this.onFieldChange}
                    validate={false}
                >
                    <input
                        type='button'
                        value='Add'
                        onClick={this.handleCollectionChange('CREATE')}
                    />
                </Field>

                <div className="padded-group">
                    {this.collectionList()}
                </div>
            </div>
        )
    }
}

export default TagManage