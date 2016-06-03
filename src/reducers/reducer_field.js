
export default function(state = null, action) {
    if (!state) {
        return defaultData;
    }

    switch(action.type) {
        case 'FIELD_SAVED':
            var matchingIndex = state.findIndex((field) => {
                return field.id == action.payload.id;
            });
            return state.slice(0, matchingIndex).concat(action.payload).concat(state.slice(matchingIndex + 1));
        case 'ADD_NEW_FIELD':
            var idList = state.map((field) => { return field.id});
            var maxID = Math.max.apply(null, idList);
            return state.slice().concat({id: maxID + 1});
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