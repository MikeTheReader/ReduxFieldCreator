import { SAVE_FIELD, ADD_NEW_FIELD, SELECT_FIELD } from '../actions/index';


export default function(state = null, action) {
    if (!state) {
        return defaultData;
    }

    switch(action.type) {
        case SAVE_FIELD:
            var matchingIndex = state.findIndex((field) => {
                return field.id == action.payload.id;
            });
            return state.slice(0, matchingIndex).concat(action.payload).concat(state.slice(matchingIndex + 1));
        case ADD_NEW_FIELD:
            var maxID = Math.max.apply(null, state.map((field) => { return field.id }));
            var newField = {id: maxID + 1};
            return state.slice().concat(newField);
        default:
            return state;
    }
}

const defaultData = [
        {
            id: 1,
            name: 'Field One',
            attribute: 'field_one',
            description: 'Description of Field One'

        },
        {
            id: 2,
            name: 'Field Two',
            attribute: 'field_two',
            description: 'Description of Field Two'
        },
        {
            id: 3,
            name: 'Field Three',
            attribute: 'field_three',
            description: 'Description of Field Three'
        },
        {
            id: 4,
            name: 'Field Four',
            attribute: 'field_four',
            description: 'Description of Field Four'
        }
    ]
;