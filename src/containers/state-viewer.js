import React, { Component } from 'react';
import { connect } from 'react-redux';

class StateViewer extends Component {
    render() {
        return (
            <div>
                <pre>
                    {this.props.state}
                </pre>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        state: JSON.stringify(state, null, 2)
    };
}

export default connect(mapStateToProps)(StateViewer);