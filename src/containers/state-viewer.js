import React, { Component } from 'react';
import { connect } from 'react-redux';

class StateViewer extends Component {
    render() {
        return (
            <pre>
                {this.props.state}
            </pre>
        );
    }
}

function mapStateToProps(state) {
    return {
        state: JSON.stringify(state, null, 2)
    };
}

export default connect(mapStateToProps)(StateViewer);