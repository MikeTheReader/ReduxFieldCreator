import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { changeFieldForm } from '../actions/index'
import { saveField } from '../actions/index'


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
                <div className="form-group">
                    <label>Field Name</label>
                    <input value={this.props.activeField.name}
                           onChange={this.inputHandler('name')}
                           type="text"
                           className="form-control"
                           placeholder="Field Name" />
                </div>
                <div className="form-group">
                    <label>Machine Readable Name</label>
                    <input value={this.props.activeField.attribute}
                           type="text"
                           className="form-control"
                           readOnly="true"
                           placeholder="Machine Readable Name" />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input value={this.props.activeField.description}
                           onChange={this.inputHandler('description')}
                           type="text"
                           className="form-control"
                           placeholder="Description" />
                </div>
                <div className="form-group">
                    <label>Type</label>
                    <select value={this.props.activeField.type}
                            className="form-control"
                            onChange={this.inputHandler('type')}>
                        <option>Text</option>
                        <option>Number</option>
                        <option>Date</option>
                    </select>
                </div>
                <div>
                    <input className="btn btn-primary" value="Submit" onClick={() => {this.props.saveField(this.props.activeField)}} />
                </div>
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
    return bindActionCreators({ changeFieldForm, saveField }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldForm)