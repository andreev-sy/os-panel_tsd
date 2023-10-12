import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, TouchableOpacity } from 'react-native';
import { colors, sizes } from '../../../themes/variables';
import Dialog from "react-native-dialog";

const ActionNotification = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleViewedAll = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <View>
            {
                <TouchableOpacity
                    style={{ marginRight: 3 }}
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
                            label="Прочитать всё" 
                            style={{ fontSize: sizes.body3, color: colors.BLACK, textTransform: 'none' }} 
                            onPress={handleViewedAll}
                        />
                    </View>
                        
                    <Dialog.Button 
                        label="Закрыть" 
                        style={{ fontSize: sizes.body4, color: colors.SECONDARY, textTransform: 'none' }} 
                        onPress={() => setModalVisible(!modalVisible)}
                    />
                </Dialog.Container>
            </View>
        </View>
    );
};


export default ActionNotification;