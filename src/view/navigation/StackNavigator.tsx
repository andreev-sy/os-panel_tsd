import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';

import HomeTopBtn from '../components/HomeTopBtn';
import Title from '../components/Title';
import HomeScreen from '../screens/Home';
import ScanScreen from '../screens/Scan';
import ScanAreaScreen from '../screens/Scan/view';
import LoginScreen from '../screens/Login';
import ControlScreen from '../screens/Control';
import RecountScreen from '../screens/Recount';
import ReviseScreen from '../screens/Revise';
import ProfileScreen from '../screens/Profile';
import NotificationScreen from '../screens/Notification';
import SplashScreen from '../screens/Splash';

import ActionScan from '../screens/Scan/partials/ActionScan';
import ActionNotification from '../screens/Notification/partials/ActionNotification';

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HomeStackRoute">
      <Stack.Screen 
        name="HomeStackRoute" 
        component={HomeScreen} 
        // options={{ title: 'Выбор действия'}}
        options={({ navigation }) => ({
          title: 'Выбор действия',
          headerRight: () => <HomeTopBtn navigation={navigation} />
        })}
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
          headerRight: () => <ActionScan />,
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
      <Stack.Screen 
        name="ProfileStackRoute" 
        component={ProfileScreen} 
        options={{
          title: 'Профиль',
        }}  
      />
      <Stack.Screen 
        name="NotificationStackRoute" 
        component={NotificationScreen} 
        options={({ navigation, route }) => ({
          title: 'Уведомления',
          headerRight: () => <ActionNotification />,
        })}
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

const SplashStackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen 
          name="Загрузка" 
          component={SplashScreen} 
          options={{headerShown: false}}
        />
    </Stack.Navigator>
  );
}

export { ScanStackNavigator, SplashStackNavigator, LoginStackNavigator, HomeStackNavigator };