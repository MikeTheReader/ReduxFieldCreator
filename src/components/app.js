import React from 'react';

import StateViewer from '../containers/state-viewer';
import FieldForm from '../containers/field-form';
import SampleForm from '../containers/sample-form';

export default function App() {
    return (
        <div className="container-fluid">
            <h2>Form Creator</h2>
            <div className="col-md-4">
                <div className="panel panel-success">
                    <div className="panel-heading">Sample Form</div>
                    <div className="panel-body">
                        <SampleForm />
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="panel panel-info">
                    <div className="panel-heading">Selected Field</div>
                    <div className="panel-body">
                        <FieldForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

