import React, { Component } from 'react';
import FieldLabel from './field-label'
import OptionField from './option-field'

export default class NumberField extends Component {

    render() {
        let inputField = <input type='number'
                                readOnly={this.props.field.read_only}
                                defaultValue={this.props.field.default_value}
                                className="form-control"
                                placeholder={this.props.field.description}
                                min={this.props.field.low}
                                max={this.props.field.high}
                                />;
        if (this.props.field.options && this.props.field.options.length > 0) {
            this.props.field.options = this.props.field.options.sort(function(a, b) {
                return parseInt(a) - parseInt(b);
            });
            inputField = <OptionField field={this.props.field}/>
        }
        return (
            <div>
                <div>
                    <FieldLabel label={this.props.field.label}/>
                </div>
                {inputField}
            </div>
        );
    }
}

NumberField.propTypes = {
    field: React.PropTypes.object
};

