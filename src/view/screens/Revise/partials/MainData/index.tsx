import React, { useState, useRef, useCallback } from 'react';
import { View, Text, TextInput, ScrollView, RefreshControl, FlatList, StyleSheet, TouchableOpacity, Vibration } from 'react-native';
import { colors, constant, sizes } from '../../../../themes/variables';
import createInstance from '../../../../../helpers/AxiosInstance';
import Dialog from 'react-native-dialog';
import MainBody from './MainBody';
import MainHead from './MainHead';
import Snackbar from 'react-native-snackbar';
import Spinner from 'react-native-loading-spinner-overlay';

function MainData({ navigation, data, area }) {
  const [refreshing, setRefreshing] = useState(false);
  const [contextModalVisible, setContextModalVisible] = useState(false);
  const [tableData, setTableData] = useState(data);
  const [item, setItem] = useState({});
  const [newScan, setNewScan] = useState('');
  const newScanRef = useRef(null);
  const api = createInstance();

  console.log('render MainData');

  const onPressEvent = useCallback((item) => {
    setItem(item)
    setContextModalVisible(!contextModalVisible)
    setTimeout(() => newScanRef?.current?.focus(), constant.refDelay)
  }, []);

  // сохраняем новое значние скана
  const handlePressSaveScan = async () => {
    api.post(`/revise/update/`, { 'area': area.id, 'area_item': item.id, 'scan': newScan })
      .then(res => {
        setTableData(res.data)
        setItem({})
        setNewScan('')
        setContextModalVisible(!contextModalVisible)
        setTimeout(() => {
          Snackbar.show({ text: 'Факт успешно сохранен', textColor: colors.SUCCESS, backgroundColor: colors.LIGHT_SUCCESS, duration: Snackbar.LENGTH_SHORT, });
        }, constant.snackbarDelay)
      })
      .catch(e => {
        setTimeout(() => {
          Vibration.vibrate(constant.vibroTimeShort)
          Snackbar.show({ text: e.message, textColor: colors.DANGER, backgroundColor: colors.LIGHT_DANGER, duration: Snackbar.LENGTH_SHORT, });
        }, constant.snackbarDelay)
      });
  }

  const reviseView = async (showSuccess=false) => {
    api.get(`/revise/view/?area_id=${area.id}`)
      .then(res => {
        setTableData(res.data)
        if (showSuccess)
          setTimeout(() => {
            Snackbar.show({ text: 'Данные обновлены', textColor: colors.SUCCESS, backgroundColor: colors.LIGHT_SUCCESS, duration: Snackbar.LENGTH_SHORT });
          }, constant.snackbarDelay)
      })
      .catch(e => {
        setTimeout(() => {
          Vibration.vibrate(constant.vibroTimeShort)
          Snackbar.show({ text: e.message, textColor: colors.DANGER, backgroundColor: colors.LIGHT_DANGER, duration: Snackbar.LENGTH_SHORT, });
        }, constant.snackbarDelay)
      });
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    reviseView(true)
    setRefreshing(false)
  }, []);

  return (
    <View style={styles.inner}>
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
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
          <Dialog.Title style={styles.dialogTitle}>Товар {item.article}</Dialog.Title>
          <View>
            <TextInput
              style={styles.dialogInput}
              placeholder="Факт"
              placeholderTextColor={colors.GRAY_500}
              ref={newScanRef}
              autoCorrect={false}
              selectTextOnFocus={true}
              value={newScan}
              keyboardType="numeric"
              onChangeText={setNewScan}
            />

            <TouchableOpacity
              style={styles.dialogBtnFill}
              activeOpacity={constant.activeOpacity}
              accessibilityRole="button"
              onPress={handlePressSaveScan}
            >
              <Text style={styles.dialogBtnFillText}>Сохранить своё значение</Text>
            </TouchableOpacity>

            <Text style={styles.dialogText}>или</Text>

            <TouchableOpacity
              style={[styles.dialogBtnFill, styles.dialogBtnFillSuccess]}
              activeOpacity={constant.activeOpacity}
              accessibilityRole="button"
              onPress={handlePressSaveScan}
            >
              <Text style={styles.dialogBtnFillText}>Подтвердить факт</Text>
            </TouchableOpacity>
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
  inner: { 
    flex: 1,
    padding: sizes.padding,
  },
  tableWrapper: { flex: 1, flexDirection: 'column', width: '100%' },
  tableInner: { flexGrow: 1, flexDirection: 'column' },

  dialogHeader: { padding: 0, margin: 0 },
  dialogContent: { borderRadius: sizes.radius, backgroundColor: colors.WHITE },
  dialogFooter: { justifyContent: 'center' },
  dialogTitle: { textAlign: 'center', fontSize: sizes.h4, fontWeight: '500', color: colors.GRAY_700, marginBottom: 15, },
  dialogBtn: { fontSize: sizes.body3, color: colors.BLACK, textTransform: 'none' },
  dialogBtnFill: { height: 40, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.PRIMARY, borderRadius: sizes.radius, },
  dialogBtnFillSuccess: { backgroundColor: colors.SUCCESS },
  dialogBtnFillText: { color: colors.WHITE, fontSize: sizes.body4, fontWeight: '400' },
  dialogClose: { fontSize: sizes.body4, color: colors.SECONDARY, textTransform: 'none' },
  dialogText: { fontSize: sizes.body3, color: colors.SECONDARY, textTransform: 'none', textAlign: 'center', marginVertical: 4 },
  dialogInput: {
    flexBasis: 48,
    paddingHorizontal: 10,
    width: '100%',
    fontSize: sizes.body4,
    backgroundColor: colors.WHITE,
    color: colors.GRAY_700,
    borderWidth: 1,
    borderColor: colors.GRAY_300,
    borderRadius: 7,
    elevation: 3,
    marginBottom: 12,
  },

});


export default MainData;