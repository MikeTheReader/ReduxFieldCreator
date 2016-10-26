import React, { Component } from 'react';
import FieldLabel from './field-label'
import OptionField from './option-field'

export default class TextField extends Component {

    render() {
        let inputField = <input type='text'
                                readOnly={this.props.field.read_only}
                                defaultValue={this.props.field.default_value}
                                className="form-control"
                                placeholder={this.props.field.description}/>;
        if (this.props.field.options && this.props.field.options.length > 0) {
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

TextField.propTypes = {
    field: React.PropTypes.object
};

