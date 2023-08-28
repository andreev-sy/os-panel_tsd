import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { colors } from './../themes/variables';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function AreaRowComponent({ navigation, item }) {
  const handlePress = () => navigation.navigate('ScanAreaStackRoute', {
    headerTitle: 'Зона ' + item.name,
    area: item.id
  })

  return (
    <TouchableOpacity
      style={styles.row}
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

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.WHITE,
    padding: 10,
    borderRadius: 7,
    elevation: 2,
    marginHorizontal: 5,
    marginVertical: 5,
  },
});


export default AreaRowComponent;