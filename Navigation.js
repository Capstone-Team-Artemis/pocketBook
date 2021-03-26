import * as React from 'react';
// Importing React libraries to help with navigating between screens
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

// import Login from './client/Login';
// import SignUp from './client/SignUp';

import Home from './client/Home';

// import {
//   HomeScreen,
//   UserScreen,
//   EventScreen,
//   LogOutScreen,
// } from './client/screens';

// const DrawerNavigator = createDrawerNavigator({
//   HomeScreen,
//   UserScreen,
//   EventScreen,
//   LogOutScreen,
// });

// const Drawer = createDrawerNavigator();
// const Stack = createStackNavigator();

const Navigation = createDrawerNavigator(
  {
    Home: { screen: Home },
  },
  {
    initialRouteName: 'Home',
  }
);

export default Navigation;

// const Navigation = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {/* You can have as many Stack.Screen as you want */}
//         {/* Each Screen takes a React "component" prop */}
//         <Stack.Screen
//           name="Login"
//           component={Login}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="SignUp"
//           component={SignUp}
//           options={{ headerShown: false }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// create switch navigation with authentication flow and main app
// const SwitchNavigator = createSwitchNavigator(
//   {
//     Login: AuthNavigator,
//     App: AppNavigator
//   },
//   {
//     initialRouteName: 'Login'
//   }
// );
