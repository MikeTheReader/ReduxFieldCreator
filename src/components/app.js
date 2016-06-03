import React from 'react';

import StateViewer from '../containers/state-viewer'
import FieldList from '../containers/field-list'
import FieldForm from '../containers/field-form'

export default function App() {
    return (
        <div className="container">
            <h2>Field Editor</h2>
            <div className="col-md-6">
                <div className="panel panel-primary">
                    <div className="panel-heading">Field List</div>
                    <div className="panel-body">
                        <FieldList />
                    </div>
                </div>
                <div className="panel panel-info">
                    <div className="panel-heading">Selected Field</div>
                    <div className="panel-body">
                        <FieldForm />
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="panel panel-info">
                    <div className="panel-heading">Application State</div>
                    <div className="panel-body">
                        <StateViewer />
                    </div>
                </div>
            </div>
        </div>
    );
}

