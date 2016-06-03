var update = require('react-addons-update');

export default function(state = null, action) {
    switch (action.type) {
        case 'FIELD_SELECTED':
            return action.payload;
        case 'FORM_FIELD_CHANGED':
            return update(state, {$merge: fieldChangeHandler(action.payload)});
        case 'FIELD_SAVED':
            // List will handle the update, here we just want to remove it from the selected form
            return null;
        default:
            return state;
    }
}

function fieldChangeHandler(fieldChange) {
    var allFieldUpdates = update({}, {$merge: fieldChange});
    if (allFieldUpdates['name'] != null) {
        allFieldUpdates['attribute'] = calculateAttributeName(allFieldUpdates['name']);
    }
    return allFieldUpdates;
}

function calculateAttributeName(name) {
    var newName = name.toLowerCase();
    newName = newName.replace(/[^A-Z0-9]/ig, "_");
    return newName.substring(0, 20);
}