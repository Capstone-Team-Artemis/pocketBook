import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AuthNavigation from './AuthNavigation';
import Navigation from './Navigation';

const SwitchNavigator = createSwitchNavigator(
  {
    Auth: AuthNavigation,
    App: Navigation,
  },
  {
    initialRouteName: 'Auth',
  }
);

const AppContainer = createAppContainer(SwitchNavigator);

export default AppContainer;
