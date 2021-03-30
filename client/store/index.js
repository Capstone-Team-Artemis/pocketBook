import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import user from './user';
import events from './events';
import event from './event';
import userProfile from './userProfile';
import login from './login';

const rootReducer = combineReducers({
  // ... the rest of your reducers
  event,
  events,
  userProfile,
  user,
  login,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
