import { SAVE_FIELD, ADD_NEW_FIELD, FETCH_FIELDS } from '../actions/index';


export default function(state = [], action) {
    switch(action.type) {
        case FETCH_FIELDS:
            return action.payload.data;
        case SAVE_FIELD:
            var matchingIndex = state.findIndex((field) => {
                return field.id == action.payload.data.id;
            });
            if (matchingIndex === -1) {
                matchingIndex = state.length;
            }
            return state.slice(0, matchingIndex).concat(action.payload.data).concat(state.slice(matchingIndex + 1));
        case ADD_NEW_FIELD:
            return [...state, action.payload.data];
        default:
            return state;
    }
}