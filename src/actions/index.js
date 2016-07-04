import axios from 'axios';

export const SELECT_FIELD = 'SELECT_FIELD';
export const SAVE_FIELD = 'SAVE_FIELD';
export const ADD_NEW_FIELD = 'ADD_NEW_FIELD';
export const FETCH_FIELDS = 'FETCH_FIELDS';
export const DELETE_FIELD = 'DELETE_FIELD';

const API_URL = '//localhost:8000/fields/fields';

/**
 * Any of the actions defined here with an axios request will go through the redux-promise middleware that is
 * initialized in the index.js file. This middleware detects any actions that have promises in their payloads. It then
 * "hijacks" the action, waits for the promise to be fulfilled and then lets the action go, replacing the pomise
 * with the response from the request.
 **/
export function fetchFields() {
    const request = axios.get(`${API_URL}`);
    return {
        type: FETCH_FIELDS,
        payload: request
    }
}

export function selectField(field) {
    return {
        type: SELECT_FIELD,
        payload: {data: field}  // Formatted this way to correspond to other actions
    };
}

export function saveField(field) {
    const request = axios.put(`${API_URL}/${field.id}/`, field);
    return {
        type: SAVE_FIELD,
        payload: request
    };
}

export function deleteField(field) {
    const request = axios.delete(`${API_URL}/${field.id}/`, field);
    return {
        type: DELETE_FIELD,
        payload: request
    }
}

export function addNewField() {
    const dummy_field = {
        name: '<New Field>',
        attribute: 'new_field',
        description: 'Change this description'
    };
    const request = axios.post(`${API_URL}/`, dummy_field);

    return {
        type: ADD_NEW_FIELD,
        payload: request
    }
}

