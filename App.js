import React from 'react';
import { Provider } from 'react-redux';
import store from './client/store';

import RootContainer from './client/navigation/RootContainer';

const App = () => {
  return (
    <Provider store={store}>
      <RootContainer />
    </Provider>
  );
};

export default App;
