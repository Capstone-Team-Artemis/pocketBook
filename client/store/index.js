import { combineReducers, createStore, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import user from './user';
import userProfile from './userProfile'
import event from './event'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  // ... the rest of your reducers
  event,
  userProfile,
  user,
  form: formReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
