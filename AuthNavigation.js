import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './client/Login';
import SignUp from './client/SignUp';

const Auth = createStackNavigator();

const AuthNavigation = ({ navigation }) => (
  <Auth.Navigator headerMode="none" initialRouteName="Login">
    <Auth.Screen name="Login" component={Login} />
    <Auth.Screen name="SignUp" component={SignUp} />
  </Auth.Navigator>
);

export default AuthNavigation;
