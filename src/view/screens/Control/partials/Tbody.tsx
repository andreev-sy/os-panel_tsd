import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { colors, constant, sizes } from '../../../themes/variables';

const Tbody = ({ area, onPressEvent }) => {
  console.log('render area' + area.id);
  let widthArr = [100, 50, 50]

  return (
    <TouchableNativeFeedback
      accessibilityRole="button"
      onLongPress={() => onPressEvent(area)}
      background={TouchableNativeFeedback.Ripple(colors.GRAY_200, false)}
    >
      <View style={styles.tbody}>
        <Text numberOfLines={area.id} style={[ styles.tbodyText, styles.tbodyBorderRight, { width: widthArr[0] } ]}>{area.code}</Text>
        <Text numberOfLines={area.id} style={[ styles.tbodyText, styles.tbodyBorderRight, { width: widthArr[1] } ]}>{area.row}</Text>
        <Text numberOfLines={area.id} style={[ styles.tbodyText, { width: widthArr[2] } ]}>{area.controlCount}</Text>
      </View>
  </TouchableNativeFeedback>

  );
}

export const styles = StyleSheet.create({
  tbody: {
    flexDirection: 'row', 
    borderColor: colors.GRAY_600,
    borderWidth: 1,
    borderTopWidth: 0
  },
  tbodyText: {
    flex: 1, 
    fontWeight: '400',
    fontSize: sizes.body4,
    color: colors.GRAY_700,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  tbodyBorderRight: {
    borderRightColor: colors.GRAY_600,
    borderRightWidth: 1,
  }

});

export default memo(Tbody)

