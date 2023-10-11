import React, { useState, useContext, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet,TextInput } from 'react-native';
import { colors, constant, sizes } from '../../themes/variables';
import { GeneralStyles } from '../../themes/styles';
import { AuthContext } from '../../../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import Dialog from "react-native-dialog";
import axios from 'axios';

function HomeScreen({ navigation }) {
    const { isLoading, baseUrl, userInfo  } = useContext(AuthContext);
    const [modalScanVisible, setModalScanVisible] = useState(false);
    const [areaScan, setAreaScan] = useState(false);
    const areaScanRef = useRef(null);

    console.log('render HomeScreen')

    const handlePressScan = () => {
        setAreaScan(false)
        setModalScanVisible(true)
        // areaScanRef.current.focus();
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



    // axios.get(`http://${baseUrl}/api/site/index/`, { headers: { Authorization: `Bearer ${userInfo.access_token}` } })
    //     .then(res => {
    //         let data = res.data;
    //         console.log(data)
    //     })
    //     .catch(e => { 
    //         console.log(`login error ${e}`);  
    //     });


    return (
        <View style={styles.wrapper}>
            <Spinner visible={isLoading} />
            <View style={styles.topWrapper}>
                <TouchableOpacity
                    style={[ styles.topBtn, styles.topBtnSuccess ]}
                    activeOpacity={0.8}
                    accessibilityRole="button"
                    onPress={handlePressScan}
                >
                    <Text style={[ styles.topBtnText, styles.topBtnTextSuccess ]}>Скан</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[ styles.topBtn, styles.topBtnPrimary ]}
                    activeOpacity={0.8}
                    accessibilityRole="button"
                    onPress={handlePressControl}
                >
                    <Text style={[ styles.topBtnText, styles.topBtnTextPrimary ]}>Контроль</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.botWrapper}>
                <View style={styles.botTitle}>
                    <Text style={styles.botTitleText}>Задания</Text>
                    <View style={styles.botTitleBadge}>
                        <Text style={styles.botTitleBadgeText}>10</Text>
                    </View>
                </View>
                <View style={styles.botJobs}>
                    <TouchableOpacity
                        style={[ styles.botJob, styles.botJobDisabled ]}
                        activeOpacity={0.8}
                        // disabled={true}
                        accessibilityRole="button"
                        onPress={handlePressScanJob}
                    >
                        <Text style={[ styles.botJobText, styles.botJobTextDisabled ]}>Скан</Text>
                        <Text style={[ styles.botJobCount, styles.botJobCountDisabled ]}>0</Text>
                    </TouchableOpacity>
                    <View style={styles.botHr} />
                    <TouchableOpacity
                        style={styles.botJob}
                        activeOpacity={0.8}
                        accessibilityRole="button"
                        onPress={handlePressControlJob}
                    >
                        <Text style={styles.botJobText}>Контроль</Text>
                        <Text style={styles.botJobCount}>5</Text>
                    </TouchableOpacity>
                    <View style={styles.botHr} />
                    <TouchableOpacity
                        style={styles.botJob}
                        activeOpacity={0.8}
                        accessibilityRole="button"
                        onPress={handlePressRecountJob}
                    >
                        <Text style={styles.botJobText}>Пересчет</Text>
                        <Text style={styles.botJobCount}>1</Text>
                    </TouchableOpacity>
                    <View style={styles.botHr} />
                    <TouchableOpacity
                        style={styles.botJob}
                        activeOpacity={0.8}
                        accessibilityRole="button"
                        onPress={handlePressReviseJob}
                    >
                        <Text style={styles.botJobText}>Сверка</Text>
                        <Text style={styles.botJobCount}>1</Text>
                    </TouchableOpacity>
                </View>


            </View>

            <View>
                <Dialog.Container
                    headerStyle={styles.dialogHeader}
                    contentStyle={styles.dialogContent}
                    footerStyle={styles.dialogFooter}
                    visible={modalScanVisible}
                    onBackdropPress={() => setModalScanVisible(!modalScanVisible)}
                >
                    <View>
                        <TextInput
                            style={styles.dialogInput}
                            placeholder="Штрихкод зоны"
                            // ref={areaScanRef}
                            autoFocus={true}
                            autoCorrect={false}
                            onChangeText={setAreaScan}
                            onSubmitEditing={handlePressModalScan}
                        />

                        <TouchableOpacity
                            style={styles.dialogBtnFill}
                            activeOpacity={constant.activeOpacity}
                            accessibilityRole="button"
                            onPress={handlePressModalScan}
                        >
                            <Text style={styles.dialogBtnFillText}>Войти</Text>
                        </TouchableOpacity>
                        
                    </View>

                    <Dialog.Button label="Закрыть" style={styles.dialogClose} onPress={() => setModalScanVisible(!modalScanVisible)} />
                </Dialog.Container>
            </View>

        </View>
    );
}

export const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'column',
        padding: sizes.padding,
        backgroundColor: colors.BG
    },
    topWrapper: {
        paddingVertical: 8,
        marginBottom: 2,
        gap: 8,
    },
    topBtn: {
        borderStyle: 'solid',
        borderWidth: 1,
        height: 50,
        borderRadius: sizes.radius,
        alignItems: 'center',
        justifyContent: 'center',
    },
    topBtnText: { fontSize: sizes.body3, fontWeight: '500' },
    topBtnPrimary: { backgroundColor: colors.LIGHT_PRIMARY, borderColor: colors.PRIMARY },
    topBtnTextPrimary: { color: colors.PRIMARY },
    topBtnSuccess: { backgroundColor: colors.LIGHT_SUCCESS, borderColor: colors.SUCCESS },
    topBtnTextSuccess: { color: colors.SUCCESS },
    botWrapper: {
        paddingVertical: 8,
        marginBottom: 2,
        gap: 6
    },
    botTitle: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    botTitleText: {
        color: colors.PRIMARY,
        fontWeight: '400',
        fontSize: sizes.h4,
    },
    botTitleBadge: {
        backgroundColor: colors.PRIMARY,
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    botTitleBadgeText: {
        color: colors.WHITE,
        fontWeight: '500',
        fontSize: sizes.h5,
    },
    botJobs: {
        borderRadius: sizes.radius,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: colors.GRAY_500,
        flexDirection: 'column',
        backgroundColor: colors.WHITE
    },
    botHr: {
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: colors.GRAY_500,
    },
    botJob: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    botJobDisabled: { opacity: 0.6, backgroundColor: colors.GRAY_200 },
    botJobText: { fontSize: sizes.body3,  color: colors.GRAY_900 },
    botJobCount: { color: colors.DANGER, fontSize: sizes.body2 },  
    botJobTextDisabled: {  color: colors.BLACK },
    botJobCountDisabled: { color: colors.GRAY_800 },  

    dialogHeader: { height: 0, padding: 0, margin: 0 },
    dialogContent: { borderRadius: sizes.radius },
    dialogFooter: { justifyContent: 'center' },
    dialogTitle: { textAlign: 'center', fontSize: sizes.h4, fontWeight: '500', color: colors.GRAY_700 },
    dialogBtn: { fontSize: sizes.body3, color: colors.BLACK, textTransform: 'none' },
    dialogBtnFill: { height: 50, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.PRIMARY, borderRadius: sizes.radius, },
    dialogBtnFillText: { color: colors.WHITE, fontSize: sizes.body3, fontWeight: '400' },
    dialogClose: { fontSize: sizes.body4, color: colors.SECONDARY, textTransform: 'none' },
    dialogInput: { 
        flexBasis: 55,
        paddingHorizontal: 10,
        width: '100%',
        fontSize: sizes.body3,
        backgroundColor: colors.WHITE,
        color: colors.GRAY_600,
        borderWidth: 1,
        borderColor: colors.GRAY_300,
        borderRadius: 7,
        elevation: 3,
        marginBottom: 12,
    },
})



export default HomeScreen;

