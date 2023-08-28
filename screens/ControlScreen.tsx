import React from 'react';
import { StyleSheet, SafeAreaView, TextInput, View, FlatList, Text } from 'react-native';
import { colors } from '../themes/variables';
import { ControlStyles } from '../themes/styles';

const ControlScreen = () => {
  const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState('');

  const data = [];
  for (let i = 1; i <= 100; i++) {
    data.push({
      id: i,
      area: '000' + i,
      row: 'А',
      controlCount: i * 2,
    });
  }

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', marginBottom: 4, }}>
      <Text style={{ flex: 1 }}>{item.area}</Text>
      <Text style={{ flex: 1 }}>{item.row}</Text>
      <Text style={{ flex: 1 }}>{item.controlCount}</Text>
    </View>
  );

  return (
    <View style={ControlStyles.wrapper}>
      <SafeAreaView style={ControlStyles.inputWrapper}>
        <TextInput
          style={ControlStyles.input}
          onChangeText={onChangeText}
          placeholder="Зона"
          value={text}
        />
        <TextInput
          style={ControlStyles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Количество"
          keyboardType="numeric"
        />
      </SafeAreaView>
      <View style={ControlStyles.tableWrapper}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListHeaderComponent={() => (
            <View style={{ flexDirection: 'row', marginBottom: 8 }}>
              <Text style={{ flex: 1, fontWeight: 'bold' }}>Зона</Text>
              <Text style={{ flex: 1, fontWeight: 'bold' }}>Ряд</Text>
              <Text style={{ flex: 1, fontWeight: 'bold' }}>Количество</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

export default ControlScreen;