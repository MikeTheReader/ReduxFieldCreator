import {SELECT_FIELD, SAVE_FIELD, ADD_NEW_FIELD} from '../actions/index';

var update = require('react-addons-update');

export default function(state = null, action) {
    switch (action.type) {
        case SELECT_FIELD:
            return action.payload;
        case SAVE_FIELD:
            // List will handle the update, here we just want to remove it from the selected form
            return null;
        default:
            return state;
    }
}
