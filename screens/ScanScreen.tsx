import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity, View, Text, ScrollView, StyleSheet } from 'react-native';
import AreaRowComponent from './../components/AreaRowComponent';
import { colors, fonts } from './../themes/variables';

function ScanScreen({ navigation }) {
  return (
    <ScrollView style={ styles.rowWrapper }>
      {/* <AreaRowComponent></AreaRowComponent> */}
      <View style={ styles.row }>
            <View>
                <Text style={{ fontSize: 16 }}>Зона 1-А-1-1 (Ряд А)</Text>
                <Text style={{ fontSize: 14 }}>Отсканировано товаров: 17</Text>
            </View>
            <TouchableOpacity
              accessibilityRole="button"
              onPress={ () => navigation.navigate('ScanAreaStackRoute') }
            >
              <MaterialCommunityIcons name="arrow-expand-right" color={ colors.PRIMARY } size={24} />
            </TouchableOpacity>
        </View>
      <View style={ styles.row }>
            <View>
                <Text style={{ fontSize: 16 }}>Зона 1-А-1-1 (Ряд А)</Text>
                <Text style={{ fontSize: 14 }}>Отсканировано товаров: 17</Text>
            </View>
            <TouchableOpacity
              accessibilityRole="button"
              onPress={ () => navigation.navigate('ScanAreaStackRoute') }
            >
              <MaterialCommunityIcons name="arrow-expand-right" color={ colors.PRIMARY } size={24} />
            </TouchableOpacity>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rowWrapper: {
    flex: 1, 
    flexDirection: 'column', 
    paddingHorizontal: 5, 
    paddingVertical: 5
  },
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


export default ScanScreen;