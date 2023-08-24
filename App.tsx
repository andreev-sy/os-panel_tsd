import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from './themes/variables';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import TabBar from './src/TabBar';
import ScanScreen from './screens/ScanScreen';
import ControlScreen from './screens/ControlScreen';
import RecountScreen from './screens/RecountScreen';
import ReviseScreen from './screens/ReviseScreen';
import ProfileScreen from './screens/ProfileScreen';
import NotificationScreen from './screens/NotificationScreen';
import ScanAreaScreen from './screens/ScanAreaScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      // tabBar={(props) => <TabBar {...props} />}
        initialRouteName="Сканирование"
        backBehavior="history"
        screenOptions={{
          tabBarInactiveTintColor: colors.SECONDARY,
          tabBarActiveTintColor: colors.PRIMARY,
          tabBarBadgeStyle: {
            backgroundColor: colors.RED,
            fontSize: 10,
            lineHeight: 20
          }
        }}
      >
        <Tab.Screen
          name="Сканирование"
          component={ScanScreen}
          options={{
            tabBarLabel: 'Скан',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="barcode-scan" color={color} size={size} />
            ),
            tabBarBadge: 10,
          }}
        />
        <Tab.Screen
          name="Контроль"
          component={ControlScreen}
          options={{
            tabBarLabel: 'Контроль',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="check-all" color={color} size={size} />
            ),
            tabBarBadge: 3,
          }}
        />
        <Tab.Screen
          name="Пересчет"
          component={RecountScreen}
          options={{
            tabBarLabel: 'Пересчет',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="calculator-variant-outline" color={color} size={size} />
            ),
            tabBarBadge: 2,
          }}
        />
        <Tab.Screen
          name="Сверка"
          component={ReviseScreen}
          options={{
            tabBarLabel: 'Сверка',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="collapse-all-outline" color={color} size={size} />
            ),
            tabBarBadge: 10,
          }}
        />
        <Tab.Screen
          name="Профиль"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Профиль',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-circle-outline" color={color} size={size} />
            ),
          }}  
        />
       
      </Tab.Navigator>
    </NavigationContainer>
  );
}