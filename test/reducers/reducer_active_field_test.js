import reducer from '../../src/reducers/reducer_active_field';
import * as actions from '../../src/actions';
import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

/*
Since reducers are all pure functions, they are easily testable. Used the deepFreeze library that Dan Abramov uses
in his redux tutorial in order to ensure that the state object is not modified by the reducers.
 */

describe('Reducers:Active Field Reducer', () => {

    it('returns null as default state', () => {
        let action = {type: 'unknown'};
        expect(reducer(undefined, action)).to.be.null;
    });

    it('returns the selected field when SELECT FIELD is called', () => {
        let selectedField = {id: 'test123'};
        let action = {
            type: actions.SELECT_FIELD,
            payload: {
                data: selectedField
            }
        };
        let currentState = {id: 'before_test'};
        deepFreeze(currentState);
        let newState = reducer(currentState, action);
        expect(newState).to.deep.equal(selectedField);
    });

    it('returns the new field when ADD_NEW_FIELD is called', () => {
        let selectedField = {id: 'test123'};
        let action = {
            type: actions.ADD_NEW_FIELD,
            payload: {
                data: selectedField
            }
        };
        let currentState = {id: 'before_test'};
        deepFreeze(currentState);
        let newState = reducer(currentState, action);
        expect(newState).to.deep.equal(selectedField);
    });

    it('return null when SAVE_FIELD is called (to deselect)', () => {
        let selectedField = {id: 'test123'};
        let action = {
            type: actions.SAVE_FIELD,
            payload: {
                data: selectedField
            }
        };
        let currentState = {id: 'before_test'};
        deepFreeze(currentState);
        let newState = reducer(currentState, action);
        expect(newState).to.be.null;
    })

    it('return null when DELETE_FIELD is called (to deselect)', () => {
        let selectedField = {id: 'test123'};
        let action = {
            type: actions.DELETE_FIELD,
            payload: {
                data: selectedField
            }
        };
        let currentState = {id: 'before_test'};
        deepFreeze(currentState);
        let newState = reducer(currentState, action);
        expect(newState).to.be.null;
    })
});