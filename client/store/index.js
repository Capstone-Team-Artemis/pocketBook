import { combineReducers, createStore, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import user from './user';

const rootReducer = combineReducers({
  // ... the rest of your reducers
  user,
  form: formReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
