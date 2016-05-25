
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

