import React from 'react';
import PropTypes from 'prop-types'

//TODO
//Optional textarea element depending on prop
//Styling controlled by form-group class 
//.form-group textarea

class TextField extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            value: this.props.value,
            error: false,
        };
    }
    static propTypes = {
        placeholder: PropTypes.string,
        name: PropTypes.string.isRequired,
        value: PropTypes.string,
        validate: PropTypes.func,
        onChange: PropTypes.func.isRequired,
        label: PropTypes.string
      };

    componentWillReceiveProps(update) {
        this.setState({ value: update.value });
    }

    onChange = (evt) => {
        const name = this.props.name;
        const value = evt.target.value;
        const error = this.props.validate ? this.props.validate(value) : false;

        this.setState({ value, error });

        this.props.onChange({ name, value, error });
    };

    render() {
        return (
            <div className="text-field-group">
                <label for={this.props.name}>
                    {this.props.label}
                </label>
                <input
                    placeholder={this.props.placeholder}
                    value={this.state.value}
                    onChange={this.onChange}
                />
                {this.props.children}
                 <span style={{ color: 'red' }}>{ this.state.error }</span>
            </div>
        );
    }
}

export default TextField;