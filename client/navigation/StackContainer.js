import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LandingPage from "../LandingPage";
import SingleBookView from "../SingleBookView";
import AllEvents from "../AllEvents";
import CreateEvent from "../CreateEvent";
import SingleEventView from "../SingleBookView";
import UserProfile from "../SingleBookView";
import Chat from "../Chat";

const Stack = createStackNavigator();

const StackContainer = (props) => {
  const loginState = props.route.params.loginState;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='LandingPage'
        initialParams={{ userId: loginState.userId }}
        component={LandingPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='SingleBookView'
        initialParams={{ userId: loginState.userId }}
        component={SingleBookView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='AllEvents'
        initialParams={{ userId: loginState.userId }}
        component={AllEvents}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='CreateEvent'
        initialParams={{ userId: loginState.userId }}
        component={CreateEvent}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='SingleEventView'
        initialParams={{ userId: loginState.userId }}
        component={SingleEventView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='UserProfile'
        initialParams={{ userId: loginState.userId }}
        component={UserProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Chat'
        initialParams={{ userId: loginState.userId }}
        component={Chat}
        options={({ route }) => ({
          title: route.params.title,
          headerBackTitleVisible: false,
        })}
      />
    </Stack.Navigator>
  );
};

export default StackContainer;
