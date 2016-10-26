import React, { Component } from 'react';
import Toggle from 'react-toggle'
import FieldLabel from './field-label'

require('../../node_modules/react-toggle/style.css');

export default class BooleanField extends Component {

    render() {
        let checked = false;
        if (this.props.field) {
            checked = this.props.field.default_value;
            if (typeof this.props.field.default_value === 'string') {
                checked = (this.props.field.default_value.toLowerCase() == 'true')
            }
        }
        return (
            <div>
                <div>
                    <FieldLabel label={this.props.field.label}/>
                </div>
                <Toggle defaultChecked={checked}/>
            </div>
        );
    }
}

BooleanField.propTypes = {
    field: React.PropTypes.object
};

