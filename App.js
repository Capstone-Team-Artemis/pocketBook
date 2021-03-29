import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import store from './client/store';
import AppContainer from './AppContainer';
import { AuthContext } from './client/context';

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  // We will be passing authContext throughout our app
  const authContext = React.useMemo(() => {
    logIn: () => {
      setUserToken('hi');
      setIsLoading(false);
    };
    logOut: () => {
      setUserToken(null);
      setIsLoading(false);
    };
    signUp: () => {
      setUserToken('hi');
      setIsLoading(false);
    };
  });

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
    <AuthContext.Provider value={authContext}>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </AuthContext.Provider>
  );
}
