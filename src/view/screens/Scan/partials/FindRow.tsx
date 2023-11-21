import React, {memo} from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { colors, constant, sizes } from '../../../themes/variables';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const FindRow = ({ item, onPressEvent }) => {
  //console.log('render item'+item)
  const dataItem = item.item
  return (
    <TouchableOpacity
      style={styles.wrapper}
      activeOpacity={constant.activeOpacity}
      accessibilityRole="button"
      onLongPress={() => onPressEvent(item)}
    >
      <View>
        <Text style={styles.title}>Артикул: {dataItem.article}</Text>
        { dataItem.name.length > 0 ? <Text style={styles.text}>Наименование: {dataItem.name}</Text> : '' }
        { dataItem.param1.length > 0 ? <Text style={styles.text}>Параметр1: {dataItem.param1}</Text> : '' }
        { dataItem.param2.length > 0 ? <Text style={styles.text}>Параметр2: {dataItem.param2}</Text> : '' }
        { dataItem.param3.length > 0 ? <Text style={styles.text}>Параметр3: {dataItem.param3}</Text> : '' }
      </View>
    </TouchableOpacity>
  );

    

}

export const styles = StyleSheet.create({
  wrapper: {
    padding: sizes.padding,
    width: '100%',
    backgroundColor: colors.WHITE,
    borderRadius: sizes.radius,
    borderWidth: 1,
    borderColor: colors.GRAY_500,
    marginBottom: 8,
  },
  title: { color: colors.GRAY_800, fontSize: sizes.body4, },
  text: { color: colors.GRAY_600, fontSize: sizes.body5, },

});


export default memo(FindRow)
