import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LandingPage from './client/LandingPage';
import SingleBookView from './client/SingleBookView';
import AllEvents from './client/AllEvents';
import CreateEvent from './client/CreateEvent';
import SingleEventView from './client/SingleEventView';
import UserProfile from './client/UserProfile';
import Chat from './client/Chat';

const Stack = createStackNavigator();

const StackContainer = (props) => (
  <Stack.Navigator>
    <Stack.Screen
      name="LandingPage"
      component={LandingPage}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="SingleBookView"
      component={SingleBookView}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="AllEvents"
      component={AllEvents}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="CreateEvent"
      component={CreateEvent}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="SingleEventView"
      component={SingleEventView}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="UserProfile"
      component={UserProfile}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Chat"
      component={Chat}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default StackContainer;
