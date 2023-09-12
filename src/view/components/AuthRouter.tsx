import React from 'react';
import BottomTabNavigator from '../navigation/TabNavigator';
import { LoginStackNavigator, HomeStackNavigator } from '../navigation/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';


function RouterComponent() {

    const isAuthorized = true;

    return (
        <NavigationContainer>
            { !isAuthorized ? <LoginStackNavigator/> : <HomeStackNavigator /> }
        </NavigationContainer>
    );

}

export default RouterComponent;


