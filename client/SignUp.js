import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import { TextInput, Button } from 'react-native-paper';
import { Formik } from 'formik';
import axios from 'axios';
import { useFonts } from 'expo-font';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { AuthContext } from './context';

const SignUp = (props) => {
  // Loading fonts:
  const [loaded] = useFonts({
    'Asap-Bold': require('../assets/fonts/Asap-Bold.ttf'),
    'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
    'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
  });

  const { signUp } = React.useContext(AuthContext);

  const [validate, setValidate] = React.useState({
    isValidEmail: true,
    isValidUser: true,
    isValidPassword: true,
    secureTextEntry: true,
  });

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setValidate({
        ...validate,
        isValidUser: true,
      });
    } else {
      setValidate({
        ...validate,
        isValidUser: false,
      });
    }
  };

  const handleValidPassword = (val) => {
    if (val.trim().length >= 8) {
      setValidate({
        ...validate,
        isValidPassword: true,
      });
    } else {
      setValidate({
        ...validate,
        isValidPassword: false,
      });
    }
  };

  const handleEmail = (val) => {
    // Using regex to check for possible valid email input
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(val)) {
      setValidate({
        ...validate,
        isValidEmail: true,
      });
    } else {
      setValidate({
        ...validate,
        isValidEmail: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setValidate({
      ...validate,
      secureTextEntry: !validate.secureTextEntry,
    });
  };

  // If inputted Signup info is valid, navigate user over to DrawerNavigaton
  const handlePress = (user) => {
    signUp(user);
  };

  // For when font can't load:
  if (!loaded) {
    return null;
  }

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
      contentContainerStyle={styles.scrollContainer}
    >
      <ImageBackground
        source={{ uri: 'https://i.ibb.co/3cP8BQC/booksignupscreen.jpg' }}
        style={styles.background}
        imageStyle={{
          resizeMode: 'stretch',
        }}
      >
        <View style={styles.container}>
          <Formik
            initialValues={{
              email: '',
              password: '',
              username: '',
              firstName: '',
              lastName: '',
            }}
            onSubmit={async (values) => {
              // Adding user validation (>= 4 chars) and password validation (>= 8 chars)
              if (!validate.isValidUser || !validate.isValidPassword) {
                Alert.alert('Error', 'Please fix the error(s) and try again.');
                // Once that's validated, axios runs call to signup and navigate to App screen
              } else {
                try {
                  let res = await axios.post(
                    'https://pocketbook-gh.herokuapp.com/auth/signup/',
                    {
                      email: values.email,
                      password: values.password,
                      username: values.username,
                      firstName: values.firstName,
                      lastName: values.lastName,
                    }
                  );
                  // handlePress = passes user info to function that will navigate to DrawerNavigaton
                  handlePress({ user: res.data });
                  // If there was a problem signing up, display an alert error
                } catch (err) {
                  Alert.alert('Error', 'Please fix the errors and try again.');
                }
              }
            }}
          >
            {(props) => (
              <View style={styles.container}>
                {/* Icon Image */}
                <Image
                  source={{
                    uri: 'https://i.ibb.co/yWQvLJL/POCKETBOOK-1-IN-01.png',
                  }}
                  style={styles.image}
                />
                <Text style={styles.heading}>Sign Up</Text>
                <Text style={{ fontFamily: 'Roboto-Light' }}>
                  to join the book lovers community!
                </Text>

                <View style={styles.name}>
                  {/* First Name Input */}
                  <View style={styles.nameContainer}>
                    <TextInput
                      label="First Name"
                      style={styles.nameText}
                      theme={{
                        colors: { primary: '#000', placeholder: '#000' },
                        fonts: { regular: { fontFamily: 'Roboto-Light' } },
                      }}
                      onChangeText={props.handleChange('firstName')}
                      value={props.values.firstName}
                      left={<TextInput.Icon name="alpha-f-circle" />}
                    />
                  </View>

                  {/* Last Name Input */}
                  <View style={styles.nameContainer}>
                    <TextInput
                      label="Last Name"
                      style={styles.nameText}
                      theme={{
                        colors: { primary: '#000', placeholder: '#000' },
                        fonts: { regular: { fontFamily: 'Roboto-Light' } },
                      }}
                      onChangeText={props.handleChange('lastName')}
                      value={props.values.lastName}
                      left={<TextInput.Icon name="alpha-l-circle" />}
                    />
                  </View>
                </View>

                {/* Email Input */}
                <View style={styles.inputContainer}>
                  <TextInput
                    label="Email"
                    style={[styles.inputText, styles.email]}
                    theme={{
                      colors: { primary: '#000', placeholder: '#000' },
                      fonts: { regular: { fontFamily: 'Roboto-Light' } },
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={props.handleChange('email')}
                    onEndEditing={(e) => handleEmail(e.nativeEvent.text)}
                    value={props.values.email}
                    left={<TextInput.Icon name="email" />}
                  />
                </View>
                {validate.isValidEmail ? null : (
                  <Animatable.View animation="zoomIn" duration={500}>
                    <Text style={styles.errorMsg}>
                      Please enter a valid email.
                    </Text>
                  </Animatable.View>
                )}

                {/* Username Input */}
                <View style={styles.inputContainer}>
                  <TextInput
                    label="Username"
                    style={styles.inputText}
                    theme={{
                      colors: { primary: '#000', placeholder: '#000' },
                      fonts: { regular: { fontFamily: 'Roboto-Light' } },
                    }}
                    autoCapitalize="none"
                    onChangeText={props.handleChange('username')}
                    onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                    value={props.values.username}
                    left={<TextInput.Icon name="account-circle" />}
                  />
                </View>
                {/* Text shows up if username is < 4 chars */}
                {validate.isValidUser ? null : (
                  <Animatable.View animation="zoomIn" duration={500}>
                    <Text style={styles.errorMsg}>
                      Username must be 4 characters long.
                    </Text>
                  </Animatable.View>
                )}

                {/* Password Input */}
                <View style={styles.inputContainer}>
                  <TextInput
                    label="Password"
                    style={styles.inputText}
                    theme={{
                      colors: { primary: '#000', placeholder: '#000' },
                      fonts: { regular: { fontFamily: 'Roboto-Light' } },
                    }}
                    secureTextEntry={validate.secureTextEntry ? true : false}
                    onChangeText={props.handleChange('password')}
                    onEndEditing={(e) =>
                      handleValidPassword(e.nativeEvent.text)
                    }
                    value={props.values.password}
                    left={<TextInput.Icon name="lock" />}
                  />
                  {/* Adds eye button that toggles whether password input is hidden or not */}
                  <TouchableOpacity
                    style={styles.btnEye}
                    onPress={updateSecureTextEntry}
                  >
                    <Icon
                      name={validate.secureTextEntry ? 'eye' : 'eye-slash'}
                      size={16}
                      color={'#000'}
                    />
                  </TouchableOpacity>
                </View>
                {/* Text shows up if password is < 8 chars */}
                {validate.isValidPassword ? null : (
                  <Animatable.View animation="zoomIn" duration={500}>
                    <Text style={styles.errorMsg}>
                      Password must be 8 characters long.
                    </Text>
                  </Animatable.View>
                )}

                {/* Sign Up Button */}
                <Button
                  mode="contained"
                  style={styles.submitContainer}
                  onPress={props.handleSubmit}
                >
                  <Text style={styles.submitText}>Sign Up</Text>
                </Button>
              </View>
            )}
          </Formik>
          {/* Already have an account? Navigates to Login component */}
          <View style={styles.navContainer}>
            <Text style={{ fontFamily: 'Roboto-Light' }}>
              Already have an account?
            </Text>
            <Text
              style={[
                { color: '#24aae2', fontFamily: 'Roboto-Medium', fontSize: 14 },
                { marginLeft: 3 },
              ]}
              onPress={() => props.navigation.navigate('Login')}
            >
              Login!
            </Text>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginTop: 10,
    marginBottom: -50,
    width: 180,
    height: 180,
  },
  heading: {
    fontSize: 40,
    fontFamily: 'Asap-Bold',
  },
  name: {
    // display: 'flex',
    flexDirection: 'row',
    marginBottom: -10,
  },
  nameText: {
    height: 55,
    backgroundColor: '#FFF',
  },
  inputContainer: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    width: '95%',
    height: 10,
    alignItems: 'center',
    paddingTop: 40,
  },
  nameContainer: {
    marginTop: 20,
    marginRight: 5,
    marginBottom: -5,
    width: 145,
  },
  inputText: {
    height: 50,
    width: '80%',
    backgroundColor: '#FFF',
  },
  submitContainer: {
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#Ef5c2b',
    marginTop: 30,
    borderRadius: 350,
  },
  submitText: {
    fontFamily: 'Roboto-Light',
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  navContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorMsg: {
    marginTop: 15,
    color: '#E92228',
    fontSize: 12,
    marginBottom: -5,
    fontFamily: 'Roboto-Light',
  },
  btnEye: {
    position: 'absolute',
    top: 32,
    right: 10,
  },
  background: {
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    backgroundColor: '#FFF',
    flexGrow: 1,
  },
});

export default SignUp;
