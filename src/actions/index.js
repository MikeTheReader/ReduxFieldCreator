
export const SELECT_FIELD = 'SELECT_FIELD';
export const SAVE_FIELD = 'SAVE_FIELD';
export const ADD_NEW_FIELD = 'ADD_NEW_FIELD'


export function selectField(field) {
    return {
        type: SELECT_FIELD,
        payload: field
    };
}

export function saveField(field) {
    return {
        type: SAVE_FIELD,
        payload: field
    }
}

export function addNewField() {
    return {
        type: ADD_NEW_FIELD
    }
}

