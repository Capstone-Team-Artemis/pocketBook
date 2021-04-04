import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Alert,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Formik } from 'formik';
import axios from 'axios';
import { AuthContext } from './context';
import { useFonts } from 'expo-font';

const Login = (props) => {
  // Loading fonts:
  const [loaded] = useFonts({
    'Asap-Bold': require('../assets/fonts/Asap-Bold.ttf'),
    'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
  });

  const [secureTextEntry, setSecure] = React.useState(true);
  const { logIn } = React.useContext(AuthContext);

  const updateSecureTextEntry = () => {
    setSecure(!secureTextEntry);
  };

  // If inputted Login info is correct, navigate user info to RootNavigation's logIn function
  const handlePress = (user) => {
    logIn(user);
  };

  // For when font can't load:
  if (!loaded) {
    return null;
  }

  return (
    <ImageBackground
      source={{ uri: 'https://i.ibb.co/0t3nZGK/loginscreen-copy.jpg' }}
      style={styles.background}
      imageStyle={{
        resizeMode: 'stretch',
      }}
    >
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async (values) => {
          // If user didn't input anything:
          if (values.email === '' || values.password === '') {
            Alert.alert('Error', 'Username and/or password cannot be empty.');
          } else {
            // If user did, axios call to lookup user login info
            try {
              let res = await axios.post(
                'https://pocketbook-gh.herokuapp.com/auth/login/',
                {
                  email: values.email,
                  password: values.password,
                }
              );
              // handlePress = passes user info to function that will pass to RootNavigation's logIn function
              handlePress({ user: res.data });
              // If user info is invalid:
            } catch {
              Alert.alert(
                'Error',
                'Incorrect username or password. Please try again.'
              );
            }
          }
        }}
      >
        {(props) => (
          <View>
            {/* Icon Image */}
            <Image
              source={{
                uri: 'https://i.ibb.co/Gn9bqym/pocketbook-icon.png',
              }}
              style={styles.image}
            />
            <Text style={styles.heading}>Login</Text>
            <Text style={{ marginLeft: 20 }}>Welcome back to Pocketbook!</Text>

            {/* Email Address Input */}
            <View style={styles.inputContainer}>
              <TextInput
                label="Email"
                selectionColor="#000"
                style={styles.inputText}
                theme={{ colors: { primary: '#000', placeholder: '#000' } }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={props.handleChange('email')}
                value={props.values.email}
                left={<TextInput.Icon name="account-circle" />}
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <TextInput
                label="Password"
                style={styles.inputText}
                theme={{ colors: { primary: '#000', placeholder: '#000' } }}
                secureTextEntry={secureTextEntry ? true : false}
                returnKeyType="go"
                onChangeText={props.handleChange('password')}
                value={props.values.password}
                left={<TextInput.Icon name="lock" />}
              />
              {/* Adds eye button that toggles whether password input is hidden or not */}
              <TouchableOpacity
                style={styles.btnEye}
                onPress={updateSecureTextEntry}
              >
                <Icon
                  name={secureTextEntry ? 'eye' : 'eye-slash'}
                  size={20}
                  color={'#000'}
                />
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={[styles.inputContainer, styles.submitContainer]}
              onPress={props.handleSubmit}
            >
              <Text style={styles.submitText}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      {/* Don't have an account? Navigates to Sign Up component */}
      <View style={styles.navContainer}>
        <Text>Don't have an account?</Text>
        <Text
          style={[{ color: 'blue' }, { marginLeft: 3 }]}
          onPress={() =>
            props.navigation.navigate('SignUp', { loggedIn: false })
          }
        >
          Sign Up!
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 90,
    marginLeft: 10,
  },
  heading: {
    marginLeft: 20,
    fontSize: 40,
    fontFamily: 'Asap-Bold',
  },
  // Edits the round container around the Input
  inputContainer: {
    marginLeft: 20,
    marginTop: 20,
    // flexDirection: 'row',
    width: '100%',
  },
  inputText: {
    fontWeight: 'bold',
    width: '90%',
    backgroundColor: '#FFF',
  },
  submitContainer: {
    backgroundColor: '#6475a5',
  },
  submitText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    bottom: 2,
  },
  navContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    marginLeft: 30,
  },
  btnEye: {
    position: 'absolute',
    top: 25,
    right: 40,
    color: '#000',
  },
  background: {
    width: '100%',
    height: '100%',
  },
});

export default Login;
