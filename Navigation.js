import { createDrawerNavigator } from 'react-navigation-drawer';
import Home from './client/Home';

const Navigation = createDrawerNavigator(
  {
    Home: { screen: Home },
  },
  {
    initialRouteName: 'Home',
  }
);

export default Navigation;
