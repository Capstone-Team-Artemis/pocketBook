import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AuthNavigation from './AuthNavigation';
import Navigation from './Navigation';
import StackContainer from './StackContainer';

const SwitchNavigator = createSwitchNavigator(
  {
    Auth: AuthNavigation,
    App: Navigation,
    Stack: StackContainer,
  },
  {
    initialRouteName: 'Auth',
  }
);

const AppContainer = createAppContainer(SwitchNavigator);

export default AppContainer;
