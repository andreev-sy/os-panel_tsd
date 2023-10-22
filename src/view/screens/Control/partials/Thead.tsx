import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, sizes } from '../../../themes/variables';

const Thead = () => {
  let widthArr = [100, 20, 70]

  return (
    <View style={styles.thead}>
      <Text numberOfLines={0} style={[ styles.theadText, styles.theadBorderRight, { width: widthArr[0] } ]}>Зона</Text>
      <Text numberOfLines={0} style={[ styles.theadText, styles.theadBorderRight, { width: widthArr[1] } ]}>Ряд</Text>
      <Text numberOfLines={0} style={[ styles.theadText, { width: widthArr[2] } ]}>Количество</Text>
    </View>
  );
} 

export const styles = StyleSheet.create({
  thead: {
    flexDirection: 'row', 
    borderWidth: 1,
    borderColor: colors.GRAY_600,
    backgroundColor: colors.WHITE, 
  },
  theadText: {
    flex: 1, 
    fontWeight: '600',
    fontSize: sizes.body4,
    color: colors.GRAY_700,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  theadBorderRight: { borderRightColor: colors.GRAY_600, borderRightWidth: 1, }
});

export default Thead;
