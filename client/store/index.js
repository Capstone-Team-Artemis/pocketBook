import { combineReducers, createStore, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import user from './user';
import events from './events';

const rootReducer = combineReducers({
  // ... the rest of your reducers
  events,
  user,
  form: formReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
