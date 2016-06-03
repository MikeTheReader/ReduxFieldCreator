
export function selectField(field) {
    return {
        type: 'FIELD_SELECTED',
        payload: field
    };
}

export function changeFieldForm(fieldName, fieldValue) {
    var payload = {};
    payload[fieldName] = fieldValue;
    return {
        type: 'FORM_FIELD_CHANGED',
        payload: payload
    }
}

export function saveField(field) {
    return {
        type: 'FIELD_SAVED',
        payload: field
    }
}

export function addNewField() {
    return {
        type: 'ADD_NEW_FIELD'
    }
}

