import * as React from 'react';
// Importing React libraries to help with navigating between screens
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from 'react-navigation-stack';

// import Login from "./client/Login";
// import SignUp from "./client/SignUp";
import LandingPage from './client/LandingPage';
import SingleBookView from './client/SingleBookView';
import AllEvents from './client/AllEvents';

// const Stack = createStackNavigator();

const StackContainer = createStackNavigator({
  LandingPage: LandingPage,
  SingleBookView: SingleBookView,
  AllEvents: AllEvents,
});

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
