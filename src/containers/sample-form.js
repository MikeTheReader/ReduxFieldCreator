import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { selectField, addNewField, fetchFields, deleteField } from '../actions/index'
import BooleanField from '../components/boolean-field'
import NumberField from '../components/number-field'
import TextField from '../components/text-field'
import DateField from '../components/date-field'

export class SampleForm extends Component {

    componentWillMount() {
        this.props.fetchFields();
    }

    deleteField(field) {
        this.props.deleteField(field).then(() => {
            this.props.fetchFields();
        });
    }

    renderSingleFormField(formField, index) {
        let field = {};
        _.keys(formField).forEach((key) => {
            if (formField[key]) {
                field[key] = formField[key].value;
            }
        });
        return this.renderSingleField(field, index);
    }

    renderSingleField(field, index) {
        let typeMap = {
            boolean: BooleanField,
            text: TextField,
            number: NumberField,
            date: DateField
        };

        let FieldObject = typeMap[field.type];
        let inputField = <FieldObject field={field} />
        let classes = 'field-container';
        if (this.props.activeField && this.props.activeField.id === field.id) {
            classes += ' selected';
        }
        return (

            <div className={classes} onClick={() => this.props.selectField(field)} key={index}>
                <button className="btn btn-xs btn-danger pull-right"
                        onClick={() => this.deleteField(field)}>Delete</button>
                <div className="form-group" key={`input-${field.label}`}>
                    {inputField}
                </div>
            </div>
        )
    }

    renderFields() {
        // Before any fields are added (or before their are retrieved from the API, fields will be an empty array
        // Show an information message in that case
        if (!this.props.fields || this.props.fields.length == 0) {
            return (<div>No fields defined.</div>);
        }

        let fieldMap = {};
        this.props.fields.forEach((field, index) => {
            fieldMap[field.id] = this.renderSingleField(field, index);
        });

        if (this.props.activeField && this.props.form) {
            let formField = this.props.form.FieldForm;
            fieldMap[this.props.activeField.id] = this.renderSingleFormField(formField, this.props.fields.length + 1);
        }

        return _.values(fieldMap);
    }

    render() {
        return (
            <div>
                <div>Click on a field below to modify it, or click Add New Field to add a new one.</div>
                {this.renderFields()}
                <button className="btn btn-primary pull-right add-new-field-button"
                        onClick={() => this.props.addNewField()}>
                    Add New Field
                </button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        fields: state.fields,
        activeField: state.activeField,
        form: state.form
    };
}

/**
 * This function maps action creators to this.props so that they can be used to initiate actions.
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators({selectField, addNewField, fetchFields, deleteField}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SampleForm)

