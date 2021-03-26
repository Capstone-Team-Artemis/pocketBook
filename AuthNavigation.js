import { createStackNavigator } from 'react-navigation-stack';

import Login from './client/Login';
import SignUp from './client/SignUp';

const AuthNavigation = createStackNavigator(
  {
    Login: { screen: Login },
    SignUp: { screen: SignUp },
  },
  {
    initialRoute: 'Login',
    headerMode: 'none',
  }
);

export default AuthNavigation;
