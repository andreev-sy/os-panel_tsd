import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ScanScreen from "./../screens/ScanScreen";
import ScanAreaScreen from "./../screens/ScanAreaScreen";
import LoginScreen from './../screens/LoginScreen';

const Stack = createStackNavigator();

const ScanStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ScanStackRoute">
      <Stack.Screen 
        name="ScanStackRoute" 
        component={ScanScreen} 
        options={{
          title: 'Сканирование',
        }}  
      />
      <Stack.Screen 
        name="ScanAreaStackRoute" 
        component={ScanAreaScreen} 
        options={({ route }) => ({ title: route.params.headerTitle })}
      />
    </Stack.Navigator>
  );
}

const LoginStackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Авторизация" component={LoginScreen} />
    </Stack.Navigator>
  );
}

export { ScanStackNavigator, LoginStackNavigator };