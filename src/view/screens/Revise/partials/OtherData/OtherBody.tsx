import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { colors, sizes } from '../../../../themes/variables';
import { fixFloat } from '../../../../helpers/Utilitites';

const OtherBody = ({ item }) => {
  console.log('render other' + item.id);
  let widthArr = [130, 140, 80, 140]
  let numberOfLines = parseInt(item.id)

  return (
    <View style={styles.tbody}>
      <Text numberOfLines={numberOfLines} style={[styles.tbodyText, styles.tbodyBorderRight, { width: widthArr[0] }]}>{item.article}</Text>
      <Text numberOfLines={numberOfLines} style={[styles.tbodyText, styles.tbodyBorderRight, { width: widthArr[1] }]}>{item.name}</Text>
      <Text numberOfLines={numberOfLines} style={[styles.tbodyText, styles.tbodyBorderRight, { width: widthArr[2] }]}>{item.scan}</Text>
      <Text numberOfLines={numberOfLines} style={[styles.tbodyText, { width: widthArr[3] }]}>{item.barcode}</Text>
    </View>
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

export default memo(OtherBody)

