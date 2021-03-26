import React from 'react';
import { Provider } from 'react-redux';
import store from './client/store';
import AppContainer from './AppContainer';

//import your component
// import Navigation from "./Navigation";

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
