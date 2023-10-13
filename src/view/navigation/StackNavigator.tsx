import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, StyleSheet } from 'react-native';

import Title from '../components/Title';
import HeaderBack from '../components/HeaderBack';
import HeaderHome from '../components/HeaderHome';
import HomeScreen from '../screens/Home';
import ScanScreen from '../screens/Scan';
import ScanAreaScreen from '../screens/Scan/view';
import LoginScreen from '../screens/Login';
import ControlScreen from '../screens/Control';
import RecountScreen from '../screens/Recount';
import ReviseScreen from '../screens/Revise';
import ReviseAreaScreen from '../screens/Revise/view';
import ProfileScreen from '../screens/Profile';
import NotificationScreen from '../screens/Notification';
import SplashScreen from '../screens/Splash';

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
        options={({ navigation }) => ({
          title: 'Выбор действия',
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerRight: () => <HeaderHome navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="ScanStackRoute"
        component={ScanScreen}
        options={({ navigation }) => ({
          title: 'Скан',
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => <HeaderBack navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="ScanAreaStackRoute"
        component={ScanAreaScreen}
        // options={({ route }) => ({ title: route.params.headerTitle })}
        options={({ navigation, route }) => ({
          // headerTitle: (props) => <Title {...props} />,
          title: 'Скан: ' + route.params.headerTitle,
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => <HeaderBack navigation={navigation} />,
          headerRight: () => <ActionScan navigation={navigation} route={route} />,
        })}
      />
      <Stack.Screen
        name="ControlStackRoute"
        component={ControlScreen}
        options={({ navigation, route }) => ({
          // headerTitle: (props) => <Title {...props} />,
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
          // headerTitle: (props) => <Title {...props} />,
          title: 'Пересчет',
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => <HeaderBack navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="ReviseStackRoute"
        component={ReviseScreen}
        options={({ navigation, route }) => ({
          // headerTitle: (props) => <Title {...props} />,
          title: 'Сверка',
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => <HeaderBack navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="ReviseAreaStackRoute"
        component={ReviseAreaScreen}
        // options={({ route }) => ({ title: route.params.headerTitle })}
        options={({ navigation, route }) => ({
          // headerTitle: (props) => <Title {...props} />,
          title: 'Сверка: ' + route.params.headerTitle,
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => <HeaderBack navigation={navigation} />,
          headerRight: () => <ActionRevise onNullEvent={route.params.onNullEvent} onFinishEvent={route.params.onFinishEvent} />,
        })}
      />
      <Stack.Screen
        name="ProfileStackRoute"
        component={ProfileScreen}
        options={({ navigation, route }) => ({
          // headerTitle: (props) => <Title {...props} />,
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
          // headerTitle: (props) => <Title {...props} />,
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