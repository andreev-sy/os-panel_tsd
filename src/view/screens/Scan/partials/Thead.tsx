import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, sizes } from '../../../themes/variables';

const Thead = () => {
  return (
    <View style={styles.thead}>
        <Text numberOfLines={0} style={[ styles.theadText, styles.theadBorderRight ]}>Артикул</Text>
        <Text numberOfLines={0} style={[ styles.theadText, styles.theadBorderRight ]}>Название</Text>
        <Text numberOfLines={0} style={[ styles.theadText, styles.theadBorderRight ]}>Параметр1</Text>
        <Text numberOfLines={0} style={[ styles.theadText, styles.theadBorderRight ]}>Количество</Text>
        <Text numberOfLines={0} style={styles.theadText}>Штрихкод</Text>
    </View>
  );
}


export const styles = StyleSheet.create({
  thead: {
    flexDirection: 'row', 
    width: '100%',
    borderColor: colors.GRAY_600,
    borderWidth: 1,
  },
  theadText: {
    flex: 1, 
    fontWeight: '600',
    fontSize: sizes.body4,
    color: colors.GRAY_700,
    padding: 5,
  },
  theadBorderRight: {
    borderRightColor: colors.GRAY_600,
    borderRightWidth: 1,
  }

});


export default Thead;
