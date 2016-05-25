import { combineReducers } from 'redux';
import FieldReducer from './reducer_field'
import ActiveFieldReducer from './reducer_active_field'

const rootReducer = combineReducers({
    fields: FieldReducer,
    activeField: ActiveFieldReducer
});

export default rootReducer;