import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectField } from '../actions/index'

class FieldList extends Component {

    renderList() {
        return this.props.fields.map((field) => {
            return (
                <li
                    key={field.id}
                    onClick={() => this.props.selectField(field)}
                    className="list-group-item">
                    {field.name}
                </li>
            );
        });
    }

    render() {
        return (
            <div>
                <ul className="list-group">
                    {this.renderList()}
                </ul>
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
    return bindActionCreators({ selectField: selectField }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldList)