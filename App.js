import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import SocketsFrontEnd from './test/SocketsFrontend';
import AllEvents from './test/AllEvents';
//import your component

export default function App() {
  return (
    <View style={styles.container}>
      {/* <SocketsFrontEnd /> */}
      {/* you can put your component to test */}
      <AllEvents/>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
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
