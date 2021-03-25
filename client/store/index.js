import { combineReducers, createStore, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import user from './user';
import events from  './events'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  // ... the rest of your reducers
  events,
  user,
  form: formReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
