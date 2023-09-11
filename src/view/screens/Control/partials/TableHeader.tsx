import React from 'react';
import { View, Text } from 'react-native';

const TableHeader = () => {
  return (
    <View style={{ flexDirection: 'row', marginBottom: 8 }}>
      <Text style={{ flex: 1, fontWeight: 'bold' }}>Зона</Text>
      <Text style={{ flex: 1, fontWeight: 'bold' }}>Ряд</Text>
      <Text style={{ flex: 1, fontWeight: 'bold' }}>Количество</Text>
    </View>
  );
}

export default TableHeader
