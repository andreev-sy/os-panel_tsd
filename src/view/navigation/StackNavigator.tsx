import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Title from '../components/Title';
import ScanScreen from '../screens/Scan';
import ScanAreaScreen from '../screens/Scan/view';
import LoginScreen from '../screens/Login';
import ActionsList from '../screens/Scan/partials/ActionsList';

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
        // options={({ route }) => ({ title: route.params.headerTitle })}
        options={({ navigation, route }) => ({
          // headerTitle: (props) => <Title {...props} />,
          title: route.params.headerTitle,
          headerRight: () => <ActionsList />,
        })}
      />
    </Stack.Navigator>
  );
}

const LoginStackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen 
          name="Авторизация" 
          component={LoginScreen} 
        />
    </Stack.Navigator>
  );
}

export { ScanStackNavigator, LoginStackNavigator };