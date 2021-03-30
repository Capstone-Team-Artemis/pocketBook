import { createDrawerNavigator } from 'react-navigation-drawer';
import LandingPage from './client/LandingPage';
import SingleBookView from './client/SingleBookView';
import UserProfile from './client/UserProfile';
import AllEvents from './client/AllEvents';
import CreateEvent from './client/CreateEvent';
import SingleEventPage from './client/SingleEventPage';
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
    UserProfile: {
      screen: UserProfile,
      navigationOptions: () => ({
        title: 'My Profile',
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
        title: 'Single Book View',
        header: null,
      }),
    },

    SingleEventPage: {
      screen: SingleEventPage,
      navigationOptions: () => ({
        title: 'Single Event Page',
        header: null,
      }),
    },
  },
  {
    initialRouteName: 'LandingPage',
  }
);

export default Navigation;

// SingleBookView: { screen: SingleBookView },

// SingleBookView: { screen: SingleBookView },

