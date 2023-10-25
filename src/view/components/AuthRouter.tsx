import React, { useContext } from 'react';
import { SplashStackNavigator, LoginStackNavigator, HomeStackNavigator } from '../navigation/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import {AuthContext} from '../../context/AuthContext';


function AuthRouter() {
    const {userInfo, splashLoading, baseUrl} = useContext(AuthContext);

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

export default AuthRouter;


