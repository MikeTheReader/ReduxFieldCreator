import React, { Component } from 'react';
import FieldLabel from './field-label'


export default class OptionField extends Component {

    createOptionList(field) {
        return field.options.map((option) => {
            return <option key={option} selected={option == field.default_value}>{option}</option>;
        });
    }

    createButtonList(field) {
        return field.options.map((option, index) => {
            let classes = 'btn btn-default';
            if (option == field.default_value) {
                classes += ' active';
            }

            return <button type="button" className={classes} key={index}>{option}</button>;
        });
    }

    render() {

        let inputField = null;
        if (this.props.field.options.length > 3) {
            inputField = (
                <select className="form-control"
                        readOnly={this.props.field.read_only}
                        disabled={this.props.field.read_only}>
                    {this.createOptionList(this.props.field)}
                </select>
            );
        } else {
            inputField = (
                <div>
                    <div className="btn-group" onClick={
                        function(reactEvent, something, event) {
                            let btnGroup = reactEvent.target.parentNode;
                            btnGroup.childNodes.forEach(function(child) {
                                child.classList.remove('active');
                            });
                            reactEvent.target.classList.add('active');
                        }
                    }>
                        {this.createButtonList(this.props.field)}
                    </div>
                </div>
            );
        }

        return (
            <div>
                {inputField}
            </div>
        );
    }
}

OptionField.propTypes = {
    field: React.PropTypes.object
};

