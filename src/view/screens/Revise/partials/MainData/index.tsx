import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, Text, Switch, TextInput, ScrollView, FlatList, StyleSheet, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { colors, constant, sizes } from '../../../../themes/variables';
import Dialog from 'react-native-dialog';
import MainBody from './MainBody';
import MainHead from './MainHead';
import createInstance from '../../../../helpers/AxiosInstance';
import Snackbar from "react-native-snackbar";
import Spinner from 'react-native-loading-spinner-overlay';

function MainData({ navigation, area }) {
  const [contextModalVisible, setContextModalVisible] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [item, setitem] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  
  console.log('render main');
  console.log('area', area)

  const onPressEvent = useCallback((item) => {
    setitem(item)
    setContextModalVisible(!contextModalVisible)
  }, []);
 


  
  const api = createInstance();
  useEffect(() => {
    api.get(`/revise/view/?area_id=${area.id}`)
      .then(res => { 
        setTableData(res.data) 
        setIsLoading(false)
      })
      .catch(e => {
        setIsLoading(false)
        Snackbar.show({
          text: e.response.data.msg,
          textColor: colors.LIGHT_DANGER,
          backgroundColor: colors.DANGER,
          duration: Snackbar.LENGTH_SHORT,
        });
      });
  }, [])


  return (
    <View style={styles.wrapper}>
      <Spinner visible={isLoading} animation="fade" />
        <View style={styles.tableWrapper}>
          <ScrollView horizontal={true} contentContainerStyle={styles.tableInner}>
            <MainHead />
            <FlatList
              removeClippedSubviews={false}
              initialNumToRender={1}
              maxToRenderPerBatch={20}
              windowSize={2}
              data={tableData}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <MainBody item={item} onPressEvent={onPressEvent} />}
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
    </View>
  );
}


export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.BG,
    padding: sizes.padding,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  tableWrapper: { flex: 1, flexDirection: 'column', backgroundColor: colors.WHITE, width: '100%' },
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


export default MainData;