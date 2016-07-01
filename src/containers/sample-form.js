import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { selectField, addNewField, fetchFields, deleteField } from '../actions/index'

export default class SampleForm extends Component {

    componentWillMount() {
        this.props.fetchFields();
    }

    deleteField(field) {
        this.props.deleteField(field).then(() => {
            this.props.fetchFields();
        });
    }

    createOptionList(field) {
        return field.options.map((option) => {
            return <option key={option} selected={option == field.default_value}>{option}</option>;
        });
    }

    renderSingleFormField(formField) {
        let field = {};
        _.keys(formField).forEach((key) => {
            if (formField[key]) {
                field[key] = formField[key].value;
            }
        });
        return this.renderSingleField(field);
    }

    renderSingleField(field) {

        let addlProps = {};
        if (field.low) {
            addlProps.min = field.low;
        }
        if (field.high) {
            addlProps.max = field.high;
        }

        let inputField = <input type={field.type}
                                readOnly={field.read_only}
                                defaultValue={field.default_value}
                                className="form-control"
                                placeholder={field.description}
                                {...addlProps}/>;

        if (field.options && field.options.length > 0) {
            if (field.allowAdditionalOptions) {
                inputField = (
                    <select className="form-control" readOnly={field.read_only} disabled={field.read_only}>
                        {this.createOptionList(field)}
                    </select>
                );
            } else {
                inputField = (
                    <select className="form-control" readOnly={field.read_only} disabled={field.read_only}>
                        {this.createOptionList(field)}
                    </select>
                );
            }
        }
        let classes = 'field-container';
        if (this.props.activeField && this.props.activeField.id === field.id) {
            classes += ' selected';
        }
        return (

            <div className={classes} onClick={() => this.props.selectField(field)}>
                <button className="btn btn-xs btn-danger pull-right"
                        onClick={() => this.deleteField(field)}>Delete</button>
                <div className="form-group" key={`input-${field.name}`}>
                    <label>{field.name}</label>
                    {inputField}
                </div>
            </div>
        )
    }

    renderFields() {
        // Before any fields are added (or before their are retrieved from the API, fields will be an empty array
        // Show an information message in that case
        if (this.props.fields.length == 0) {
            return (<div>No fields defined.</div>);
        }

        let fieldMap = {}
        this.props.fields.forEach((field) => {
            fieldMap[field.id] = this.renderSingleField(field);
        });

        if (this.props.activeField && this.props.form) {
            let formField = this.props.form.FieldForm;
            fieldMap[this.props.activeField.id] = this.renderSingleFormField(formField);
        }

        return _.values(fieldMap);
    }

    render() {
        return (
            <div>
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

