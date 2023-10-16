import React from 'react';
import { Text, StyleSheet } from 'react-native';


function Badge({ color, style }) {
    return (
        <Text style={[ styles.wrapper, { backgroundColor: color }, style ]}  ></Text>
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

export default Badge;


