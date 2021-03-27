import React, { useEffect } from 'react';
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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';
import { auth, me } from './store/user';

const Login = (props) => {
  const { user } = props;
  return (
    <ScrollView>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values) => {
          props.auth(values.email, values.password, props.method);
          console.log('USER --->', user);
          if (Object.keys(user).length > 0) {
            props.navigation.navigate('App');
          } else {
            Alert.alert(
              'Error',
              'Incorrect username or password. Please try again.'
            );
          }
        }}
      >
        {(props) => (
          <View style={styles.container}>
            {/* Icon Image */}
            <Image
              source={{
                uri: 'https://img.icons8.com/plasticine/2x/pocket.png',
              }}
              resizeMode="center"
              style={styles.image}
            />
            <Text style={styles.heading}>Login</Text>
            <Text>Welcome to Pocketbook!</Text>

            {/* Email Address Input */}
            <View style={styles.inputContainer}>
              <Icon
                name={'envelope'}
                size={30}
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
                value={props.values.email}
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Icon
                name={'lock'}
                size={30}
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
          onPress={() => props.navigation.navigate('SignUp')}
        >
          Sign Up!
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
  navContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => ({
  method: 'Login',
  user: state.user,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      auth,
      me,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);
