import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ScanScreen from "./../screens/ScanScreen";
import ScanAreaScreen from "./../screens/ScanAreaScreen";

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

export { ScanStackNavigator };