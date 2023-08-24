import React from 'react';
import { TouchableOpacity, View, Text, Button } from 'react-native';
import { colors, fonts } from './../themes/variables';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function AreaRowComponent() {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 20 }}>
            <View>
                <Text style={{ fontSize: 16 }}>Зона 1-А-1-1 (Ряд А)</Text>
                <Text style={{ fontSize: 14 }}>Отсканировано товаров: 17</Text>
            </View>
            <TouchableOpacity
              accessibilityRole="button"
            //   onPress={ () => navigation.navigate('Details') }
            >
              <MaterialCommunityIcons name="arrow-expand-right" color={ colors.PRIMARY } size={26} />
            </TouchableOpacity>
        </View>
    );
}

export default AreaRowComponent;