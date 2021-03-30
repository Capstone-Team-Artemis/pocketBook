import * as React from 'react';
// Importing React libraries to help with navigating between screens
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from 'react-navigation-stack';

// import Login from "./client/Login";
// import SignUp from "./client/SignUp";
import LandingPage from './client/LandingPage';
import SingleBookView from './client/SingleBookView';
import AllEvents from './client/AllEvents';
import CreateEvent from './client/CreateEvent';
import SingleEventPage from './client/SingleEventPage';
import UserProfile from './client/UserProfile';
import Chat from './client/Chat'

// const Stack = createStackNavigator();

const StackContainer = createStackNavigator(
  {
    LandingPage: {
      screen: LandingPage,
      navigationOptions: {
        title: 'Home',
      },
    },
    SingleBookView: {
      screen: SingleBookView,
      navigationOptions: {
        title: 'Single Book View',
      },
    },
    AllEvents: {
      screen: AllEvents,
      navigationOptions: {
        title: 'Events',
      },
    },
    CreateEvent: {
      screen: CreateEvent,
      navigationOptions: {
        title: 'Create Event',
      },
    },
    SingleEventPage: {
      screen: SingleEventPage,
      navigationOptions: {
        title: 'Single Event Page',
      },
    },
    UserProfile: {
      screen: UserProfile,
      navigationOptions: {
        title: 'UserProfile',
      },
    },
    Chat: {
      screen: Chat,
      navigationOptions: {
        title: 'Chat',
      },
    },
  },
  { headerMode: 'none' }
);

export default StackContainer;

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {/* You can have as many Stack.Screen as you want */}
//         {/* Each Screen takes a React "component" prop */}
//         <Stack.Screen
//           name="LandingPage"
//           component={LandingPage}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="SingleBookView"
//           component={SingleBookView}
//           options={{ headerShown: false }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
