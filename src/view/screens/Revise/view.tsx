import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, Text, Switch, TextInput, ScrollView, FlatList, StyleSheet, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { colors, constant, sizes } from '../../themes/variables';
import Dialog from 'react-native-dialog';
import Snackbar from 'react-native-snackbar';
import TableBody from './partials/TableData/TableBody';
import TableHead from './partials/TableData/TableHead';
import OtherBody from './partials/OtherData/OtherBody';
import OtherHead from './partials/OtherData/OtherHead';

function ReviseAreaScreen({ navigation, area }) {
  const [contextModalVisible, setContextModalVisible] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [otherData, setOtherData] = useState([]);
  const [item, setitem] = useState({});

  console.log('render ReviseAreaScreen')

  const onPressEvent = useCallback((item) => {
    setitem(item)
    setContextModalVisible(!contextModalVisible)
  }, []);


  const setData = () => {
    const table = [];
    for (let i = 1; i <= 20; i++) {
      table.push({
        id: i,
        article: 'артикул' + i,
        name: 'наименование' + i,
        planCount: (i * 4 - 4).toString(),
        scanCount: (i * 2).toString(),
        gap: ((i * 4 - 4) - (i * 2)).toString(),
        barcode: 'штрихкод' + i,
      });
    }
    setTableData(table)

    const other = [];
    for (let i = 1; i <= 30; i++) {
      other.push({
        id: i,
        article: 'артикул' + i,
        name: 'наименование' + i,
        scanCount: (i * 2).toString(),
        barcode: 'штрихкод' + i,
      });
    }
    setOtherData(other)
  }


  useEffect(() => {
    setData();
  }, [])


  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.inner}>

        <View style={styles.tableWrapper}>
          <Text style={styles.tableTitle}>Товары на сверку</Text>
          <ScrollView horizontal={true} contentContainerStyle={styles.tableInner}>
            <TableHead />
            <FlatList
              // contentContainerStyle={{ flexDirection: 'column' }}
              removeClippedSubviews={false}
              initialNumToRender={1}
              maxToRenderPerBatch={20}
              windowSize={2}
              data={tableData}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TableBody item={item} onPressEvent={onPressEvent} />}
            />
          </ScrollView>
        </View>

        <View style={[styles.tableWrapper, styles.tableotherWrapper]}>
          <Text style={styles.tableTitle}>Другие товары в зоне</Text>
          <ScrollView horizontal={true} contentContainerStyle={styles.tableInner}>
            <OtherHead />
            <FlatList
              // contentContainerStyle={{ flexDirection: 'column' }}
              removeClippedSubviews={false}
              initialNumToRender={1}
              maxToRenderPerBatch={20}
              windowSize={2}
              data={tableData}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <OtherBody item={item} onPressEvent={onPressEvent} />}
            />
          </ScrollView>
        </View>


        <View>
          <Dialog.Container
            headerStyle={styles.dialogHeader}
            contentStyle={styles.dialogContent}
            footerStyle={styles.dialogFooter}
            visible={contextModalVisible}
            onBackdropPress={() => setContextModalVisible(!contextModalVisible)}
          >
            <Dialog.Title style={styles.dialogTitle}>Артикул -{item.article}</Dialog.Title>
            <View>
              <Dialog.Button
                label="Удалить"
                style={styles.dialogBtn}
              // onPress={handlePressDelete}
              />
              <Dialog.Button
                label="Редактировать"
                style={styles.dialogBtn}
              // onPress={handlePressEdit}
              />
            </View>

            <Dialog.Button
              label="Закрыть"
              style={styles.dialogClose}
              onPress={() => setContextModalVisible(!contextModalVisible)}
            />
          </Dialog.Container>
        </View>
      </ScrollView>

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
    height: '100%'
  },

  tableTitle: { color: colors.GRAY_800, fontWeight: '600', fontSize: sizes.body4, marginBottom: 5, },
  tableWrapper: { backgroundColor: colors.WHITE, width: '100%', height: '60%' },
  tableotherWrapper: { marginTop: 20, },
  tableInner: { flexGrow: 1, flexDirection: 'column' },

  dialogHeader: { padding: 0, margin: 0 },
  dialogContent: { borderRadius: sizes.radius },
  dialogFooter: { justifyContent: 'center' },
  dialogTitle: { textAlign: 'center', fontSize: sizes.h4, fontWeight: '500', color: colors.GRAY_700, marginBottom: 15, },
  dialogBtn: { fontSize: sizes.body3, color: colors.BLACK, textTransform: 'none' },
  dialogBtnFill: { height: 50, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.PRIMARY, borderRadius: sizes.radius, },
  dialogBtnFillText: { color: colors.WHITE, fontSize: sizes.body3, fontWeight: '400' },
  dialogClose: { fontSize: sizes.body4, color: colors.SECONDARY, textTransform: 'none' },

});


export default ReviseAreaScreen;