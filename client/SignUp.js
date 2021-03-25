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
import { reduxForm } from 'redux-form';
import { Formik } from 'formik';

const SignUp = ({ navigation }) => {
  return (
    <ScrollView>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          password: '',
        }}
        onSubmit={(values) => {
          // values.firstName..
          console.log(values);
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
                onChangeText={props.handleChange('username')}
                value={props.values.username}
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
                onChangeText={props.handleChange('email')}
                value={props.values.email}
              />
            </View>

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
                value={props.values.password}
              />
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              style={[styles.inputContainer, styles.submitContainer]}
              onPress={props.handleSubmit}
            >
              <Text style={styles.submitText}>SIGN UP</Text>
            </TouchableOpacity>

            {/* Already have an account? Navigates to Login component */}
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Text style={styles.textBody}> Already have an account?</Text>
              <Text
                style={[styles.textBody, { color: 'blue' }, { marginLeft: 3 }]}
                onPress={() => navigation.navigate('Login')}
              >
                Login!
              </Text>
            </View>
          </View>
        )}
      </Formik>
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
});

export default SignUp;
