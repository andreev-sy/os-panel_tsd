import React, {memo} from 'react';
import { View, Text } from 'react-native';

const TableRow = ({ item }) => {
  console.log('render item'+item.id);

  return (
    <View style={{ flexDirection: 'row', marginBottom: 4, width: 500 }}>
      <Text numberOfLines={item.id} style={{ flex: 1 }}>{item.article}</Text>
      <Text numberOfLines={item.id} style={{ flex: 1 }}>{item.name}</Text>
      <Text numberOfLines={item.id} style={{ flex: 1 }}>{item.param1}</Text>
      <Text numberOfLines={item.id} style={{ flex: 1 }}>{item.scanCount}</Text>
      <Text numberOfLines={item.id} style={{ flex: 1 }}>{item.barcode}</Text>
    </View>
  );
}

export default memo(TableRow)

