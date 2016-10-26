import React, { Component } from 'react';

export default class FieldLabel extends Component {
    render() {
        return (
            <label>{this.props.label}</label>
        );
    }
}
