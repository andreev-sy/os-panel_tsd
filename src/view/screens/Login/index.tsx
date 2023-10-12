import React, { useState, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import { colors, constant, sizes } from '../../themes/variables';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../../../context/AuthContext';

function LoginScreen() {
    const { isLoading, login } = useContext(AuthContext);

    const [baseUrl, setBaseUrl] = useState('135.181.78.213:1333');
    const [username, setUsername] = useState('api');
    const [password, setPassword] = useState('api');


    const handlePressLogin = () => {
        login(username, password, baseUrl)
    }

    return (
        <View style={styles.wrapper}>
            <ScrollView contentContainerStyle={styles.inner}>
                <Spinner visible={isLoading} />
                <TextInput
                    style={styles.input}
                    placeholder="Адрес API"
                    value={baseUrl}
                    onChangeText={setBaseUrl}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Логин"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Пароль"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
                <TouchableOpacity
                    style={styles.btn}
                    activeOpacity={constant.activeOpacity}
                    accessibilityRole="button"
                    onPress={handlePressLogin}
                >
                    <Text style={styles.btnText}>Войти</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};


export const styles = StyleSheet.create({
    input: {
        height: 50,
        paddingHorizontal: 10,
        fontSize: sizes.body3,
        backgroundColor: colors.WHITE,
        color: colors.GRAY_600,
        borderWidth: 1,
        borderColor: colors.GRAY_300,
        borderRadius: sizes.radius,
        elevation: 3,
    },
    btn: {
        height: 50,
        backgroundColor: colors.PRIMARY,
        borderRadius: sizes.radius,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    btnText: {
        color: colors.WHITE,
        fontSize: sizes.body3,
        fontWeight: '400' 
    },
    title:{
        textAlign: 'center',
        marginBottom: 30,
        fontSize: sizes.h1,
    },
    inputWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    wrapper: {
        backgroundColor: colors.BG,
        paddingVertical: sizes.padding,
        flex: 1,
        justifyContent: 'center',
    },
    inner: {
        paddingHorizontal: sizes.padding,
        flexGrow: 1, 
        justifyContent: 'center',
        gap: 10,
    },
});


export default LoginScreen;