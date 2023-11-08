import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


function BadgeText({ text, color, style }) {
    return (
        <Text style={[ styles.wrapper, { backgroundColor: color }, style ]}>
            {text}
        </Text>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: 10, 
        height: 10, 
        borderRadius: 50,
        position: 'absolute',
        right: -5,
        top: -2.5
    }
})

export default BadgeText;


