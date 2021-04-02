import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import store from "../store";
import { AuthContext } from "../context";
import AsyncStorage from "@react-native-community/async-storage";

// Import Screens:
import Sidebar from "../Sidebar";
import LandingPage from "../LandingPage";
import SingleBookView from "../SingleBookView";
import AllEvents from "../AllEvents";
import SingleEventView from "../SingleEventView";
import CreateEvent from "../CreateEvent";
import UserProfile from "../UserProfile";
import Chat from "../Chat";
import AuthNavigation from "./AuthNavigation";
import StackContainer from "./StackContainer";

const Drawer = createDrawerNavigator();

const RootContainer = () => {
  const initialLoginState = {
    isLoading: true,
    userId: null,
    userToken: null,
  };

  // Reducer for different case scenarios
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "GET_TOKEN":
        return {
          ...prevState,
          userId: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userId: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userToken: null,
          isLoading: false,
        };
      case "SIGNUP":
        return {
          ...prevState,
          userId: action.id,
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

  // We will be passing authContext throughout our app
  const authContext = React.useMemo(
    () => ({
      logIn: async (res) => {
        try {
          // Set userToken to inputted user's username and store it in AsyncStorage
          userToken = res.user.username;
          userId = res.user.id.toString();
          await AsyncStorage.setItem("userToken", userToken);
          await AsyncStorage.setItem("userId", userId);
        } catch (err) {
          console.log(err);
        }
        dispatch({ type: "LOGIN", id: userId, token: userToken });
      },
      logOut: async () => {
        try {
          await AsyncStorage.removeItem("userToken");
        } catch (err) {
          console.log(err);
        }
        dispatch({ type: "LOGOUT" });
      },
      signUp: async (res) => {
        try {
          userToken = res.user.username;
          userId = res.user.id.toString();
          await AsyncStorage.setItem("userToken", userToken);
          await AsyncStorage.setItem("userId", userId);
        } catch (err) {
          console.log(err);
        }
        dispatch({ type: "SIGNUP", id: userId, token: userToken });
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      // Set userToken to null
      let userToken = null;
      try {
        // Fetch userId and userToken from AsyncStorage
        userId = await AsyncStorage.getItem("userId");
        userToken = await AsyncStorage.getItem("userToken");
      } catch (err) {
        console.log(err);
      }
      // If token is found, dispatch for token
      // Otherwise, userToken stays null
      dispatch({ type: "GET_TOKEN", id: userId, token: userToken });
    }, 1000);
  }, []);

  // Spinning icon state, during which user is determined to be logged in or not
  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

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
              {/* <Drawer.Screen name='Home' component={StackContainer} /> */}
              <Drawer.Screen
                name='LandingPage'
                initialParams={{ userId: loginState.userId }}
                component={LandingPage}
              />
              <Drawer.Screen
                name='SingleBookView'
                component={SingleBookView}
                initialParams={{ userId: loginState.userId }}
              />
              <Drawer.Screen
                name='UserProfile'
                component={UserProfile}
                initialParams={{ userId: loginState.userId }}
              />
              <Drawer.Screen
                name='AllEvents'
                component={AllEvents}
                initialParams={{ userId: loginState.userId }}
              />
              <Drawer.Screen
                name='CreateEvent'
                component={CreateEvent}
                initialParams={{ userId: loginState.userId }}
              />
              <Drawer.Screen
                name='SingleEventView'
                component={SingleEventView}
                initialParams={{ userId: loginState.userId }}
              />
              <Drawer.Screen
                name='Chat'
                component={Chat}
                initialParams={{ userId: loginState.userId }}
              />
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
