import React, { useContext } from 'react';
import { SplashStackNavigator, LoginStackNavigator, HomeStackNavigator } from '../navigation/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import {AuthContext} from '../../context/AuthContext';

function RouterComponent() {
    const {userInfo, splashLoading} = useContext(AuthContext);
 
    return (
        <NavigationContainer>
            { splashLoading ? (
                <SplashStackNavigator/>
            ) : userInfo.access_token ? (
                <HomeStackNavigator />
            ) : (
                <LoginStackNavigator/>
            )}
        </NavigationContainer>
    );

}

export default RouterComponent;


