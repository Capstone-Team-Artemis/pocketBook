import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';
// import user, { auth } from './store/user';
import axios from 'axios';

const SignUp = (props) => {
  const [validate, setValidate] = React.useState({
    isValidEmail: true,
    isValidUser: true,
    isValidPassword: true,
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

  return (
    <ScrollView>
      <Formik
        initialValues={{
          email: '',
          password: '',
          username: '',
          firstName: '',
          lastName: '',
        }}
        onSubmit={async (values) => {
          console.log('VALIDATE --->', validate);
          if (!validate.isValidUser || !validate.isValidPassword) {
            Alert.alert('Error', 'Please fix the error(s) and try again.');
          } else {
            try {
              let res = await axios.post('http://localhost:3000/auth/signup/', {
                email: values.email,
                password: values.password,
                username: values.username,
                firstName: values.firstName,
                lastName: values.lastName,
              });
              props.navigation.navigate('App', { user: res.data });
              // if user info is invalid:
            } catch (err) {
              alert(err);
              // Alert.alert('Error', 'Please fix the errors and try again.');
            }
          }
        }}
      >
        {(props) => (
          <View style={styles.container}>
            {/* Icon Image */}
            <Image
              source={{
                uri: 'https://i.ibb.co/rpJ7vjb/signupbook.png',
              }}
              style={styles.image}
            />
            <Text style={styles.heading}>Sign Up</Text>
            <Text>Let's get you started!</Text>

            {/* First Name Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputText}
                placeholder={'First Name'}
                onChangeText={props.handleChange('firstName')}
                value={props.values.firstName}
              />
            </View>

            {/* Last Name Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputText}
                placeholder={'Last Name'}
                onChangeText={props.handleChange('lastName')}
                value={props.values.lastName}
              />
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Icon
                name={'envelope'}
                size={19}
                color={'grey'}
                style={styles.icon}
              />
              <TextInput
                style={styles.inputText}
                placeholder={'Email Address'}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={props.handleChange('email')}
                onEndEditing={(e) => handleEmail(e.nativeEvent.text)}
                value={props.values.email}
              />
            </View>
            {validate.isValidEmail ? null : (
              <Animatable.View animation="zoomIn" duration={500}>
                <Text style={styles.errorMsg}>Please enter a valid email.</Text>
              </Animatable.View>
            )}

            {/* Username Input */}
            <View style={styles.inputContainer}>
              <Icon
                name={'user-plus'}
                size={19}
                color={'grey'}
                style={styles.icon}
              />
              <TextInput
                style={styles.inputText}
                placeholder={'Username'}
                autoCapitalize="none"
                onChangeText={props.handleChange('username')}
                onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                value={props.values.username}
              />
            </View>
            {validate.isValidUser ? null : (
              <Animatable.View animation="zoomIn" duration={500}>
                <Text style={styles.errorMsg}>
                  Username must be 4 characters long.
                </Text>
              </Animatable.View>
            )}

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Icon
                name={'lock'}
                size={20}
                color={'grey'}
                style={styles.icon}
              />
              <TextInput
                style={styles.inputText}
                secureTextEntry={true}
                placeholder={'Password'}
                onChangeText={props.handleChange('password')}
                onEndEditing={(e) => handleValidPassword(e.nativeEvent.text)}
                value={props.values.password}
              />
            </View>
            {validate.isValidPassword ? null : (
              <Animatable.View animation="zoomIn" duration={500}>
                <Text style={styles.errorMsg}>
                  Password must be 8 characters long.
                </Text>
              </Animatable.View>
            )}

            {/* Sign Up Button */}
            <TouchableOpacity
              style={[styles.inputContainer, styles.submitContainer]}
              onPress={props.handleSubmit}
            >
              <Text style={styles.submitText}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      {/* Already have an account? Navigates to Login component */}
      <View style={styles.navContainer}>
        <Text> Already have an account?</Text>
        <Text
          style={[{ color: 'blue' }, { marginLeft: 3 }]}
          onPress={() => props.navigation.navigate('Login')}
        >
          Login!
        </Text>
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
    padding: 0,
    width: 100,
    height: 100,
    marginTop: 50,
  },
  heading: {
    margin: 0,
    fontSize: 40,
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: 'row',
    width: '80%',
    height: 35,
    borderRadius: 50,
    borderWidth: 1.5,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
  },
  icon: {
    top: 5,
    left: 20,
    position: 'absolute',
  },
  inputText: {
    fontWeight: 'bold',
    marginBottom: 4,
    marginLeft: 50,
    width: '100%',
  },
  submitContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6475a5',
  },
  submitText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    bottom: 2,
  },
  navContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 12,
    marginBottom: -5,
  },
});

// const mapStateToProps = (state) => ({
//   method: 'SignUp',
//   user: state.user,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       auth,
//     },
//     dispatch
//   );

export default SignUp;

// export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
