import React from 'react';
import { StyleSheet, SafeAreaView, TextInput, View, FlatList, Text, ScrollView } from 'react-native';
import { colors } from '../themes/variables';

const ControlScreen = () => {
  const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState('');

  const data = [
    { id: 1, area: 'John', row: 'A', controlCount: 35 },
    { id: 2, area: 'Jane', row: 'A', controlCount: 35 },
    { id: 3, area: 'Bob', row: 'B', controlCount: 35 },
    { id: 4, area: 'Jane', row: 'A', controlCount: 35 },
    { id: 5, area: 'Bob', row: 'B', controlCount: 35 },
  ];

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row' }}>
      <Text style={{ flex: 1 }}>{item.area}</Text>
      <Text style={{ flex: 1 }}>{item.row}</Text>
      <Text style={{ flex: 1 }}>{item.controlCount}</Text>
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          placeholder="Зона"
          value={text}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Количество"
          keyboardType="numeric"
        />
      </SafeAreaView>
      <ScrollView style={styles.tableWrapper}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListHeaderComponent={() => (
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Text style={{ flex: 1, fontWeight: 'bold' }}>Зона</Text>
              <Text style={{ flex: 1, fontWeight: 'bold' }}>Ряд</Text>
              <Text style={{ flex: 1, fontWeight: 'bold' }}>Количество</Text>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    flexBasis: '48%',
    backgroundColor: colors.WHITE,
    color: colors.GRAY_600,
    height: 60,
    paddingVertical: 10,
    borderRadius: 7,
    elevation: 2,
    paddingHorizontal: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tableWrapper: {
    paddingVertical: 20,
  },
  wrapper: {
    padding: 10,
  }
});

export default ControlScreen;