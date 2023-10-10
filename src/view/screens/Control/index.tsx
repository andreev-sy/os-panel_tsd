import React, { useState } from 'react';
import { TextInput, Text, View, FlatList, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import TableHeader from './partials/TableHeader';
import TableRow from './partials/TableRow';
import { colors, sizes } from '../../themes/variables';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

// const keyExtractor = (item) => item.id;
// const renderHeader = () => <TableHeader />;
// const renderItem = ({ item }) => <TableRow item={item} />;

const ControlScreen = () => {
  const [text, onChangeText] = useState('');
  const [number, onChangeNumber] = useState('');

  const [tableHead, setTableHead] = useState(['Зона', 'Ряд', 'Количество']);
  const [tableData, setTableData] = useState([
    ['Зона 0001', 'А', ''],
    ['Зона 0002', 'А', ''],
    ['Зона 0003', 'А', ''],
    ['Зона 0004', 'B', ''],
    ['Зона 0005', 'B', ''],
    ['Зона 0006', 'B', ''],
    ['Зона 0007', 'B', ''],
    ['Зона 0008', 'C', '12'],
    ['Зона 0009', 'C', '4'],
    ['Зона 0010', 'C', '2'],
    ['Зона 0011', 'C', '5'],
    ['Зона 0012', 'C', '45'],
    ['Зона 0013', 'C', '2'],
    ['Зона 0014', 'C', '45'],
    ['Зона 0015', 'A', '12'],
    ['Зона 0016', 'A', '45'],
    ['Зона 0017', 'A', '12'],
    ['Зона 0018', 'A', '12'],
    ['Зона 0019', 'D', '120'],
  ]);
  

  let widthArr = [130, 59, 110]

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
          <ScrollView horizontal={true}>
            <View>
              <Table borderStyle={table.theadBorder}>
                <Row data={tableHead} widthArr={widthArr} style={table.thead} textStyle={table.theadText} />
              </Table>
              <ScrollView style={table.tbody}>
                <Table borderStyle={table.tbodyBorder}>
                  {
                    tableData.map((rowData, index) => (
                      <Row
                        key={index}
                        data={rowData}
                        widthArr={widthArr}
                        style={table.tbodyRow}
                        textStyle={table.tbodyRowText}
                      />
                    ))
                  }
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
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
    height: 50,
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
    height: 48,
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
  container: { marginTop: 10, height: 314, backgroundColor: colors.WHITE },
  thead: { height: 35 },
  theadBorder: { borderWidth: 1, borderColor: colors.GRAY_500 },
  theadText: { textAlign: 'center', color: colors.BLACK, fontWeight: '600', fontSize: sizes.body4 },

  text: { textAlign: 'center', color: colors.BLACK },
  tbody: { marginTop: -1 },
  tbodyBorder: { borderWidth: 1, borderColor: colors.GRAY_500 },
  tbodyRow: { height: 35 },
  tbodyRowText: { textAlign: 'center', color: colors.BLACK, fontWeight: '400', fontSize: sizes.body4 },

});

export default ControlScreen;