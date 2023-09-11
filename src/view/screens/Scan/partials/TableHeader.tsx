import React from 'react';
import { View, Text } from 'react-native';

const TableHeader = () => {
  return (
    <View style={{ flexDirection: 'row', marginBottom: 8, width: 500 }}>
        <Text numberOfLines={0} style={{ flex: 1, fontWeight: 'bold' }}>Артикул</Text>
        <Text numberOfLines={0} style={{ flex: 1, fontWeight: 'bold' }}>Название</Text>
        <Text numberOfLines={0} style={{ flex: 1, fontWeight: 'bold' }}>Параметр1</Text>
        <Text numberOfLines={0} style={{ flex: 1, fontWeight: 'bold' }}>Количество</Text>
        <Text numberOfLines={0} style={{ flex: 1, fontWeight: 'bold' }}>Штрихкод</Text>
    </View>
  );
}

export default TableHeader
