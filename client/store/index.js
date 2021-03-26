import { combineReducers, createStore, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import user from './user';
import events from './events';
import event from './event';
import userProfile from './userProfile';

const rootReducer = combineReducers({
  // ... the rest of your reducers
  event,
  events,
  userProfile,
  user,
  form: formReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
