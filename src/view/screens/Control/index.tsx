import React from 'react';
import { TextInput, Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import TableHeader from './partials/TableHeader';
import TableRow from './partials/TableRow';
import { colors, sizes } from '../../themes/variables';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

// const keyExtractor = (item) => item.id;
// const renderHeader = () => <TableHeader />;
// const renderItem = ({ item }) => <TableRow item={item} />;

const ControlScreen = () => {
  const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState('');

  const tableHead = ['id', 'area', 'row', 'controlCount'];
  const tableData = [];
  for (let i = 1; i <= 100; i++) {
    tableData.push({ id: i, area: '000' + i, row: 'А', controlCount: i * 2 });
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.inner}>
        <View style={styles.form}>
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
          <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.8}
              accessibilityRole="button"
          >
              <Text style={styles.btnText}>Ок</Text>
          </TouchableOpacity>
        </View>
        <View style={table.container}>
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Row data={tableHead} style={table.head} textStyle={table.text}/>
            <Rows data={tableData} textStyle={table.text}/>
          </Table>
        </View>
        {/* <View style={styles.tableWrapper}>
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
        </View> */}
      </View>
    </View>
  );
}


export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.BG,
    paddingVertical: sizes.padding,
  },
  inner: {
    paddingHorizontal: sizes.padding,
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
  },
  input: {
    height: 38,
    paddingHorizontal: 10,
    fontSize: sizes.body4,
    backgroundColor: colors.WHITE,
    color: colors.GRAY_600,
    borderWidth: 1,
    borderColor: colors.GRAY_300,
    borderRadius: 7,
    elevation: 3,
    flexBasis: '40%'
  },
  btn: {
    height: 36,
    width: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.PRIMARY,
    borderRadius: sizes.radius,
  },
  btnText: {
    color: colors.WHITE,
    fontSize: sizes.body4,
    fontWeight: '400'
  },



});


const table = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});

export default ControlScreen;