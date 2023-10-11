import React, { memo } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colors, sizes } from '../../../themes/variables';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const NotyRow = ({ noty, onPressEvent }) => {
    console.log('render noty' + noty.id);
    return (
        <TouchableOpacity
            style={styles.wrapper}
            activeOpacity={0.8}
            disabled={!noty.viewed}
            accessibilityRole="button"
            onPress={() => onPressEvent(noty)}
        >
            <Text style={styles.notyText}>{noty.text}</Text>

            { 
                noty.viewed ? 
                <View style={[ styles.notyViewed, styles.notyViewedTrue ]} /> 
                : 
                <View style={[ styles.notyViewed, styles.notyViewedFalse ]} /> 
            }
            
        </TouchableOpacity>
    );
}

export const styles = StyleSheet.create({
    wrapper: {
        padding: sizes.padding,
        width: '100%',
        backgroundColor: colors.WHITE,
        borderRadius: sizes.radius,
        borderWidth: 1,
        borderColor: colors.GRAY_500,
        marginBottom: 8
    },

    notyText: {
        fontSize: sizes.body3,
        color: colors.GRAY_700
    },
    notyViewed: {
        position: 'absolute',
        top: 5,
        right: 5,
        width: 10,
        height: 10,
        borderRadius: 50,
    },
    notyViewedTrue: { backgroundColor: colors.SUCCESS },
    notyViewedFalse: { backgroundColor: colors.GRAY_400 },

});


export default memo(NotyRow)
