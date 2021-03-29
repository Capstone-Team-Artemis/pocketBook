import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AuthLoading from './AuthLoading';
import AuthNavigation from './AuthNavigation';
import Navigation from './Navigation';
import StackContainer from './StackContainer';

const SwitchNavigator = createSwitchNavigator(
  {
    Auth: AuthNavigation,
    App: Navigation,
  },
  {
    initialRouteName: 'Loading',
  }
);

const AppContainer = createAppContainer(SwitchNavigator);

export default AppContainer;
