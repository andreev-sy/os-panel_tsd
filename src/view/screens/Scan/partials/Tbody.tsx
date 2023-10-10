import React, {memo} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, sizes } from '../../../themes/variables';

const Tbody = ({ item }) => {
  console.log('render item'+item.id);

  return (
    <View style={styles.tbody}>
      <Text numberOfLines={item.id} style={[styles.tbodyText, styles.tbodyBorderRight]}>{item.article}</Text>
      <Text numberOfLines={item.id} style={[styles.tbodyText, styles.tbodyBorderRight]}>{item.name}</Text>
      <Text numberOfLines={item.id} style={[styles.tbodyText, styles.tbodyBorderRight]}>{item.param1}</Text>
      <Text numberOfLines={item.id} style={[styles.tbodyText, styles.tbodyBorderRight]}>{item.scanCount}</Text>
      <Text numberOfLines={item.id} style={[styles.tbodyText, styles.tbodyBorderRight]}>{item.barcode}</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  tbody: {
    flexDirection: 'row', 
    width: '100%',
    borderColor: colors.GRAY_600,
    borderWidth: 1,
    borderTopWidth: 0
  },
  tbodyText: {
    flex: 1, 
    fontWeight: '400',
    fontSize: sizes.body4,
    color: colors.GRAY_700,
    padding: 5,
  },
  tbodyBorderRight: {
    borderRightColor: colors.GRAY_600,
    borderRightWidth: 1,
  }

});

export default memo(Tbody)

