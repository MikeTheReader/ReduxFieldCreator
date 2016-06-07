import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';

import TagsInput from 'react-tagsinput';

import { saveField } from '../actions/index';

export const FIELD_FORM_NAME = 'FieldForm';
const formFields = ['id', 'name', 'attribute', 'description', 'type', 'low', 'high', 'tags', 'defaultValue', 'allowAdditionalOptions'];

class FieldForm extends Component {

    onSubmit(props) {
        this.props.saveField(props);
    }

    fieldIsInError(field) {
        return field.touched && field.error;
    }

    additionalClasses(field) {
        if (this.fieldIsInError(field)) {
            return ' has-error';
        }
        return '';
    }

    render() {
        const {
            fields: {
                name,
                attribute,
                description,
                type,
                low,
                high,
                tags,
                defaultValue,
                allowAdditionalOptions
            },
            handleSubmit
        } = this.props;

        if (!this.props.activeField) {
            return (
                <div>No field selected. Please select a field to edit...</div>
            );
        }

        return (
            <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
                <div className={"form-group" + this.additionalClasses(name)}>
                    <label>Field Name</label>
                    {this.fieldIsInError(name) ? <div className="error-message">{name.error}</div> : ''}
                    <input type="text"
                           className={"form-control"}
                           placeholder="Field Name"
                           {...name} />
                </div>
                <div className="form-group">
                    <label>Machine Readable Name</label>
                    <input type="text"
                           className="form-control"
                           readOnly="true"
                           placeholder="Machine Readable Name"
                        {...attribute} />
                </div>
                <div className={"form-group" + this.additionalClasses(description)}>
                    <label>Description</label>
                    {description.touched && description.error && <div className="error-message">{description.error}</div>}
                    <input type="text"
                           className="form-control"
                           placeholder="Description"
                        {...description} />

                </div>
                <div className="form-group">
                    <label>Type</label>
                    <select className="form-control" {...type}>
                        <option>Text</option>
                        <option>Number</option>
                        <option>Date</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Valid options</label>
                    <TagsInput {...tags}/>
                </div>
                <div className="form-group">
                    <input type="checkbox" className="formControl" {...allowAdditionalOptions} />
                    <label>&nbsp;Allow user to create additional options</label>
                </div>
                <div className="form-group">
                    <label>Default Value</label>
                    <input type="text"
                           className="form-control"
                           placeholder="Default Value"
                        {...defaultValue} />
                </div>
                <div className="form-group clearfix">
                    <label>Range</label>
                    <div>
                        <div className="col-md-6">
                            <label>Low</label>
                            <input type="text"
                                   className="form-control"
                                   placeholder="Low Value"
                                   {...low}/>
                        </div>
                        <div className="col-md-6">
                            <label>High</label>
                            <input type="text"
                                   className="form-control"
                                   placeholder="High Value"
                                {...high} />
                        </div>
                    </div>
                </div>
                <div className="clearfix">
                    <button type="Submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        )
    }
}


function validate(values) {
    const errors = {};
    if (!values.name) {
        errors.name = 'Please enter a name for the field';
    }

    if (!values.description) {
        errors.description = 'Please enter a description for the field';
    }

    return errors;
}


export default reduxForm({
    form: FIELD_FORM_NAME,
    fields: formFields,
    validate
},
state => ({
    initialValues: state.activeField,
    activeField: state.activeField
}),
{ saveField: saveField })(FieldForm);