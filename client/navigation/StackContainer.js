import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LandingPage from '../LandingPage';
import SingleBookView from '../SingleBookView';
import AllEvents from '../AllEvents';
import CreateEvent from '../CreateEvent';
import SingleEventView from '../SingleBookView';
import UserProfile from '../SingleBookView';
import Chat from '../Chat';

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
      options={({ route }) => ({
        title: route.params.title,
        headerBackTitleVisible: false,
      })}
    />
  </Stack.Navigator>
);

export default StackContainer;
