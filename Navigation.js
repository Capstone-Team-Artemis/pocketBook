import { createDrawerNavigator } from 'react-navigation-drawer';
import LandingPage from './client/LandingPage';
import SingleBookView from './client/SingleBookView';
import AllEvents from './client/AllEvents';
import UserProfile from './client/UserProfile';
import Home from './client/Home';

const Navigation = createDrawerNavigator(
  {
    LandingPage: {
      screen: LandingPage,
      navigationOptions: () => ({
        title: 'Home',
      }),
    },
    UserProfile: {
      screen: UserProfile,
      navigationOptions: () => ({
        title: 'My Profile',
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
