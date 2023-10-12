import React, {memo} from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { colors, sizes } from '../../../themes/variables';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AreaRow = ({ area, onPressEvent }) => {
  console.log('render area'+area.id);
  return (
    <TouchableOpacity
      style={styles.wrapper}
      activeOpacity={0.8}
      accessibilityRole="button"
      onPress={() => onPressEvent(area)}
    >
      <View>
        <Text style={styles.title}>Зона {area.code} {area.row}</Text>
        <Text style={styles.text}>Отсканировано товаров: {area.scanCount}</Text>
        <Text style={styles.text}>Учетное количество: {area.planCount}</Text>
      </View>
        
      <MaterialCommunityIcons name="arrow-expand-right" color={colors.PRIMARY} size={22} />
    </TouchableOpacity>
  );
}

export const styles = StyleSheet.create({
  wrapper: {
    padding: sizes.padding,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
    backgroundColor: colors.WHITE,
    borderRadius: sizes.radius,
    borderWidth: 1,
    borderColor: colors.GRAY_500,
    marginBottom: 8,
  },
  title: { color: colors.GRAY_800, fontSize: sizes.body3, },
  text: { color: colors.GRAY_600, fontSize: sizes.body4, },

});


export default memo(AreaRow)
