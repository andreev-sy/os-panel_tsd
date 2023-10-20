import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { colors, sizes } from '../../../themes/variables';
import { fixFloat } from '../../../helpers/Utilitites'

const Tbody = ({ area, onPressEvent }) => {
  console.log('render area' + area.id);
  let widthArr = [42, 120, 80, 80, 80]
  let numberOfLines = parseInt(area.id)

  return (
    <TouchableNativeFeedback
      accessibilityRole="button"
      onLongPress={() => onPressEvent(area)}
      background={TouchableNativeFeedback.Ripple(colors.GRAY_200, false)}
    >
      <View style={styles.tbody}>
        <Text numberOfLines={numberOfLines} style={[ styles.tbodyText, styles.tbodyBorderRight, { width: widthArr[0] } ]}>{area.row}</Text>
        <Text numberOfLines={numberOfLines} style={[ styles.tbodyText, styles.tbodyBorderRight, { width: widthArr[1] } ]}>{area.code}</Text>
        <Text numberOfLines={numberOfLines} style={[ styles.tbodyText, styles.tbodyBorderRight, { width: widthArr[2] } ]}>{area.scan}</Text>
        <Text numberOfLines={numberOfLines} style={[ styles.tbodyText, styles.tbodyBorderRight, { width: widthArr[3] } ]}>{area.control}</Text>
        <Text numberOfLines={numberOfLines} style={[ styles.tbodyText, { width: widthArr[4] } ]}>{ fixFloat(area.gap) }</Text>
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

