import React from 'react';
import PropTypes from 'prop-types';

import Field from './field.component';

class ArtworkForm extends React.Component {
    constructor(){
        super()
        this.state = {
            fields: {
                caption: '',
                altText: '',
                description: '',
                previewImage:'', //listing views
                normalImage:'', // gallery view
                largeImage:'', // in detail view
            },
            fieldErrors: {

            },
            collections: {
                tags:[],
                projects:[]
            },
            selectedArtwork: null
        }
    }
    
    handleFormSubmit = (evt) => {
        const people = this.state.people;
        const person = this.state.fields;
    
        evt.preventDefault();
    
        if (this.validate()) return;
    
        this.setState({
            people: people.concat(person),
            fields: {
                caption: '',
                altText: ''
            },
        });
    };
    
    handleInputChange = ({ name, value, error }) => {
        const fields = this.state.fields;
        const fieldErrors = this.state.fieldErrors;

        fields[name] = value;
        fieldErrors[name] = error;

        this.setState({ fields, fieldErrors });
    };
    
    validate = () => {
        const person = this.state.fields;
        const fieldErrors = this.state.fieldErrors;
        const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k]);

        if (!person.name) return true;
        if (!person.email) return true;
        if (errMessages.length) return true;

        return false;
    };
    
    render() {
        const fields = this.state.fields;
        return (
            <div className="item-grow-2">
                <h3>Create Artwork</h3>
                <form onSubmit={this.handleFormSubmit}>
                    <Field
                        placeholder='URL to Image'
                        name='normalImage'
                        label='Gallery Image'
                        value={fields.normalImage}
                        onChange={this.handleInputChange}
                        validate={false}
                    />
                    <Field
                        placeholder='URL to Image'
                        name='previewImage'
                        label='Preview Image'
                        value={fields.previewImage}
                        onChange={this.handleInputChange}
                        validate={false}
                    />
                    <Field
                        placeholder='URL to Image'
                        name='largeImage'
                        label='Hi-Res Detail Image'
                        value={fields.largeImage}
                        onChange={this.handleInputChange}
                        validate={false}
                    />
                    <Field
                        placeholder='Caption'
                        name='caption'
                        label='Caption'
                        value={fields.caption}
                        onChange={this.handleInputChange}
                        validate={false}
                    />
                    <Field
                        placeholder='alt-text description'
                        name='altText'
                        label='Alt-Text'
                        value={fields.altText}
                        onChange={this.handleInputChange}
                        validate={false}
                    />
                    <Field
                        placeholder='narrative about the artwork'
                        name='description'
                        label='Long Description'
                        value={fields.description}
                        onChange={this.handleInputChange}
                        validate={false}                   
                    />

                    <input type='submit' disabled={this.validate()} />
                </form>
            </div>
        )
    }
}

export default ArtworkForm;