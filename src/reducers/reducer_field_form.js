import { reducer as formReducer } from 'redux-form';

export default formReducer.normalize({
    // Important that this name (FieldForm) matches the name in the actual container
    FieldForm: {
        name: normalizeAttribute,
        type: (value) => value ? value : 'text',
        options: normalizeTags
    }
});

function normalizeAttribute(value, previousValue, allValues, previousAllValues) {
    return allValues.label ? calculateAttribute(allValues.label) : '';
}

function calculateAttribute(label) {
    var newName = label.toLowerCase();
    newName = newName.replace(/[^A-Z0-9]/ig, '_');
    return newName.substring(0, 20);
}

function normalizeTags(value, previousValue, allValues, previousAllValues) {
    return value ? value : [];
}