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
    label: {
        label: 'Field label',
        type: 'text',
        required: true,
        defaultVisible: true
    },
    name: {
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
    instructions: {
        label: 'Instructions',
        type: 'text',
        required: true,
        defaultVisible: true
    },
    required: {
        label: 'Required',
        type: 'checkbox',
        defaultVisible: true
    },
    type: {
        label: 'Type',
        type: 'select',
        options: {
            text: 'Text',
            number: 'Number',
            date: 'Date',
            boolean: 'Boolean'
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
    min: {
        label: 'Minimum Value',
        type: 'text',
        defaultVisible: false
    },
    max: {
        label: 'Maximum Value',
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
        let fullJSX = [];
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
                let type = fieldProperties.type;

                if (reduxField.name === 'max' || reduxField.name === 'min' || reduxField.name === 'default_value') {
                    type = this.props.fields['type'].value;
                }
                if (this.props.fields['type'].value === 'boolean' && reduxField.name === 'default_value') {
                    type = 'checkbox';
                }
                return (
                    <div className={'form-group' + this.additionalClasses(reduxField)} key={reduxField.name}>
                        <label>{fieldProperties.label}</label>
                        {this.fieldIsInError(reduxField) ? <div className="error-message">{reduxField.error}</div> : ''}
                        <input type={type}
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

        fields.options.turnedOff = false;
        fields.allow_additional_options.turnedOff = false;
        fields.min.turnedOff = false;
        fields.max.turnedOff = false;

        if (fields.type.value === 'text' || fields.type.value === 'boolean') {
            fields.min.turnedOff = true;
            fields.max.turnedOff = true;
        }

        if (fields.type.value === 'boolean') {
            fields.options.turnedOff = true;
            fields.allow_additional_options.turnedOff = true;
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