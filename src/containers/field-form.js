import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';

import TagsInput from 'react-tagsinput';

import { saveField } from '../actions/index';
import _ from 'lodash'

export const FIELD_FORM_NAME = 'FieldForm';
const FORM_FIELDS = {
    id: {
        label: 'ID',
        type: 'hidden',
        defaultVisible: true
    },
    name: {
        label: 'Field Name',
        type: 'text',
        required: true,
        defaultVisible: true
    },
    attribute: {
        label: 'Machine Readable Name',
        type: 'text',
        required: true,
        defaultVisible: true
    },
    description: {
        label: 'Description',
        type: 'text',
        required: true,
        defaultVisible: true
    },
    type: {
        label: 'Type',
        type: 'select',
        options: {
            text: 'Text',
            number: 'Number',
            date: 'Date'
        },
        defaultVisible: true
    },
    options: {
        label: 'Valid Options',
        type: 'TagsInput',
        defaultVisible: true
    },
    allow_additional_options: {
        label: 'Allow user to add additional options',
        type: 'checkbox',
        defaultVisible: true
    },
    default_value: {
        label: 'Default Value',
        type: 'text',
        defaultVisible: true
    },
    read_only: {
        label: 'Read-Only (user cannot modify value)',
        type: 'checkbox',
        defaultVisible: true
    },
    low: {
        label: 'Low Value',
        type: 'text',
        defaultVisible: false
    },
    high: {
        label: 'High Value',
        type: 'text',
        defaultVisible: false
    }
};

class FieldForm extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        _.forOwn(FORM_FIELDS, (fieldProperties, fieldName) => {
            this.state[fieldName] = fieldProperties.defaultVisible;
        });
    }


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

    renderFormFields() {
        let fullJSX = []
        _.forOwn(FORM_FIELDS, (field, key) => {
            let reduxFormField = this.props.fields[key];
            if (!reduxFormField.turnedOff) {
                fullJSX.push(this.renderSingleField(key, field, reduxFormField));
            }
        });
        return fullJSX;
    }

    handleTagsChange(reduxField, tags, changed, changedIndexes) {
        reduxField.onChange(tags);
    }

    fieldChanged(event, reduxField) {
        reduxField.onChange(event)
    }

    renderSingleField(fieldName, fieldProperties, reduxField) {
        switch (fieldProperties.type) {
            case 'hidden':
                return <input key={reduxField.name} type={fieldProperties.type} {...reduxField} />
            case 'checkbox':
                return (
                    <div className="form-group" key={reduxField.name}>
                        <input type={fieldProperties.type} {...reduxField} />
                        <label>&nbsp;{fieldProperties.label}</label>
                    </div>
                );
            case 'select':
                return (
                    <div className="form-group" key={reduxField.name}>
                        <label>{fieldProperties.label}</label>
                        <select className="form-control" {...reduxField} onChange={(event) => this.fieldChanged(event, reduxField)}>
                            {this.renderOptions(fieldProperties)}
                        </select>
                    </div>
                );
            case 'TagsInput':
                return (
                    <div className="form-group" key={reduxField.name}>
                        <label>{fieldProperties.label}</label>
                        <TagsInput {...reduxField}
                            onChange={(tags, changed, changedIndexes) => this.handleTagsChange(reduxField, tags, changed, changedIndexes)}
                            onBlur={() => {}}
                        />
                    </div>
                );
            default:
                return (
                    <div className={'form-group' + this.additionalClasses(reduxField)} key={reduxField.name}>
                        <label>{fieldProperties.label}</label>
                        {this.fieldIsInError(reduxField) ? <div className="error-message">{reduxField.error}</div> : ''}
                        <input type={fieldProperties.type}
                               className={'form-control'}
                               placeholder={fieldProperties.label}
                            {...reduxField}/>
                    </div>
                );
        }
    }

    renderOptions(fieldProperties) {

        let fullJSX = [];
        _.forOwn(fieldProperties.options, (value, key) => {
            fullJSX.push(
                <option key={key} value={key}>{value}</option>
            )
        });
        return fullJSX;
    }

    render() {
        const {fields, handleSubmit} = this.props;

        if (fields.type.value === 'text') {
            fields.low.turnedOff = true;
            fields.high.turnedOff = true;
        } else {
            fields.low.turnedOff = false;
            fields.high.turnedOff = false;
        }

        if (!this.props.activeField) {
            return (
                <div>No field selected. Please select a field to edit...</div>
            );
        }

        return (
            <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
                {this.renderFormFields()}
                <div className="clearfix">
                    <button type="Submit" className="btn btn-primary pull-right">Save</button>
                </div>
            </form>
        )
    }
}


function validate(values) {
    const errors = {};


    _.forOwn(FORM_FIELDS, function(fieldProperties, fieldName) {
        if (fieldProperties.required && !values[fieldName]) {
            errors[fieldName] = `Please enter a ${fieldProperties.label}`;
        }
    });

    return errors;
}


export default reduxForm(
    {
        form: FIELD_FORM_NAME,
        fields: _.keys(FORM_FIELDS),
        validate
    },
    (state) => ({
        initialValues: state.activeField,
        activeField: state.activeField
    }),
    { saveField }
)(FieldForm);