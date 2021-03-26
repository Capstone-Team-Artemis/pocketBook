import { createDrawerNavigator } from 'react-navigation-drawer';
import LandingPage from './client/LandingPage';
import SingleBookView from './client/SingleBookView';

const Navigation = createDrawerNavigator(
  {
    LandingPage: { screen: LandingPage },
    SingleBookView: { screen: SingleBookView },
  },
  {
    initialRouteName: 'LandingPage',
  }
);

export default Navigation;
