import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import HeaderBack from '../components/HeaderBack';
import HeaderHome from '../screens/Home/partials/HeaderHome';
import HomeScreen from '../screens/Home';
import ScanMainScreen from '../screens/Scan/view-main';
import ScanScreen from '../screens/Scan';
import ScanAreaScreen from '../screens/Scan/view';
import LoginScreen from '../screens/Login';
import ControlMainScreen from '../screens/Control/index-main';
import ControlScreen from '../screens/Control';
import RecountScreen from '../screens/Recount';
import ReviseScreen from '../screens/Revise';
import ReviseAreaScreen from '../screens/Revise/view';
import ProfileScreen from '../screens/Profile';
import NotificationScreen from '../screens/Notification';
import SplashScreen from '../screens/Splash';

import ActionScanMain from '../screens/Scan/partials/ActionScanMain';
import ActionScan from '../screens/Scan/partials/ActionScan';
import ActionRevise from '../screens/Revise/partials/ActionRevise';
import ActionNotification from '../screens/Notification/partials/ActionNotification';
import { colors, sizes } from '../themes/variables';

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HomeStackRoute">
      <Stack.Screen
        name="HomeStackRoute"
        component={HomeScreen}
        options={({ navigation, route }) => ({
          title: 'Выбор действия',
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerRight: () => <HeaderHome navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="ScanStackRoute"
        component={ScanScreen}
        options={({ navigation, route }) => ({
          title: 'Скан',
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => <HeaderBack navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="ScanAreaStackRoute"
        component={ScanAreaScreen}
        options={({ navigation, route }) => ({
          title: `Скан: ${route.params?.headerTitle}`,
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => <HeaderBack navigation={navigation} />,
          headerRight: () => <ActionScan navigation={navigation}  area={route.params?.area} />,
        })}
      />
      <Stack.Screen
        name="ScanMainStackRoute"
        component={ScanMainScreen}
        options={({ navigation, route }) => ({
          title: `Скан: ${route.params?.headerTitle}`,
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => <HeaderBack navigation={navigation} />,
          headerRight: () => <ActionScanMain navigation={navigation}  area={route.params?.area} />,
        })}
      />
      <Stack.Screen
        name="ControlStackRoute"
        component={ControlScreen}
        options={({ navigation, route }) => ({
          title: 'Контроль',
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => <HeaderBack navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="ControlMainStackRoute"
        component={ControlMainScreen}
        options={({ navigation, route }) => ({
          title: 'Контроль',
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => <HeaderBack navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="RecountStackRoute"
        component={RecountScreen}
        options={({ navigation, route }) => ({
          title: 'Пересчёт',
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => <HeaderBack navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="ReviseStackRoute"
        component={ReviseScreen}
        options={({ navigation, route }) => ({
          title: 'Сверка',
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => <HeaderBack navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="ReviseAreaStackRoute"
        component={ReviseAreaScreen}
        options={({ navigation, route }) => ({
          title: `Сверка: ${route.params?.headerTitle}`,
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => <HeaderBack navigation={navigation} />,
          headerRight: () => <ActionRevise navigation={navigation} area={route.params?.area} />,
        })}
      />
      <Stack.Screen
        name="ProfileStackRoute"
        component={ProfileScreen}
        options={({ navigation, route }) => ({
          title: 'Профиль',
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => <HeaderBack navigation={navigation} />
        })}
      />
      <Stack.Screen
        name="NotificationStackRoute"
        component={NotificationScreen}
        options={({ navigation, route }) => ({
          title: 'Уведомления',
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => <HeaderBack navigation={navigation} />,
          headerRight: () => <ActionNotification />,
        })}
      />
    </Stack.Navigator>
  );
}

const LoginStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginStackRoute"
        component={LoginScreen}
        options={() => ({
          title: 'Авторизация',
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
        })}
      />
    </Stack.Navigator>
  );
}

const SplashStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashStackRoute"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.WHITE,
    shadowColor: colors.BLACK,
    shadowOffset: { width: 0, height: 3, },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  headerTitle: { color: colors.BLACK, fontSize: sizes.h4, width: 220 },
});

export { SplashStackNavigator, LoginStackNavigator, HomeStackNavigator };