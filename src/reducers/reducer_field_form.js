import { reducer as formReducer } from 'redux-form';

export default formReducer.normalize({
    // Important that this name (FieldForm) matches the name in the actual container
    FieldForm: {
        attribute: normalizeAttribute,
        type: value => value ? value : 'text',
        options: normalizeTags
    }
});

function normalizeAttribute(value, previousValue, allValues, previousAllValues) {
    return allValues.name ? calculateAttribute(allValues.name) : '';
}

function calculateAttribute(name) {
    var newName = name.toLowerCase();
    newName = newName.replace(/[^A-Z0-9]/ig, "_");
    return newName.substring(0, 20);
}

function normalizeTags(value, previousValue, allValues, previousAllValues) {
    return value ? value : [];
}