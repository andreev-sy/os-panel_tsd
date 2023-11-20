import React, { useState, useContext } from 'react';
import { TextInput, TouchableOpacity, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { colors, constant, sizes } from '../../themes/variables';
import { AuthContext } from '../../../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';

function LoginScreen() {
    const { isLoading, login } = useContext(AuthContext);
    const [baseUrl, setBaseUrl] = useState('135.181.78.213:1333');
    const [username, setUsername] = useState('002');
    const [password, setPassword] = useState('test1');

    return (
        <SafeAreaView style={styles.wrapper}>
            <Spinner visible={isLoading} animation="fade" />
            <ScrollView contentContainerStyle={styles.inner}>
                <Text style={styles.label}>Адрес API</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Адрес API"
                    placeholderTextColor={colors.GRAY_500}
                    value={baseUrl}
                    onChangeText={setBaseUrl}
                />
                <Text style={styles.label}>Логин</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Логин"
                    placeholderTextColor={colors.GRAY_500}
                    value={username}
                    onChangeText={setUsername}
                />
                <Text style={styles.label}>Пароль</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Пароль"
                    placeholderTextColor={colors.GRAY_500}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
                <TouchableOpacity
                    style={styles.btn}
                    activeOpacity={constant.activeOpacity}
                    accessibilityRole="button"
                    disabled={ (!username || !baseUrl) ? true : false }
                    onPress={() => login(username, password, baseUrl)}
                >
                    <Text style={styles.btnText}>Войти</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};


export const styles = StyleSheet.create({
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
    },
    input: {
        height: 50,
        paddingHorizontal: 10,
        fontSize: sizes.body3,
        backgroundColor: colors.WHITE,
        color: colors.GRAY_700,
        borderWidth: 1,
        borderColor: colors.GRAY_300,
        borderRadius: sizes.radius,
        elevation: 3,
        marginBottom: 10,
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
    label: {
        fontSize: sizes.body4,
        color: colors.GRAY_600,
        marginBottom: 2,
    },
});


export default LoginScreen;