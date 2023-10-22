import React, {memo} from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { colors, constant, sizes } from '../../../../themes/variables';
import { fixFloat } from '../../../../helpers/Utilitites';

const MainBody = ({ item, onPressEvent }) => {
  console.log('render main'+item.id);

  let widthArr = [130, 140, 80, 80, 80, 140]
  let numberOfLines = parseInt(item.id)

  return (
    <TouchableNativeFeedback
      accessibilityRole="button"
      onLongPress={() => onPressEvent(item)}
      background={TouchableNativeFeedback.Ripple(colors.GRAY_200, false)}
    >
        <View style={[styles.tbody, item.is_revise == 1 ? styles.isRevise : {}]}>
          <Text numberOfLines={numberOfLines} style={[ styles.tbodyText, styles.tbodyBorderRight, { width: widthArr[0] } ]}>{item.article}</Text>
          <Text numberOfLines={numberOfLines} style={[ styles.tbodyText, styles.tbodyBorderRight, { width: widthArr[1] } ]}>{item.name}</Text>
          <Text numberOfLines={numberOfLines} style={[ styles.tbodyText, styles.tbodyBorderRight, { width: widthArr[2] } ]}>{item.plan}</Text>
          <Text numberOfLines={numberOfLines} style={[ styles.tbodyText, styles.tbodyBorderRight, { width: widthArr[3] } ]}>{item.scan}</Text>
          <Text numberOfLines={numberOfLines} style={[ styles.tbodyText, styles.tbodyBorderRight, { width: widthArr[4] } ]}>{fixFloat(item.gap)}</Text>
          <Text numberOfLines={numberOfLines} style={[ styles.tbodyText, { width: widthArr[5] } ]}>{item.barcode}</Text>
        </View>
    </TouchableNativeFeedback>
  );
}

export const styles = StyleSheet.create({
  tbody: {
    flexDirection: 'row', 
    borderColor: colors.GRAY_600,
    borderWidth: 1,
    borderTopWidth: 0,
    backgroundColor: colors.WHITE,
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
  },
  isRevise: { backgroundColor: colors.LIGHT_SUCCESS, }
});

export default memo(MainBody)

