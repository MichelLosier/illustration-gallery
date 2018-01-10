import React from 'react';
import PropTypes from 'prop-types';
import Field from './field.component';

class CollectionField extends React.Component {
    constructor(props){
        super(props)

    }
    static propTypes = {
        collection: PropTypes.array,
        onChange: PropTypes.array,
        placeholder: PropTypes.string,
        name: PropTypes.string.isRequired,
        value: PropTypes.string,
        validate: PropTypes.func,
        onChange: PropTypes.func.isRequired,
        label: PropTypes.string
    }

    render(){
        return(
            <div>
                <Field
                    placeholder={this.props.placeholder}
                    name={this.props.name}
                    label={this.props.label}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    validate={false}
                />
                <div className="padded-group">
                    <input
                        type='button'
                        value='Add'
                        onClick={}
                    />
                </div>
            </div>
        )
    }
}