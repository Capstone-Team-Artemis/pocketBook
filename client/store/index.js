import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import user from "./user";
import events from "./events";
import books from "./books";
import userProfile from "./userProfile";

const rootReducer = combineReducers({
  // ... the rest of your reducers
  events,
  userProfile,
  user,
  books,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
