import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, constant } from '../themes/variables';

function HeaderBack({ navigation }) {
    return (
        <TouchableOpacity
            style={styles.btn}
            activeOpacity={constant.activeOpacity}
            accessibilityRole="button"
            onPress={() => navigation.goBack() }
        >
            <Ionicons
                name="chevron-back-sharp"
                color={colors.BLACK}
                size={23}
            />
        </TouchableOpacity>
    );
}

export const styles = StyleSheet.create({
    btn: { paddingLeft: 7, paddingTop: 1, },
});

export default HeaderBack;


