import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, TouchableOpacity, Text,  Modal, Alert } from 'react-native';
import { colors, sizes } from '../../../themes/variables';
import { GeneralStyles } from '../../../themes/styles';
import Dialog from "react-native-dialog";

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

            <View>
                <Dialog.Container 
                    headerStyle={{ height: 0, padding: 0, margin: 0 }}  
                    contentStyle={{ borderRadius: sizes.radius }}
                    footerStyle={{ justifyContent: 'center' }} 
                    visible={modalVisible} 
                    onBackdropPress={() => setModalVisible(!modalVisible)}
                >                    
                    <View>
                        <Dialog.Button 
                            label="Обнулить" 
                            style={{ fontSize: sizes.body2, color: colors.BLACK, textTransform: 'none' }} 
                            onPress={handleNullPress}
                        />
                        <Dialog.Button 
                            label="Закончить сканирование" 
                            style={{ fontSize: sizes.body2, color: colors.BLACK, textTransform: 'none' }} 
                            onPress={handleFinishPress}
                        />
                    </View>
                        
                    <Dialog.Button 
                        label="Закрыть" 
                        style={{ fontSize: sizes.body3, color: colors.SECONDARY, textTransform: 'none' }} 
                        onPress={() => setModalVisible(!modalVisible)}
                    />
                </Dialog.Container>
            </View>
        </View>
    );
};



export default ActionsList;