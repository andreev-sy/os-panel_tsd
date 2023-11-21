import React, {memo} from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { colors, constant, sizes } from '../../../themes/variables';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AreaRow = ({ area, onPressEvent }) => {
  //console.log('render area'+area.id);
  return (
    <TouchableOpacity
      style={styles.wrapper}
      activeOpacity={constant.activeOpacity}
      accessibilityRole="button"
      onPress={() => onPressEvent(area)}
    >
      <View>
        <Text style={styles.title}>{area.title}</Text>
        <Text style={styles.text}>Отсканировано товаров: {area.scan}</Text>
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
