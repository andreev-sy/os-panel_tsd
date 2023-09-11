import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, TouchableOpacity, Text,  Modal, Alert } from 'react-native';
import { colors } from '../../../themes/variables';
import { GeneralStyles } from '../../../themes/styles';

const ActionsList = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleNullPress = () => {
        Alert.alert("", "Вы точно хотите обнулить зону?", [
            { text: "Отмена" },
            { text: "Да", onPress: () => nullArea() },
        ])
    };

    const handleFinishPress = () => {
        Alert.alert("", "Вы точно хотите закончить сканирование?", [
            { text: "Отмена" },
            { text: "Да", onPress: () => finishArea() },
        ])
    };

    function nullArea() {
        setModalVisible(!modalVisible);
    };

    function finishArea() {
        setModalVisible(!modalVisible);
    };
   

    return (
        <View>
            {
                <TouchableOpacity
                    activeOpacity={0.5}
                    accessibilityRole="button"
                    onPress={() => setModalVisible(true)}
                >
                    <MaterialCommunityIcons name="dots-vertical" color={colors.BLACK} size={28} />
                </TouchableOpacity>
            }

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
            >
                <View style={GeneralStyles.modalWrap}>
                    <View style={GeneralStyles.modalInner}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            accessibilityRole="button"
                            onPress={handleNullPress}
                        >
                            <Text style={GeneralStyles.modalAction}>Обнулить зону</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            accessibilityRole="button"
                            onPress={handleFinishPress}
                        >
                            <Text style={GeneralStyles.modalAction}>Закончить сканирование</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            accessibilityRole="button"
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={GeneralStyles.modalClose}>Закрыть</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};



export default ActionsList;