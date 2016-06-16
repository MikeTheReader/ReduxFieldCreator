import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class SampleForm extends Component {

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
        let inputField = <input type={field.type} readOnly={field.read_only} defaultValue={field.default_value} className="form-control" placeholder={field.description}/>;
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
        return (
            <div className="form-group" key={`input-${field.name}`}>
                <label>{field.name}</label>
                {inputField}
            </div>
        )
    }

    renderFields() {
        if (this.props.fields.length == 0) {
            return (<div>No fields defined.</div>)
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
export default connect(mapStateToProps, null)(SampleForm)

