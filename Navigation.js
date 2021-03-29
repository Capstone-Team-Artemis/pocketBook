import { createDrawerNavigator } from 'react-navigation-drawer';
import LandingPage from './client/LandingPage';
import SingleBookView from './client/SingleBookView';
import UserProfile from './client/UserProfile';
import AllEvents from './client/AllEvents';
import CreateEvent from './client/CreateEvent';
import Home from './client/Home';

const Navigation = createDrawerNavigator(
  {
    LandingPage: {
      screen: LandingPage,
      navigationOptions: () => ({
        title: 'Home',
        header: null,
      }),
    },
    AllEvents: {
      screen: AllEvents,
      navigationOptions: () => ({
        title: 'Events',
        header: null,
      }),
    },
    CreateEvent: {
      screen: CreateEvent,
      navigationOptions: () => ({
        title: 'Create Event',
        header: null,
      }),
    },
    SingleBookView: {
      screen: SingleBookView,
      navigationOptions: () => ({
        // title: 'Single Book View',
        // header: null,
        drawerLabel: () => null,
      }),
    },
  },
  {
    initialRouteName: 'LandingPage',
  }
);

export default Navigation;

// SingleBookView: { screen: SingleBookView },
