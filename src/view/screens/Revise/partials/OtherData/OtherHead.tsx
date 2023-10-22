import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, sizes } from '../../../../themes/variables';

const OtherHead = () => {
  let widthArr = [130, 140, 80, 140]

  return (
    <View style={styles.thead}>
      <Text numberOfLines={0} style={[ styles.theadText, styles.theadBorderRight, { width: widthArr[0] } ]}>Артикул</Text>
      <Text numberOfLines={0} style={[ styles.theadText, styles.theadBorderRight, { width: widthArr[1] } ]}>Название</Text>
      <Text numberOfLines={0} style={[ styles.theadText, styles.theadBorderRight, { width: widthArr[2] } ]}>Факт</Text>
      <Text numberOfLines={0} style={[ styles.theadText, { width: widthArr[3] } ]}>Штрихкод</Text>
    </View>
  );
}


export const styles = StyleSheet.create({
  thead: {
    flexDirection: 'row', 
    borderColor: colors.GRAY_600,
    borderWidth: 1,
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


export default OtherHead;
