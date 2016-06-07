import { combineReducers } from 'redux';
import FieldReducer from './reducer_field';
import ActiveFieldReducer from './reducer_active_field';
import FieldFormReducer from './reducer_field_form';

const rootReducer = combineReducers({
    fields: FieldReducer,
    activeField: ActiveFieldReducer,
    form: FieldFormReducer
});

export default rootReducer;