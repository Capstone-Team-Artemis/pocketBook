import React, { useEffect, useImperativeHandle } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { connect } from 'react-redux';
import store from './client/store';
import { AuthContext } from './client/context';
import AsyncStorage from '@react-native-community/async-storage';

// Import Screens:
import Sidebar from './client/Sidebar';
import LandingPage from './client/LandingPage';
import SingleBookView from './client/SingleBookView';
import AllEvents from './client/AllEvents';
import CreateEvent from './client/CreateEvent';
import UserProfile from './client/UserProfile';
import AuthNavigation from './AuthNavigation';
import StackContainer from './StackContainer';

const Drawer = createDrawerNavigator();

const RootContainer = () => {
  const initialLoginState = {
    isLoading: true,
    userId: 0,
    userToken: null,
  };

  // Reducer for different case scenarios
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'GET_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userToken: null,
          isLoading: false,
        };
      case 'SIGNUP':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  // loginState = state object that consists of initialState Object
  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  console.log('LOGIN STATE --->', loginState);

  // We will be passing authContext throughout our app
  const authContext = React.useMemo(
    () => ({
      logIn: async (res) => {
        try {
          // Set userToken to inputted user's username and store it in AsyncStorage
          userToken = res.user.username;
          await AsyncStorage.setItem('userToken', userToken);
        } catch (err) {
          console.log(err);
        }
        dispatch({ type: 'LOGIN', token: userToken });
      },
      logOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (err) {
          console.log(err);
        }
        dispatch({ type: 'LOGOUT' });
      },
      signUp: async (res) => {
        try {
          userToken = res.user.username;
          await AsyncStorage.setItem('userToken', userToken);
        } catch (err) {
          console.log(err);
        }
        dispatch({ type: 'SIGNUP', token: userToken });
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      // Set userToken to null
      let userToken = null;
      try {
        // Fetch userToken from AsyncStorage
        userToken = await AsyncStorage.getItem('userToken');
      } catch (err) {
        console.log(err);
      }
      // If token is found, dispatch for token
      // Otherwise, userToken stays null
      dispatch({ type: 'GET_TOKEN', token: userToken });
    }, 1000);
  }, []);

  // Spinning icon state, during which user is determined to be logged in or not
  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  console.log('USER TOKEN ---->', loginState.userToken);

  // If user is logged in (has a token attached), show DrawerNavigaton
  // Otherwise, show AuthNavigation
  return (
    <Provider store={store}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {loginState.userToken !== null ? (
            <Drawer.Navigator
              drawerContent={(props) => <Sidebar {...props} {...loginState} />}
            >
              <Drawer.Screen name="Home" component={StackContainer} />
              <Drawer.Screen name="LandingPage" component={LandingPage} />
              <Drawer.Screen name="SingleBookView" component={SingleBookView} />
              <Drawer.Screen name="UserProfile" component={UserProfile} />
              <Drawer.Screen name="AllEvents" component={AllEvents} />
              <Drawer.Screen name="CreateEvent" component={CreateEvent} />
            </Drawer.Navigator>
          ) : (
            <AuthNavigation />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  );
};

export default RootContainer;
