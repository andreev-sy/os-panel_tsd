import React, { useState, useContext, useRef, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, Vibration, RefreshControl, SafeAreaView, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Dialog from 'react-native-dialog';
import Snackbar from 'react-native-snackbar';
import createInstance from '../../../helpers/AxiosInstance';
import { colors, constant, sizes } from '../../themes/variables';
import { AuthContext } from '../../../context/AuthContext';
import { sounds } from '../../themes/variables';

function HomeScreen({ navigation, route }) {
    const { isLoading } = useContext(AuthContext);
    const [refreshing, setRefreshing] = useState(false);
    const [homeData, setHomeData] = useState({ 'job': 0, 'scan': 0, 'control': 0, 'recount': 0, 'revise': 0 });
    const [modalScanVisible, setModalScanVisible] = useState(false);
    const [areaScan, setAreaScan] = useState('');
    const areaScanRef = useRef(null);
    const api = createInstance();

    const handlePressScan = () => {
        setAreaScan('')
        setTimeout(() => areaScanRef?.current?.focus(), constant.refDelay)
        setModalScanVisible(!modalScanVisible)
    }

    const handlePressModalScan = async () => {
        api.get(`/scan/verify/?area_barcode=${areaScan}`)
            .then(res => {
                sounds.beep.play()
                navigation.navigate('ScanAreaStackRoute', { headerTitle: res.data.title, area: res.data, main: true })
            })
            .catch(e => {
                sounds.beep_fail.play()
                setTimeout(() => areaScanRef?.current?.focus(), constant.refDelay)
                setTimeout(() => {
                    Vibration.vibrate(constant.vibroTimeShort)
                    Snackbar.show({ text: e.message, textColor: colors.DANGER, backgroundColor: colors.LIGHT_DANGER, duration: Snackbar.LENGTH_SHORT })
                }, constant.snackbarDelay)
            });
    }

    const handlePressControl = () => navigation.navigate('ControlMainStackRoute')
    const handlePressScanJob = () => navigation.navigate('ScanStackRoute')
    const handlePressControlJob = () => navigation.navigate('ControlStackRoute')
    const handlePressRecountJob = () => navigation.navigate('RecountStackRoute')
    const handlePressReviseJob = () => navigation.navigate('ReviseStackRoute')

    const siteIndex = async (showSuccess = false) => {
        api.get(`/site/index/`)
            .then(res => {
                if (res.data) setHomeData(res.data);
                if (showSuccess)
                    setTimeout(() => {
                        Snackbar.show({ text: 'Данные обновлены', textColor: colors.SUCCESS, backgroundColor: colors.LIGHT_SUCCESS, duration: Snackbar.LENGTH_SHORT });
                    }, constant.snackbarDelay)
            })
            .catch(e => {
                setTimeout(() => {
                    Vibration.vibrate(constant.vibroTimeShort)
                    Snackbar.show({ text: e.message, textColor: colors.DANGER, backgroundColor: colors.LIGHT_DANGER, duration: Snackbar.LENGTH_SHORT })
                }, constant.snackbarDelay)
            });
    }

    const getNotifications = () => {
        // const interval = setInterval(async () => {
        //     api.get(`/notification/get-messages/`).then(res => {
        //         console.log(res.data)
        //         Snackbar.show({ text: res.data, textColor: colors.PRIMARY, backgroundColor: colors.LIGHT_PRIMARY, duration: constant.snackbarBiglong, action: { text: 'СКРЫТЬ', textColor: colors.GRAY_600 } });
        //     })
        // }, constant.notyDelay);

        // return () => clearInterval(interval);
    }


    useFocusEffect(
        useCallback(() => {
            console.log('axios useFocusEffect siteIndex');
            siteIndex()
            getNotifications()
        }, [])
    );

    useEffect(() => {
        console.log('axios useEffect siteIndex');
        siteIndex()
        if (route.params?.modal === true) {
            setModalScanVisible(route.params?.modal)
            setTimeout(() => areaScanRef?.current?.focus(), constant.refDelay)
        }
    }, [isLoading]);

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        siteIndex(true)
        setRefreshing(false)
    }, []);

    return (
        <SafeAreaView style={styles.wrapper}>
            <Spinner visible={isLoading} animation="fade" />
            <ScrollView
                contentContainerStyle={styles.inner}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <View style={styles.topWrapper}>
                    <TouchableOpacity
                        style={[styles.topBtn, styles.topBtnSuccess]}
                        activeOpacity={constant.activeOpacity}
                        accessibilityRole="button"
                        onPress={handlePressScan}
                    >
                        <Text style={[styles.topBtnText, styles.topBtnTextSuccess]}>Скан</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.topBtn, styles.topBtnPrimary]}
                        activeOpacity={constant.activeOpacity}
                        accessibilityRole="button"
                        onPress={handlePressControl}
                    >
                        <Text style={[styles.topBtnText, styles.topBtnTextPrimary]}>Контроль</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.botWrapper}>
                    <View style={styles.botTitle}>
                        <Text style={styles.botTitleText}>Задания</Text>
                        <View style={styles.botTitleBadge}>
                            <Text style={styles.botTitleBadgeText}>{homeData.job}</Text>
                        </View>
                    </View>
                    <View style={styles.botJobs}>
                        <TouchableOpacity
                            style={[styles.botJob, homeData.scan > 0 ? {} : styles.botJobDisabled]}
                            activeOpacity={constant.activeOpacity}
                            disabled={homeData.scan > 0 ? false : true}
                            accessibilityRole="button"
                            onPress={handlePressScanJob}
                        >
                            <Text style={[styles.botJobText, homeData.scan > 0 ? {} : styles.botJobTextDisabled]}>Скан</Text>
                            <Text style={[styles.botJobCount, homeData.scan > 0 ? {} : styles.botJobCountDisabled]}>{homeData.scan}</Text>
                        </TouchableOpacity>
                        <View style={styles.botHr} />
                        <TouchableOpacity
                            style={[styles.botJob, homeData.control > 0 ? {} : styles.botJobDisabled]}
                            activeOpacity={constant.activeOpacity}
                            disabled={homeData.control > 0 ? false : true}
                            accessibilityRole="button"
                            onPress={handlePressControlJob}
                        >
                            <Text style={[styles.botJobText, homeData.control > 0 ? {} : styles.botJobTextDisabled]}>Контроль</Text>
                            <Text style={[styles.botJobCount, homeData.control > 0 ? {} : styles.botJobCountDisabled]}>{homeData.control}</Text>
                        </TouchableOpacity>
                        <View style={styles.botHr} />
                        <TouchableOpacity
                            style={[styles.botJob, homeData.recount > 0 ? {} : styles.botJobDisabled]}
                            activeOpacity={constant.activeOpacity}
                            disabled={homeData.recount > 0 ? false : true}
                            accessibilityRole="button"
                            onPress={handlePressRecountJob}
                        >
                            <Text style={[styles.botJobText, homeData.recount > 0 ? {} : styles.botJobTextDisabled]}>Пересчёт</Text>
                            <Text style={[styles.botJobCount, homeData.recount > 0 ? {} : styles.botJobCountDisabled]}>{homeData.recount}</Text>
                        </TouchableOpacity>
                        <View style={styles.botHr} />
                        <TouchableOpacity
                            style={[styles.botJob, homeData.revise > 0 ? {} : styles.botJobDisabled]}
                            activeOpacity={constant.activeOpacity}
                            disabled={homeData.revise > 0 ? false : true}
                            accessibilityRole="button"
                            onPress={handlePressReviseJob}
                        >
                            <Text style={[styles.botJobText, homeData.revise > 0 ? {} : styles.botJobTextDisabled]}>Сверка</Text>
                            <Text style={[styles.botJobCount, homeData.revise > 0 ? {} : styles.botJobCountDisabled]}>{homeData.revise}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                
            </ScrollView>
            <View>
                    <Dialog.Container
                        headerStyle={styles.dialogHeader}
                        contentStyle={styles.dialogContent}
                        footerStyle={styles.dialogFooter}
                        visible={modalScanVisible}
                        onBackdropPress={() => setModalScanVisible(!modalScanVisible)}
                    >
                        <Dialog.Title style={styles.dialogTitle}>Войти в зону</Dialog.Title>
                        <View>
                            <TextInput
                                style={styles.dialogInput}
                                placeholder="Штрихкод зоны"
                                placeholderTextColor={colors.GRAY_500}
                                ref={areaScanRef}
                                selectTextOnFocus={true}
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
        </SafeAreaView>


    );
}

export const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'column',
        backgroundColor: colors.BG,
        height: '100%'
    },
    inner: { padding: sizes.padding, },
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
        borderColor: colors.GRAY_500,
        flexDirection: 'column',
        backgroundColor: colors.WHITE,
        shadowColor: colors.GRAY_500,
        shadowOffset: { width: 0, height: 2, },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
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
    botJobText: { fontSize: sizes.body3, color: colors.GRAY_900 },
    botJobCount: { color: colors.DANGER, fontSize: sizes.body2 },
    botJobTextDisabled: { color: colors.BLACK },
    botJobCountDisabled: { color: colors.GRAY_800 },

    dialogHeader: { padding: 0, margin: 0 },
    dialogContent: { borderRadius: sizes.radius, backgroundColor: colors.WHITE },
    dialogFooter: { justifyContent: 'center' },
    dialogTitle: { textAlign: 'center', fontSize: sizes.h4, fontWeight: '500', color: colors.GRAY_700, marginBottom: 15, },
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
        color: colors.GRAY_700,
        borderWidth: 1,
        borderColor: colors.GRAY_300,
        borderRadius: 7,
        elevation: 3,
        marginBottom: 12,
    },
})



export default HomeScreen;

