import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../themes/variables';

function HomeTopBtn({ navigation }) {

    return (
        <View style={{ display: 'flex', flexDirection: 'row', gap: 10, paddingRight: 10 }}>
            <TouchableOpacity
                activeOpacity={0.8}
                accessibilityRole="button"
                onPress={() => navigation.navigate('NotificationStackRoute') }
            >
                <MaterialCommunityIcons name="bell" color={colors.BLACK} size={25} />
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.8}
                accessibilityRole="button"
                onPress={() => navigation.navigate('ProfileStackRoute') }
            >
                <MaterialCommunityIcons name="account" color={colors.BLACK} size={25} />
            </TouchableOpacity>
        </View>
    );
}

export default HomeTopBtn;


