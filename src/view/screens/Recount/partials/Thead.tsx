import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, sizes } from '../../../themes/variables';

const Thead = () => {
  let widthArr = [42, 120, 80, 80, 80]

  return (
    <View style={styles.thead}>
      <Text numberOfLines={0} style={[ styles.theadText, styles.theadBorderRight, { width: widthArr[0] } ]}>Ряд</Text>
      <Text numberOfLines={0} style={[ styles.theadText, styles.theadBorderRight, { width: widthArr[1] } ]}>Зона</Text>
      <Text numberOfLines={0} style={[ styles.theadText, styles.theadBorderRight, { width: widthArr[2] } ]}>Скан</Text>
      <Text numberOfLines={0} style={[ styles.theadText, styles.theadBorderRight, { width: widthArr[3] } ]}>Контроль</Text>
      <Text numberOfLines={0} style={[ styles.theadText, { width: widthArr[4] } ]}>+/-</Text>
    </View>
  );
} 

export const styles = StyleSheet.create({
  thead: {
    flexDirection: 'row', 
    borderWidth: 1,
    borderColor: colors.GRAY_600,
  },
  theadText: {
    flex: 1, 
    fontWeight: '600',
    fontSize: sizes.body4,
    color: colors.GRAY_700,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  theadBorderRight: {
    borderRightColor: colors.GRAY_600,
    borderRightWidth: 1,
  }

});

export default Thead;
