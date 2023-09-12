import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, TextInput } from 'react-native';
import { colors } from '../../themes/variables';
import { GeneralStyles } from '../../themes/styles';

function HomeScreen({ navigation }) {
    const [modalScanVisible, setModalScanVisible] = useState(false);
    const [modalControlVisible, setModalControlVisible] = useState(false);
    const [areaScan, setAreaScan] = useState(false);
    const [areaControl, setAreaControl] = useState(false);
    const [countControl, setCountControl] = useState(false);

    const handlePressModalScan = () => {
        setModalScanVisible(!modalScanVisible);
        navigation.navigate('ScanAreaStackRoute', { headerTitle: 'Зона ' + areaScan })
    }

    const handlePressModalControl = () => {
        setModalControlVisible(!modalControlVisible);
    }

    const handlePressScanJob = () => navigation.navigate('ScanStackRoute')
    const handlePressControlJob = () => navigation.navigate('ControlStackRoute')
    const handlePressRecountJob = () => navigation.navigate('RecountStackRoute')
    const handlePressReviseJob = () => navigation.navigate('ReviseStackRoute')

    return (
        <View style={styles.wrap}>
            <View style={styles.top}>
                <TouchableOpacity
                    style={styles.btnScan}
                    activeOpacity={0.8}
                    accessibilityRole="button"
                    onPress={() => setModalScanVisible(true)}
                >
                    <Text style={styles.btnText}>Скан</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btnControl}
                    activeOpacity={0.8}
                    accessibilityRole="button"
                    onPress={() => setModalControlVisible(true)}
                >
                    <Text style={styles.btnText}>Контроль</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bot}>
                <Text style={styles.botTitle}>Задания</Text>
                <View style={styles.job}>
                    <TouchableOpacity
                        style={styles.jobBtn}
                        activeOpacity={0.8}
                        accessibilityRole="button"
                        onPress={handlePressScanJob}
                    >
                        <Text style={styles.jobText}>Скан</Text>
                    </TouchableOpacity>
                    <Text style={styles.jobCount}>3</Text>
                </View>
                <View style={styles.job}>
                    <TouchableOpacity
                        style={styles.jobBtn}
                        activeOpacity={0.8}
                        accessibilityRole="button"
                        onPress={handlePressControlJob}
                    >
                        <Text style={styles.jobText}>Контроль</Text>
                    </TouchableOpacity>
                    <Text style={styles.jobCount}>5</Text>
                </View>
                <View style={styles.job}>
                    <TouchableOpacity
                        style={styles.jobBtn}
                        activeOpacity={0.8}
                        accessibilityRole="button"
                        onPress={handlePressRecountJob}
                    >
                        <Text style={styles.jobText}>Пересчет</Text>
                    </TouchableOpacity>
                    <Text style={styles.jobCount}>1</Text>
                </View>
                <View style={styles.job}>
                    <TouchableOpacity
                        style={styles.jobBtn}
                        activeOpacity={0.8}
                        accessibilityRole="button"
                        onPress={handlePressReviseJob}
                    >
                        <Text style={styles.jobText}>Сверка</Text>
                    </TouchableOpacity>
                    <Text style={styles.jobCount}>1</Text>
                </View>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalScanVisible}
            >
                <View style={GeneralStyles.modalWrap}>
                    <View style={GeneralStyles.modalInner}>
                        <TextInput
                            style={GeneralStyles.modalInput}
                            placeholder="Штрихкод"
                            onChangeText={setAreaScan}
                        />
                        <TouchableOpacity
                            disabled={ !areaScan ? true : false }
                            style={GeneralStyles.modalBtn}
                            activeOpacity={0.5}
                            accessibilityRole="button"
                            onPress={handlePressModalScan}
                        >
                            <Text style={GeneralStyles.modalBtnTxt}>Войти в зону</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            accessibilityRole="button"
                            onPress={() => setModalScanVisible(!modalScanVisible)}
                        >
                            <Text style={GeneralStyles.modalClose}>Закрыть</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalControlVisible}
            >
                <View style={GeneralStyles.modalWrap}>
                    <View style={GeneralStyles.modalInner}>
                        <TextInput
                            style={GeneralStyles.modalInput}
                            placeholder="Штрихкод"
                            onChangeText={setAreaControl}
                        />
                        <TextInput
                            style={GeneralStyles.modalInput}
                            placeholder="Контроль"
                            onChangeText={setCountControl}
                        />
                        <TouchableOpacity
                            disabled={ (areaControl && countControl) ? false : true }
                            style={GeneralStyles.modalBtn}
                            activeOpacity={0.5}
                            accessibilityRole="button"
                            onPress={handlePressModalControl}
                        >
                            <Text style={GeneralStyles.modalBtnTxt}>Сохранить</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            accessibilityRole="button"
                            onPress={() => setModalControlVisible(!modalControlVisible)}
                        >
                            <Text style={GeneralStyles.modalClose}>Закрыть</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    wrap: {
        padding: 10,
        flex: 1,
        flexDirection: 'column',
    },
    top: {
        gap: 10,
        marginBottom: 4,
    },
    bot: {
        marginVertical: 20,
        padding: 10,
        flexShrink: 1,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: colors.GRAY_500,
        gap: 8
    },
    botTitle: {
        fontSize: 16,
        marginBottom: 5,
        color: colors.BLACK,
    },
    job: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    jobBtn: {
        width: 200,
        backgroundColor: colors.PRIMARY,
        height: 35,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    jobText: {
        textAlign: 'center',
        color: colors.WHITE
    },
    jobCount: {
        color: colors.DANGER,
        fontSize: 16
    },
    btnText: {
        color: colors.WHITE,
        fontSize: 16
    },
    btnScan: {
        backgroundColor: colors.SUCCESS,
        height: 40,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnControl: {
        backgroundColor: colors.SUCCESS,
        height: 40,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
})