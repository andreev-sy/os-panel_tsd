import * as React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../themes/variables';
import { GeneralStyles } from '../themes/styles';

import ControlScreen from '../screens/Control';
import RecountScreen from '../screens/Recount';
import ReviseScreen from '../screens/Revise';
import ProfileScreen from '../screens/Profile';

import { ScanStackNavigator } from './StackNavigator'

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
      <Tab.Navigator
        initialRouteName="ScanTabRoute"
        backBehavior="history"
        screenOptions={{
          tabBarInactiveTintColor: colors.SECONDARY,
          tabBarActiveTintColor: colors.PRIMARY,
          tabBarBadgeStyle: GeneralStyles.jobBadge
        }}
      >
        <Tab.Screen
          name="ScanTabRoute"
          component={ScanStackNavigator}
          options={{
            title: 'Сканирование',
            headerShown: false,
            tabBarLabel: 'Скан',
            tabBarIcon: ({ color, size }) => ( <MaterialCommunityIcons name="barcode-scan" color={color} size={size} /> ),
            tabBarBadge: 10,
          }}
        />
        <Tab.Screen
          name="ControlTabRoute"
          component={ControlScreen}
          options={{
            title: 'Контроль',
            tabBarLabel: 'Контроль',
            tabBarIcon: ({ color, size }) => ( <MaterialCommunityIcons name="check-all" color={color} size={size} /> ),
            tabBarBadge: 3,
          }}
        />
        <Tab.Screen
          name="RecountTabRoute"
          component={RecountScreen}
          options={{
            title: 'Пересчет',
            tabBarLabel: 'Пересчет',
            tabBarIcon: ({ color, size }) => ( <MaterialCommunityIcons name="calculator-variant-outline" color={color} size={size} /> ),
            tabBarBadge: 2,
          }}
        />
        <Tab.Screen
          name="ReviseTabRoute"
          component={ReviseScreen}
          options={{
            title: 'Сверка',
            tabBarLabel: 'Сверка',
            tabBarIcon: ({ color, size }) => ( <MaterialCommunityIcons name="collapse-all-outline" color={color} size={size} /> ),
            tabBarBadge: 10,
          }}
        />
        <Tab.Screen
          name="ProfileTabRoute"
          component={ProfileScreen}
          options={{
            title: 'Профиль',
            tabBarLabel: 'Профиль',
            tabBarIcon: ({ color, size }) => ( <MaterialCommunityIcons name="account-circle-outline" color={color} size={size} /> ),
          }}  
        />
       
      </Tab.Navigator>
  );
}

export default BottomTabNavigator;