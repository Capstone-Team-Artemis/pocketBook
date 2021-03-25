import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = ({ navigation }) => {
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

        {/* Email Address Input */}
        <View style={styles.inputContainer}>
          <Icon
            name={'envelope'}
            size={30}
            color={'grey'}
            style={styles.icon}
          />
          <TextInput style={styles.inputText} placeholder={'Email Address'} />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Icon name={'lock'} size={30} color={'grey'} style={styles.icon} />
          <TextInput
            style={styles.inputText}
            secureTextEntry={true}
            placeholder={'Password'}
          />
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={[styles.inputContainer, styles.submitContainer]}
        >
          <Text style={styles.submitText}>LOGIN</Text>
        </TouchableOpacity>

        {/* Don't have an account? Navigates to Sign Up component */}
        <View style={{ flexDirection: 'row', marginVertical: 5 }}>
          <Text style={styles.textBody}>Don't have an account?</Text>
          <Text
            style={[styles.textBody, { color: 'blue' }, { marginLeft: 3 }]}
            onPress={() => navigation.navigate('SignUp')}
          >
            Sign Up!
          </Text>
        </View>
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
  icon: {
    top: 8,
    left: 20,
    position: 'absolute',
  },
  // Edits the round container around the Input
  inputContainer: {
    marginTop: 20,
    flexDirection: 'row',
    width: '90%',
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    paddingTop: 5,
  },
  inputText: {
    fontWeight: 'bold',
    marginLeft: 60,
    width: '100%',
  },
  submitContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6475a5',
  },
  submitText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    bottom: 2,
  },
});

export default Login;
