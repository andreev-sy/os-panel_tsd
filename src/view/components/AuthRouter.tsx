import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SplashStackNavigator, LoginStackNavigator, HomeStackNavigator } from '../navigation/StackNavigator';
import {AuthContext} from '../../context/AuthContext';


function AuthRouter() {
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

export default AuthRouter;


