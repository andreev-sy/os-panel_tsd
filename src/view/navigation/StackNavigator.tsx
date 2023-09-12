import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Title from '../components/Title';
import HomeScreen from '../screens/Home';
import ScanScreen from '../screens/Scan';
import ScanAreaScreen from '../screens/Scan/view';
import LoginScreen from '../screens/Login';
import ActionsList from '../screens/Scan/partials/ActionsList';
import ControlScreen from '../screens/Control';
import RecountScreen from '../screens/Recount';
import ReviseScreen from '../screens/Revise';

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HomeStackRoute">
      <Stack.Screen 
        name="HomeStackRoute" 
        component={HomeScreen} 
        options={{ title: 'Выбор действия'}}
      />
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
      <Stack.Screen 
        name="ControlStackRoute" 
        component={ControlScreen} 
        options={{
          title: 'Контроль',
        }}  
      />
      <Stack.Screen 
        name="RecountStackRoute" 
        component={RecountScreen} 
        options={{
          title: 'Пересчет',
        }}  
      />
      <Stack.Screen 
        name="ReviseStackRoute" 
        component={ReviseScreen} 
        options={{
          title: 'Сверка',
        }}  
      />
    </Stack.Navigator>
  );
}

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

export { ScanStackNavigator, LoginStackNavigator, HomeStackNavigator };