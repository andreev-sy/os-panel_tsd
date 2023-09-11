import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { LoginStyles } from '../../themes/styles';
import { colors } from '../../themes/variables';

const LoginScreen = () => {
    const [apiUrl, setApiUrl] = useState('135.181.78.213:1333');
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('admin');
    // `http://${apiUrl}/api/auth/login/`

    const handleAuth = async () => {

    };

    return (
        <View style={LoginStyles.wrapper}>
            <TextInput
                style={LoginStyles.input}
                placeholder="Адрес API"
                value={apiUrl}
                onChangeText={setApiUrl}
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
            <Button color={colors.PRIMARY} title="Войти" onPress={handleAuth} />
        </View>
    );
};

export default LoginScreen;