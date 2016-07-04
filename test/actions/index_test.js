import expect from 'expect'
import axios from 'axios'
import * as actions from '../../src/actions/index'

/*
 Not real happy with these tests at this point because they have to know a bunch about the inner workings of the
 code in order to work. Not to mention it feels too one-to-one.
 */

describe('Actions', () => {
    it('should create an action to select field', () => {
        const field = {id: 'test123'};
        const expectedAction = {
            type: actions.SELECT_FIELD,
            payload: {data: field}
        };
        expect(actions.selectField(field)).toEqual(expectedAction);
    });
    it('should create an action to fetch fields', () => {
        const request = axios.get(`${actions.API_URL}`);
        const expectedAction = {
            type: actions.FETCH_FIELDS,
            payload: request
        };
        expect(actions.fetchFields()).toEqual(expectedAction);
    });
    it('should create an action to save field', () => {
        const field = {id: 'test123'};
        const request = axios.put(`${actions.API_URL}/${field.id}/`, field);
        const expectedAction = {
            type: actions.SAVE_FIELD,
            payload: request
        };
        expect(actions.saveField(field)).toEqual(expectedAction);
    });
    it('should create an action to delete field', () => {
        const field = {id: 'test123'};
        const request = axios.delete(`${actions.API_URL}/${field.id}/`, field);
        const expectedAction = {
            type: actions.DELETE_FIELD,
            payload: request
        };
        expect(actions.deleteField(field)).toEqual(expectedAction);
    });
    it('should create an action to add a new field', () => {
        const field = {
            name: '<New Field>',
            attribute: 'new_field',
            description: 'Change this description'
        };
        const request = axios.post(`${actions.API_URL}/`, field);
        const expectedAction = {
            type: actions.ADD_NEW_FIELD,
            payload: request
        };
        expect(actions.addNewField()).toEqual(expectedAction);
    });
});
