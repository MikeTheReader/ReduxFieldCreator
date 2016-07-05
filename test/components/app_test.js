import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme'
import App from '../../src/components/app'
import FieldList from '../../src/containers/field-list'
import FieldForm from '../../src/containers/field-form'
import SampleForm from '../../src/containers/sample-form'
import StateViewer from '../../src/containers/state-viewer'

/*
 Simple test to just test that the app component properly renders its child components. The shallow copy means
 we can only interrogate the high level components, not dig futher into them. Those should be tested in their
 own test cases anyway, so that works out well.
 */

function setup() {
    const props = {};
    const enzymeWrapper = shallow(<App/>);
    return { props, enzymeWrapper };
}

describe('Components', () => {
    describe('App', () => {
        it('should render self and subcomponents', () => {
            const { enzymeWrapper } = setup();
            expect(enzymeWrapper.find('div.container-fluid')).to.have.length(1);
            expect(enzymeWrapper.find(FieldList)).to.have.length(1);
            expect(enzymeWrapper.find(FieldForm)).to.have.length(1);
            expect(enzymeWrapper.find(SampleForm)).to.have.length(1);
            expect(enzymeWrapper.find(StateViewer)).to.have.length(1);
        })
    })
});