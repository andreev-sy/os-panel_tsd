import React, { useState, useContext } from 'react';
import { View, TextInput, Button } from 'react-native';
import { LoginStyles } from '../../themes/styles';
import { colors } from '../../themes/variables';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../../../context/AuthContext';

function LoginScreen() {
    const {isLoading, login} = useContext(AuthContext);

    const [baseUrl, setBaseUrl] = useState('135.181.78.213:1333');
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('');


    const handlePressLogin = () => {
        login(username, password, baseUrl)
    }

    return (
        <View style={LoginStyles.wrapper}>
            <Spinner visible={isLoading} />
            <TextInput
                style={LoginStyles.input}
                placeholder="Адрес API"
                value={baseUrl}
                onChangeText={setBaseUrl}
            />
            <TextInput
                style={LoginStyles.input}
                placeholder="Логин"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={LoginStyles.input}
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />
            <Button color={colors.PRIMARY} title="Войти" onPress={handlePressLogin} />
        </View>
    );
};

export default LoginScreen;