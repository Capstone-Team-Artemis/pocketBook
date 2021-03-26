import { createDrawerNavigator } from 'react-navigation-drawer';
import LandingPage from './client/LandingPage';
import SingleBookView from './client/SingleBookView';
import AllEvents from './client/AllEvents';
import Home from './client/Home';

const Navigation = createDrawerNavigator(
  {
    LandingPage: {
      screen: LandingPage,
      navigationOptions: () => ({
        title: 'Home',
      }),
    },
    AllEvents: {
      screen: AllEvents,
      navigationOptions: () => ({
        title: 'Events',
      }),
    },
  },
  {
    initialRouteName: 'LandingPage',
  }
);

export default Navigation;

// SingleBookView: { screen: SingleBookView },
