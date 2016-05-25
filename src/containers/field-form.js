import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { changeFieldForm } from '../actions/index'


class FieldForm extends Component {

    inputHandler(name) {
        return (event) => {
            this.props.changeFieldForm(name, event.target.value);
        }
    }

    render() {
        if (!this.props.activeField) {
            return (
                <div>No field selected.</div>
            )
        }

        return (
            <div>
                <label>Field Name</label>
                <input value={this.props.activeField.name}
                       onChange={this.inputHandler('name')}
                       type="text"
                       className="form-control"
                       placeholder="Field Name" />
                <label>Machine Readable Name</label>
                <input value={this.props.activeField.attribute}
                       type="text"
                       className="form-control"
                       readOnly="true"
                       placeholder="Machine Readable Name" />
                <label>Description</label>
                <input value={this.props.activeField.description}
                       onChange={this.inputHandler('description')}
                       type="text"
                       className="form-control"
                       placeholder="Description" />
                <input className="btn btn-primary pull-right" type="Submit" value="Submit" onClick={this.props.saveForm} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        activeField: state.activeField
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ changeFieldForm: changeFieldForm }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldForm)