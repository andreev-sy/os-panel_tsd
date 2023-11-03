import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, TouchableOpacity, StyleSheet, Alert, Vibration } from 'react-native';
import { colors, constant, sizes } from '../../../themes/variables';
import Dialog from 'react-native-dialog';
import createInstance from '../../../../helpers/AxiosInstance';
import Snackbar from 'react-native-snackbar';

const ActionScan = ({ navigation, area, main }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const api = createInstance();

    const handleFinishPress = () => {
        Alert.alert('', 'Вы точно хотите завершить сканирование?', [
            { text: 'Отмена' }, { text: 'Да', onPress: () => finish() },
        ])
    };

    const handleNullPress = () => {
        Alert.alert('', 'Вы точно хотите обнулить зону?', [
            { text: 'Отмена' }, { text: 'Да', onPress: () => nullable() },
        ])
    };

    const nullable = () => {
        api.post(`/scan/nullable/`, { 'area': area.id })
            .then(res => {
                setModalVisible(!modalVisible)
                navigation.replace('ScanAreaStackRoute', { headerTitle: area.title, area: area, main: main });
                setTimeout(() => {
                    Snackbar.show({ text: 'Зона успешно обнулена', textColor: colors.SUCCESS, backgroundColor: colors.LIGHT_SUCCESS, duration: Snackbar.LENGTH_SHORT, });
                }, constant.snackbarDelay)
            })
            .catch(e => {
                setTimeout(() => {
                    Vibration.vibrate(constant.vibroTimeShort)
                    Snackbar.show({ text: e.message, textColor: colors.DANGER, backgroundColor: colors.LIGHT_DANGER, duration: Snackbar.LENGTH_SHORT })
                }, constant.snackbarDelay)
            });
    }

    const finish = () => {
        api.post(`/scan/finish/`, { 'area': area.id })
            .then(res => {
                setModalVisible(!modalVisible)
                navigation.goBack()
                setTimeout(() => {
                    Snackbar.show({ text: 'Скан в зоне успешно завершён', textColor: colors.SUCCESS, backgroundColor: colors.LIGHT_SUCCESS, duration: Snackbar.LENGTH_SHORT, });
                }, constant.snackbarDelay)
            })
            .catch(e => {
                setTimeout(() => {
                    Vibration.vibrate(constant.vibroTimeShort)
                    Snackbar.show({ text: e.message, textColor: colors.DANGER, backgroundColor: colors.LIGHT_DANGER, duration: Snackbar.LENGTH_SHORT })
                }, constant.snackbarDelay)
            });
    }

    return (
        <View>
            <TouchableOpacity
                style={styles.actionDots}
                activeOpacity={constant.activeOpacity}
                accessibilityRole="button"
                onPress={() => setModalVisible(true)}
            >
                <MaterialCommunityIcons name="dots-vertical" color={colors.BLACK} size={28} />
            </TouchableOpacity>

            <View>
                <Dialog.Container
                    headerStyle={styles.dialogHeader}
                    contentStyle={styles.dialogContent}
                    footerStyle={styles.dialogFooter}
                    visible={modalVisible}
                    onBackdropPress={() => setModalVisible(!modalVisible)}
                >
                    <View>
                        <Dialog.Button
                            label="Обнулить"
                            style={styles.dialogBtn}
                            onPress={handleNullPress}
                        />
                        {
                            !main ?
                                <Dialog.Button
                                    label="Завершить сканирование"
                                    style={styles.dialogBtn}
                                    onPress={handleFinishPress}
                                />
                            : ''
                        }
                    </View>
                    <Dialog.Button
                        label="Закрыть"
                        style={styles.dialogClose}
                        onPress={() => setModalVisible(!modalVisible)}
                    />
                </Dialog.Container>
            </View>
        </View>
    );
};

export const styles = StyleSheet.create({
    actionDots: { marginRight: 3 },

    dialogHeader: { padding: 0, margin: 0 },
    dialogContent: { borderRadius: sizes.radius, backgroundColor: colors.WHITE },
    dialogFooter: { justifyContent: 'center' },
    dialogTitle: { textAlign: 'center', fontSize: sizes.h4, fontWeight: '500', color: colors.GRAY_700, marginBottom: 10, },
    dialogBtn: { fontSize: sizes.body3, color: colors.BLACK, textTransform: 'none' },
    dialogBtnFill: { height: 50, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.PRIMARY, borderRadius: sizes.radius, },
    dialogBtnFillText: { color: colors.WHITE, fontSize: sizes.body3, fontWeight: '400' },
    dialogClose: { fontSize: sizes.body4, color: colors.SECONDARY, textTransform: 'none' },
});

export default ActionScan;