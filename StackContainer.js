import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from 'react-navigation-stack';

import LandingPage from './client/LandingPage';
import SingleBookView from './client/SingleBookView';
import AllEvents from './client/AllEvents';
import CreateEvent from './client/CreateEvent';

const Stack = createStackNavigator();

const StackContainer = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen name="LandingPage" component={LandingPage} />
    <Stack.Screen name="SingleBookView" component={SingleBookView} />
    <Stack.Screen name="AllEvents" component={AllEvents} />
    <Stack.Screen name="CreateEvent" component={CreateEvent} />
  </Stack.Navigator>
);

// const StackContainer = createStackNavigator(
//   {
//     LandingPage: {
//       screen: LandingPage,
//       navigationOptions: {
//         title: 'Home',
//       },
//     },
//     SingleBookView: {
//       screen: SingleBookView,
//       navigationOptions: {
//         title: 'Single Book View',
//       },
//     },
//     AllEvents: {
//       screen: AllEvents,
//       navigationOptions: {
//         title: 'Events',
//       },
//     },
//     CreateEvent: {
//       screen: CreateEvent,
//       navigationOptions: {
//         title: 'Create Event',
//       },
//     },
//   },
//   { headerMode: 'none' }
// );

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
