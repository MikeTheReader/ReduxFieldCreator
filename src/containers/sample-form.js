import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class SampleForm extends Component {


    createOptionList(field) {
        return field.options.map((option) => {
           return <option key={option} value={option}>{option}</option>;
        });
    }

    renderSingleField(field) {
        let inputField = <input type={field.type} className="form-control" placeholder={field.description}/>;
        if (field.options && field.options.length > 0) {
            if (field.allowAdditionalOptions) {
                inputField = (
                    <select className="form-control">
                        {this.createOptionList(field)}
                    </select>
                );
            } else {
                inputField = (
                    <select className="form-control">
                        {this.createOptionList(field)}
                    </select>
                );
            }
        }
        return (
            <div className="form-group">
                <label>{field.name}</label>
                {inputField}
            </div>
        )
    }

    renderSingleFormField(formField) {
        let field = {};
        _.keys(formField).forEach((key, index) => {
            if (formField[key]) {
                field[key] = formField[key].value;
            }
        });
        return this.renderSingleField(field);
    }


    renderFields() {
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

