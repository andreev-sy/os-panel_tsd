import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ScanScreen from "./../screens/ScanScreen";
import ScanAreaScreen from "./../screens/ScanAreaScreen";
import ControlScreen from "./../screens/ControlScreen";
import ProfileScreen from "./../screens/ProfileScreen";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Home" component={ScanScreen} />
      <Stack.Screen name="About" component={ScanAreaScreen} />
    </Stack.Navigator>
  );
}

const ContactStackNavigator = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Control" component={ControlScreen} />
      <Stack.Screen name="Contact" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export { MainStackNavigator, ContactStackNavigator };