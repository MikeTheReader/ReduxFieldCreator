import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectField, addNewField, fetchFields, deleteField } from '../actions/index'


/**
 * FieldList is a component that shows the list of fields currently making up the form.
 **/
class FieldList extends Component {

    componentWillMount() {
        this.props.fetchFields();
    }

    createNewField() {
        this.props.addNewField();
    }

    deleteField(field) {
        this.props.deleteField(field).then(() => {
            this.props.fetchFields();
        });
    }

    renderListItems() {

        if (this.props.fields.length === 0) {
            return (
                <div>
                    There are no fields in the form. Click on Add New Field to add one.
                </div>
            );
        }

        return this.props.fields.map((field) => {
            var fieldName = field.name || '< New Field >';
            return (
                <li key={field.id}
                    className="list-group-item clearfix">
                    { fieldName }
                    <div className="btn-group btn-group-sm pull-right">
                        <button className="btn btn-default glyphicon glyphicon-pencil"
                                onClick={() => this.props.selectField(field)}/>
                        <button className="btn btn-danger glyphicon glyphicon-remove"
                                onClick={() => this.deleteField(field)}/>
                    </div>
                </li>
            );
        });
    }

    renderList() {



        return (
            <div>
                <ul className="list-group">
                    {this.renderListItems()}
                </ul>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderList()}
                <div>
                    {/*
                     I've put the empty onChange here to suppress a React error about
                     having a form field with a value but no onChange
                     */}
                    <button className="btn btn-primary pull-right"
                            onClick={this.createNewField.bind(this)}>
                        Add New Field
                    </button>
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
    return bindActionCreators({selectField, addNewField, fetchFields, deleteField}, dispatch)
}

/**
 * The connect function is used to connect the component to the values within the state, both
 * straight state to props mapping as well as mapping action creators to props.
 */
export default connect(mapStateToProps, mapDispatchToProps)(FieldList)