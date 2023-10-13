import React, {memo} from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { colors, constant, sizes } from '../../../../themes/variables';

const TableBody = ({ item, onPressEvent }) => {
  console.log('render item'+item.id);
  let widthArr = [130, 140, 80, 80, 80, 140]

  return (
    <TouchableNativeFeedback
      accessibilityRole="button"
      onLongPress={() => onPressEvent(item)}
      background={TouchableNativeFeedback.Ripple(colors.GRAY_200, false)}
    >
        <View style={styles.tbody}>
          <Text numberOfLines={item.id} style={[ styles.tbodyText, styles.tbodyBorderRight, { width: widthArr[0] } ]}>{item.article}</Text>
          <Text numberOfLines={item.id} style={[ styles.tbodyText, styles.tbodyBorderRight, { width: widthArr[1] } ]}>{item.name}</Text>
          <Text numberOfLines={item.id} style={[ styles.tbodyText, styles.tbodyBorderRight, { width: widthArr[2] } ]}>{item.planCount}</Text>
          <Text numberOfLines={item.id} style={[ styles.tbodyText, styles.tbodyBorderRight, { width: widthArr[3] } ]}>{item.scanCount}</Text>
          <Text numberOfLines={item.id} style={[ styles.tbodyText, styles.tbodyBorderRight, { width: widthArr[4] } ]}>{item.gap}</Text>
          <Text numberOfLines={item.id} style={[ styles.tbodyText, { width: widthArr[5] } ]}>{item.barcode}</Text>
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

export default memo(TableBody)
