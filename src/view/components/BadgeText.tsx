import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../themes/variables';


function BadgeText({ text, color, style }) {
    return (
        <Text style={[ styles.wrapper, { backgroundColor: color }, style ]}>
            {text}
        </Text>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 50,
        position: 'absolute',
        right: -5,
        top: -2.5,
        color: colors.WHITE,
        fontSize: 12,
        paddingHorizontal: 4,
        paddingVertical: 1,
    }
})

export default BadgeText;


