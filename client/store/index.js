import { combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import user from './user';

const rootReducer = combineReducers({
  // ... the rest of your reducers
  user,
  form: formReducer,
});
