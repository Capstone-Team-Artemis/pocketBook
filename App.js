import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import SocketsFrontEnd from './test/SocketsFrontend';

//import your component
import Navigation from './Navigation';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <SocketsFrontEnd /> */}
      {/* you can put your component to test */}
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      {/* <StatusBar style="auto" /> */}
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
