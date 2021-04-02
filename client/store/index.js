import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import user from './user';
import events from './events';
import userProfile from './userProfile';

const rootReducer = combineReducers({
  // ... the rest of your reducers
  events,
  userProfile,
  user,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
