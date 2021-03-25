import { combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import user from './user';
import userProfile from './userProfile'

const rootReducer = combineReducers({
  // ... the rest of your reducers
  userProfile,
  user,
  form: formReducer,
});

const store = createStore(rootReducer);

export default store;
