import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { colors, constant, sizes } from '../../../themes/variables';
import Dialog from 'react-native-dialog';

const ActionScan = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleFinishPress = () => {
        Alert.alert('', 'Вы точно хотите завершить сканирование?', [
            { text: 'Отмена' }, { text: 'Да', onPress: () => { } },
        ])
    };

    const handleNullPress = () => {
        Alert.alert('', 'Вы точно хотите обнулить зону?', [
            { text: 'Отмена' }, { text: 'Да', onPress: () => { } },
        ])
    };

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
                        <Dialog.Button
                            label="Завершить сканирование"
                            style={styles.dialogBtn}
                            onPress={handleFinishPress}
                        />
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
    dialogContent: { borderRadius: sizes.radius, backgroundColor: colors.WHITE  },
    dialogFooter: { justifyContent: 'center' },
    dialogTitle: { textAlign: 'center', fontSize: sizes.h4, fontWeight: '500', color: colors.GRAY_700, marginBottom: 10, },
    dialogBtn: { fontSize: sizes.body3, color: colors.BLACK, textTransform: 'none' },
    dialogBtnFill: { height: 50, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.PRIMARY, borderRadius: sizes.radius, },
    dialogBtnFillText: { color: colors.WHITE, fontSize: sizes.body3, fontWeight: '400' },
    dialogClose: { fontSize: sizes.body4, color: colors.SECONDARY, textTransform: 'none' },
});

export default ActionScan;