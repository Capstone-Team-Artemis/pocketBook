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
    userId: null,
    userToken: null,
  };

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
          userId: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userId: null,
          userToken: null,
          isLoading: false,
        };
      case 'SIGNUP':
        return {
          ...prevState,
          userId: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  //   const [isLoading, setIsLoading] = React.useState(true);
  //   const [userToken, setUserToken] = React.useState(null);

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  console.log('LOGIN STATE --->', loginState);

  // We will be passing authContext throughout our app
  const authContext = React.useMemo(
    () => ({
      logIn: async (res) => {
        console.log('USER --->', res.user);
        console.log('USER ID --->', res.user.id);
        try {
          userToken = res.user.username;
          userId = res.user.id.toString();
          await AsyncStorage.setItem('userToken', userToken);
        } catch (err) {
          console.log(err);
        }
        dispatch({ type: 'LOGIN', id: userId, token: userToken });
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
          userId = res.user.id.toString();
          await AsyncStorage.setItem('userToken', userToken);
        } catch (err) {
          console.log(err);
        }
        dispatch({ type: 'SIGNUP', id: userId, token: userToken });
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      // Set userToken to null
      userToken = null;
      try {
        // Fetch userToken from AsyncStorage
        userToken = await AsyncStorage.getItem('userToken');
      } catch (err) {
        console.log(err);
      }
      // If token is found, dispatch for token
      dispatch({ type: 'GET_TOKEN', token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {loginState.userToken !== null ? (
            <Drawer.Navigator
              // initialRouteName="LandingPage"
              drawerContent={(props) => <Sidebar {...props} />}
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

// const mapDispatch = (dispatch) => {
//   return {
//     getToken: (token) => dispatch(getToken(token)),
//     signIn: (id, token) => dispatch(signIn(id, token)),
//     signOut: () => dispatch(signOut()),
//     register: (id, token) => dispatch(register(id, token)),
//   };
// };

export default RootContainer;

// import { createSwitchNavigator, createAppContainer } from 'react-navigation';
// import AuthNavigation from './AuthNavigation';
// import Navigation from './AppNavigation';
// import StackContainer from './StackContainer';

// const SwitchNavigator = createSwitchNavigator(
//   {
//     Auth: AuthNavigation,
//     App: Navigation,
//   },
//   {
//     initialRouteName: 'Auth',
//   }
// );

// const AppContainer = createAppContainer(SwitchNavigator);

// export default AppContainer;