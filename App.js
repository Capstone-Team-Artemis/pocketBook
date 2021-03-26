import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Provider } from 'react-redux';
import store from './client/store';
import AppContainer from './index';
// import SocketsFrontEnd from './test/SocketsFrontend';

//import your component
// import Navigation from './Navigation';

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     // alignItems: 'center',
//     // justifyContent: 'center',
//   },
// });
