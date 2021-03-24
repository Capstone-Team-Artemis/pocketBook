import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Icon Image */}
        <Image
          source={{ uri: 'https://img.icons8.com/plasticine/2x/pocket.png' }}
          resizeMode="center"
          style={styles.image}
        />
        <Text style={styles.heading}>Login</Text>
        <View></View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 400,
    height: 100,
    marginTop: 120,
  },
  heading: {
    fontSize: 40,
  },
});

export default Login;
