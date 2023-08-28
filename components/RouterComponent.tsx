import React from 'react';
import LoginScreen from './../screens/LoginScreen';
import BottomTabNavigator from './../navigation/TabNavigator';
import { LoginStackNavigator } from './../navigation/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';


function RouterComponent() {

    const isAuthorized = true;

    return (
        <NavigationContainer>
            { !isAuthorized ? <LoginStackNavigator/> : <BottomTabNavigator /> }
        </NavigationContainer>
    );

}

export default RouterComponent;


