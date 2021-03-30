import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import store from './client/store';
import { AuthContext } from './client/context';
// import AppContainer from './AppContainer';

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

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  // We will be passing authContext throughout our app
  const authContext = React.useMemo(() => ({
    logIn: () => {
      setUserToken('hi');
      setIsLoading(false);
    },
    logOut: () => {
      setUserToken(null);
      setIsLoading(false);
    },
    signUp: () => {
      setUserToken('hi');
      setIsLoading(false);
    },
  }));

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
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
          {userToken !== null ? (
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

export default App;
