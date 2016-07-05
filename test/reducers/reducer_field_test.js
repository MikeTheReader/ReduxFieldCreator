import reducer from '../../src/reducers/reducer_field';
import * as actions from '../../src/actions';
import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

/*
Since reducers are all pure functions, they are easily testable. Used the deepFreeze library that Dan Abramov uses
in his redux tutorial in order to ensure that the state object is not modified by the reducers.
 */

describe('Reducers', () => {
    describe('Field Reducer', () => {

        it('returns an empty array as default state', () => {
            let action = {type: 'unknown'};
            let newState = reducer(undefined, action);
            expect(newState).to.deep.equal([]);
        });

        it('returns the fields on FETCH_FIELDS', () => {
            let action = {
                type: actions.FETCH_FIELDS,
                payload: {
                    data: [{id: 'test123'}]
                }
            };
            let newState = reducer(undefined, action);
            expect(newState).to.deep.equal(action.payload.data);
        });

        it('returns a modified field when SAVE_FIELD is called and current state only includes that field', () => {
            let action = {
                type: actions.SAVE_FIELD,
                payload: {
                    data: {
                        id: 'test123',
                        name: 'after_test'
                    }
                }
            };
            let currentState = [
                {
                    id: 'test123',
                    name: 'before_test'
                }
            ];
            deepFreeze(currentState);
            let newState = reducer(currentState, action);
            expect(newState).to.deep.equal([action.payload.data]);
        });

        it('returns a modified field when SAVE_FIELD is called and current state includes multiple fields', () => {


            let objectOne = {
                id: 'testABC',
                name: 'field one'
            };

            let object_before_test = {
                id: 'test123',
                name: 'before_test'
            };

            let object_after_test = {
                id: 'test123',
                name: 'after_test'
            };

            let objectTwo = {
                id: 'testDEF',
                name: 'field two'
            };

            let action = {
                type: actions.SAVE_FIELD,
                payload: {
                    data: object_after_test
                }
            };

            let currentState = [objectOne, object_before_test, objectTwo];
            deepFreeze(currentState);
            let newState = reducer(currentState, action);
            expect(newState).to.deep.equal([objectOne, object_after_test, objectTwo]);
        });


        it('returns a single field when state is empty and ADD_FIELD is called', () => {
            let action = {
                type: actions.ADD_NEW_FIELD,
                payload: {
                    data: {id: 'test123'}
                }
            };
            let newState = reducer(undefined, action);
            expect(newState).to.deep.equal([action.payload.data]);
        });

        it('returns a new array including the new field when ADD_NEW_FIELD is called', () => {
            let action = {
                type: actions.ADD_NEW_FIELD,
                payload: {
                    data: {id: 'test123'}
                }
            };
            let currentState = [{id:'alreadyThere123'}];
            deepFreeze(currentState);  // Will throw an exception is the state object is modified
            let newState = reducer(currentState, action);
            expect(newState).to.deep.equal(currentState.concat(action.payload.data));
        });

        it('returns the current state if an unknown action is sent through', () => {
            let action = {
                type: 'foo',
                payload: 'bar'
            };
            let currentState = [{id: 'test123'}];
            deepFreeze(currentState);
            let newState = reducer(currentState, action);
            expect(newState).to.deep.equal(currentState);
        });
    });
});