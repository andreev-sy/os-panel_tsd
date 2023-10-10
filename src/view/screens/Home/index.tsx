import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, TextInput, Button } from 'react-native';
import { colors, sizes } from '../../themes/variables';
import { GeneralStyles } from '../../themes/styles';
import { styles } from './styles';
import { AuthContext } from '../../../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import Dialog from "react-native-dialog";
import axios from 'axios';

function HomeScreen({ navigation }) {
    const { isLoading, baseUrl, userInfo  } = useContext(AuthContext);
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
                        disabled={true}
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
                    headerStyle={{ height: 0, padding: 0, margin: 0 }}
                    contentStyle={{ borderRadius: sizes.radius }}
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
                        <Dialog.Button label="Войти" onPress={handlePressModalScan} />
                    </View>

                    <Dialog.Button label="Закрыть" onPress={() => setModalScanVisible(!modalScanVisible)} />

                </Dialog.Container>
            </View>

        </View>
    );
}

export default HomeScreen;

