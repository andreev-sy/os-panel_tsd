import React, {memo} from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { colors } from '../../../themes/variables';
import { ScanStyles } from '../../../themes/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AreaRow = ({ navigation, item }) => {
  const handlePress = () => navigation.navigate('ScanAreaStackRoute', { headerTitle: 'Зона ' + item.name, area: item.id })
  console.log('render area'+item.id);
  return (
    <TouchableOpacity
      style={ScanStyles.area_row}
      activeOpacity={0.8}
      accessibilityRole="button"
      onPress={handlePress}
    >
      <View>
        <Text style={{ fontSize: 16 }}>Зона {item.name}</Text>
        <Text style={{ fontSize: 14 }}>Отсканировано товаров: {item.scan}</Text>
      </View>
      <View>
        <MaterialCommunityIcons name="arrow-expand-right" color={colors.PRIMARY} size={24} />
      </View>
    </TouchableOpacity>
  );
}

export default memo(AreaRow)
