import React from 'react';
import { TextInput, View, FlatList } from 'react-native';
import { ControlStyles } from '../../themes/styles';
import TableHeader from './partials/TableHeader';
import TableRow from './partials/TableRow';


const keyExtractor = (item) => item.id;
const renderHeader = () => <TableHeader />;
const renderItem = ({ item }) => <TableRow item={item} />;

const ControlScreen = () => {
  const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState('');

  const data = [];
  for (let i = 1; i <= 100; i++) {
    data.push({ id: i, area: '000' + i, row: 'А', controlCount: i * 2 });
  }

  return (
    <View style={ControlStyles.wrapper}>
      <View style={ControlStyles.inputWrapper}>
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
      </View>
      <View style={ControlStyles.tableWrapper}>
        <FlatList
          initialNumToRender={6}
          removeClippedSubviews={true}
          maxToRenderPerBatch={6}
          windowSize={2}

          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListHeaderComponent={renderHeader}
        />
      </View>
    </View>
  );
}

export default ControlScreen;