import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../Login';
import SignUp from '../SignUp';

const Auth = createStackNavigator();

const AuthNavigation = ({ navigation }) => (
  <Auth.Navigator headerMode="none" initialRouteName="Login">
    <Auth.Screen name="Login" component={Login} />
    <Auth.Screen name="SignUp" component={SignUp} />
  </Auth.Navigator>
);

export default AuthNavigation;
