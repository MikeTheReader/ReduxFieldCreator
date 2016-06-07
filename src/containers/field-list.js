import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectField, addNewField } from '../actions/index'

class FieldList extends Component {

    createNewField() {
        console.log(this.props.addNewField());
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
                    <input className="btn btn-primary" value="Add Field" onClick={this.createNewField.bind(this)}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        fields: state.fields
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectField, addNewField }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldList)