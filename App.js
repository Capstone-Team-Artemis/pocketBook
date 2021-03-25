import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
// import SocketsFrontEnd from './test/SocketsFrontend';
import AllEvents from './client/AllEvents';

//import your component
// import Navigation from './Navigation';

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        {/* <SocketsFrontEnd /> */}
        {/* you can put your component to test */}
        {/* <AllEvents/> */}
        {/* <Text>Open up App.js to start working on your app!</Text> */}
        {/* <StatusBar style="auto" /> */}
        {/* <Navigation /> */}
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
