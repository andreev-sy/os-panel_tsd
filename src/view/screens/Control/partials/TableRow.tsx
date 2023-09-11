import React, { memo } from 'react';
import { View, Text } from 'react-native';

const TableRow = ({ item }) => {
  console.log('render item' + item.id);

  return (
    <View style={{ flexDirection: 'row', marginBottom: 4, }}>
      <Text style={{ flex: 1 }}>{item.area}</Text>
      <Text style={{ flex: 1 }}>{item.row}</Text>
      <Text style={{ flex: 1 }}>{item.controlCount}</Text>
    </View>
  );
}

export default memo(TableRow)

