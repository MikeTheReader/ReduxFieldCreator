import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectField, addNewField } from '../actions/index'


/**
 * FieldList is a component that shows the list of fields currently making up the form.
 **/
class FieldList extends Component {

    createNewField() {
        this.props.addNewField();
    }

    renderList() {
        return this.props.fields.map((field) => {
            var fieldName = field.name || '< New Field >';
            return (
                <li
                    key={field.id}
                    onClick={() => this.props.selectField(field)}
                    className="list-group-item">
                    { fieldName }
                </li>
            );
        });
    }

    render() {
        return (
            <div>
                <div>
                    <ul className="list-group">
                        {this.renderList()}
                    </ul>
                </div>
                <div>
                    {/*
                     I've put the empty onChange here to suppress a React error about
                     having a form field with a value but no onChange
                     */}
                    <input className="btn btn-primary"
                           value="Add Field"
                           onClick={this.createNewField.bind(this)}
                           onChange={() => {}}/>
                </div>
            </div>
        );
    }
}

/**
 * This function maps the fields from the application state to this.props.fields. That way
 * the container can use the state while rendering.
 */
function mapStateToProps(state) {
    return {
        fields: state.fields
    };
}

/**
 * This function maps action creators to this.props so that they can be used to initiate actions.
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectField, addNewField }, dispatch)
}

/**
 * The connect function is used to connect the component to the values within the state, both
 * straight state to props mapping as well as mapping action creators to props.
 */
export default connect(mapStateToProps, mapDispatchToProps)(FieldList)