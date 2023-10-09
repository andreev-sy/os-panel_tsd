import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, TextInput, Button } from 'react-native';
import theme, { btns, colors } from '../../themes/variables';
import { GeneralStyles } from '../../themes/styles';
import {AuthContext} from '../../../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import Dialog from "react-native-dialog";

function HomeScreen({ navigation }) {
    const {isLoading} = useContext(AuthContext);

    const [modalScanVisible, setModalScanVisible] = useState(false);
    const [areaScan, setAreaScan] = useState(false);

    const handlePressScan = () => {
        setAreaScan(false)
        setModalScanVisible(true)
    }

    const handlePressModalScan = () => {
        setModalScanVisible(!modalScanVisible)
        navigation.navigate('ScanAreaStackRoute', { headerTitle: 'Зона ' + areaScan })
    }
    
    const handlePressControl = () => navigation.navigate('ControlStackRoute')

    const handlePressScanJob = () => navigation.navigate('ScanStackRoute')
    const handlePressControlJob = () => navigation.navigate('ControlStackRoute')
    const handlePressRecountJob = () => navigation.navigate('RecountStackRoute')
    const handlePressReviseJob = () => navigation.navigate('ReviseStackRoute')

    return (
        <View style={styles.wrapper}>
            <Spinner visible={isLoading} />
            <View style={styles.topWrapper}>
                <TouchableOpacity
                    style={styles.topBtn}
                    activeOpacity={0.8}
                    accessibilityRole="button"
                    onPress={handlePressScan}
                >
                    <Text style={styles.topBtnText}>Скан</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.topBtn}
                    activeOpacity={0.8}
                    accessibilityRole="button"
                    onPress={handlePressControl}
                >
                    <Text style={styles.topBtnText}>Контроль</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.botWrapper}>
                <Text style={styles.botTitle}>Задания</Text>
                <View style={styles.botJob}>
                    <TouchableOpacity
                        style={styles.botJobBtn}
                        activeOpacity={0.8}
                        accessibilityRole="button"
                        onPress={handlePressScanJob}
                    >
                        <Text style={styles.botJobBtnText}>Скан</Text>
                    </TouchableOpacity>
                    <Text style={styles.botJobCount}>3</Text>
                </View>
                <View style={styles.botJob}>
                    <TouchableOpacity
                        style={styles.botJobBtn}
                        activeOpacity={0.8}
                        accessibilityRole="button"
                        onPress={handlePressControlJob}
                    >
                        <Text style={styles.botJobBtnText}>Контроль</Text>
                    </TouchableOpacity>
                    <Text style={styles.botJobCount}>5</Text>
                </View>
                <View style={styles.botJob}>
                    <TouchableOpacity
                        style={styles.botJobBtn}
                        activeOpacity={0.8}
                        accessibilityRole="button"
                        onPress={handlePressRecountJob}
                    >
                        <Text style={styles.botJobBtnText}>Пересчет</Text>
                    </TouchableOpacity>
                    <Text style={styles.botJobCount}>1</Text>
                </View>
                <View style={styles.botJob}>
                    <TouchableOpacity
                        style={styles.botJobBtn}
                        activeOpacity={0.8}
                        accessibilityRole="button"
                        onPress={handlePressReviseJob}
                    >
                        <Text style={styles.botJobBtnText}>Сверка</Text>
                    </TouchableOpacity>
                    <Text style={styles.botJobCount}>1</Text>
                </View>
            </View>

            {/* <View>
                <Dialog.Container 
                    headerStyle={{ height: 0, padding: 0, margin: 0 }}  
                    contentStyle={{ borderRadius: theme.sizes.radius }}
                    footerStyle={{ justifyContent: 'center' }} 
                    visible={modalScanVisible} 
                    onBackdropPress={() => setModalScanVisible(!modalScanVisible)}
                >                    
                    <View>
                        <Dialog.Button label="Обнулить" style={theme.fonts.body3} />
                        <Dialog.Button label="Закончить сканирование" style={theme.fonts.body3} />
                    </View>
                        
                    <Dialog.Button label="Закрыть" style={theme.fonts.body5} />
                </Dialog.Container>
            </View> */}

            <View>
                <Dialog.Container 
                    headerStyle={{ height: 0, padding: 0, margin: 0 }}  
                    contentStyle={{ borderRadius: theme.sizes.radius }}
                    footerStyle={{ justifyContent: 'center' }} 
                    visible={modalScanVisible} 
                    onBackdropPress={() => setModalScanVisible(!modalScanVisible)}
                >
                    <View>
                        <Dialog.Input 
                            label="Штрихкод зоны" 
                            autoFocus={true} 
                            onChange={setAreaScan}
                        />
                        <Dialog.Button label="Войти" style={{...theme.btns.primary, ...theme.btns_text.md, width: '100%'}}  onPress={handlePressModalScan} />
                    </View>
                    
                    <Dialog.Button label="Закрыть" style={theme.fonts.body5} onPress={() => setModalScanVisible(!modalScanVisible)} />

                </Dialog.Container>
            </View>

            {/* <Modal
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
                            autoFocus={true}
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
            </Modal> */}

        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.GRAY_200
    },
    topWrapper: {
        gap: 10,
        marginBottom: 35,
    },
    topBtn: {
        backgroundColor: colors.SUCCESS,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: colors.SUCCESS,
        height: 50,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    topBtnText: {
        color: colors.WHITE,
        fontSize: 16
    },
    botWrapper: {
        padding: 10,
        paddingTop: 20,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: colors.GRAY_500,
        gap: 8
    },
    botTitle: {
        fontSize: 16,
        marginBottom: 5,
        color: colors.BLACK,
        backgroundColor: colors.GRAY_200,
        fontSize: 16,
        paddingHorizontal: 10,
        position: 'absolute',
        top: -14,
        left: 10
    },
    botJob: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    botJobBtn: {
        width: 200,
        backgroundColor: colors.PRIMARY,
        height: 38,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    botJobBtnText: {
        textAlign: 'center',
        color: colors.WHITE
    },
    botJobCount: {
        color: colors.DANGER,
        fontSize: 16
    },  
})