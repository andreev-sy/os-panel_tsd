import React, {memo} from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { colors, sizes } from '../../../themes/variables';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AreaRow = ({ navigation, area, onPressEvent }) => {
  // const handlePress = () => navigation.navigate('ScanAreaStackRoute', { headerTitle: area.title, area: area.id })
  console.log('render area'+area.id);
  return (
    <TouchableOpacity
      style={styles.wrapper}
      activeOpacity={0.8}
      accessibilityRole="button"
      onPress={() => onPressEvent(area)}
    >
      <View>
        <Text style={{ fontSize: 16 }}>Зона {area.code} {area.row}</Text>
        <Text style={{ fontSize: 14 }}>Отсканировано товаров: {area.scan}</Text>
      </View>
        
      <MaterialCommunityIcons name="arrow-expand-right" color={colors.PRIMARY} size={24} />
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

});


export default memo(AreaRow)
