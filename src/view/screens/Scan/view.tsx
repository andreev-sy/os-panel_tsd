import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, Text, Switch, TextInput, ScrollView, FlatList, StyleSheet, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { colors, constant, sizes } from '../../themes/variables';
import Dialog from 'react-native-dialog';
import Snackbar from 'react-native-snackbar';
import Tbody from './partials/Tbody';
import Thead from './partials/Thead';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../../../context/AuthContext';
import createInstance from '../../../helpers/AxiosInstance';

function ScanAreaScreen({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuto, setIsAuto] = useState(true);
  const [count, setCount] = useState('1');
  const [barcode, setBarcode] = useState('');
  const [contextModalVisible, setContextModalVisible] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [item, setitem] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const barcodeRef = useRef(null);
  const countRef = useRef(null);
  const api = createInstance();
  
  console.log('render ScanAreaScreen')
  
  const onPressEvent = useCallback((item) => {
    setitem(item)
    setContextModalVisible(!contextModalVisible)
  }, []);

  const onFinishEvent = useCallback(() => {
    console.log('onFinishEvent')
  }, []);
  
  const onNullEvent = useCallback(() => {
    console.log('onNullEvent')
  }, []);

  const handleAutoSwitch = () => {
    if(isEdit) setIsEdit(false);
    setBarcode('');
    setCount('');
    setIsAuto(!isAuto);
    setCount(!isAuto ? '1' : '');
    setTimeout(() => barcodeRef.current.focus(), constant.refDelay)
  };

  const handlePressEdit = () => {
    setBarcode(item.barcode)
    setCount(item.scanCount)

    if(!isEdit) setIsEdit(true);
    if(isAuto) setIsAuto(false);
    
    setContextModalVisible(!contextModalVisible)
    setTimeout(() => countRef.current.focus(), constant.refDelay)
    setTimeout(() => {
      Snackbar.show({ text: 'Данные о товаре занесены в форму', textColor: colors.PRIMARY, backgroundColor: colors.LIGHT_PRIMARY, duration: Snackbar.LENGTH_SHORT });
    }, constant.snackbarDelay)
  };

  const handlePressFinish = () => {
    Alert.alert('', 'Вы точно хотите завершить сканирование?', [
        { text: 'Отмена' }, { text: 'Да', onPress: () => finishArea() },
    ])
  };

  const finishArea = () => {

  }

  const handlePressDelete = () => {
    Alert.alert('', 'Вы точно хотите удалить товар из зоны?', [
        { text: 'Отмена' }, { text: 'Да', onPress: () => deleteItem() },
    ])
  };

  const deleteItem = () => {
    const index = tableData.findIndex(el => el.id === item.id);
    if (index !== -1) {
      tableData.splice(index, 1); // Удаляем элемент из массива
      setTableData([...tableData]); // Обновляем состояние массива
    }

    setContextModalVisible(!contextModalVisible)
    setitem({})
  }

  const handlePressSave = () => {
    if(isEdit){
      setIsEdit(false);
      setBarcode('')
      setCount('')
      setTimeout(() => {
        Snackbar.show({ text: 'Товар успешно изменён', textColor: colors.SUCCESS, backgroundColor: colors.LIGHT_SUCCESS, duration: Snackbar.LENGTH_SHORT});
      }, constant.snackbarDelay)
    }else{
      setBarcode('')
      if(!isAuto) setCount('')
      setTimeout(() => barcodeRef.current.focus(), constant.refDelay)
      setTimeout(() => {
        Snackbar.show({ text: 'Товар успешно добавлен', textColor: colors.SUCCESS, backgroundColor: colors.LIGHT_SUCCESS, duration: Snackbar.LENGTH_SHORT});
      }, constant.snackbarDelay)
    }
  };

  const scanView = () => {
    const data = [];
    for (let i = 1; i <= 100000; i++) {
      data.push({
        id: i,
        article: 'артикул' + i,
        name: 'наименование' + i,
        param1: 'параметр' + i,
        scanCount: (i * 2).toString(),
        barcode: 'штрихкод' + i,
      });
    }
    setTableData(data)
    setIsLoading(false)
  }

  useEffect(() => {
    console.log('axios usEffect scanView')
    scanView()
  },[])


  return (
    <View style={styles.wrapper}>

      <Spinner visible={isLoading} animation="fade" />

      <View style={styles.form}>
        <View style={styles.formSwitch}>
          <Text style={styles.formSwitchText}>Авто</Text>
          <Switch
            value={isAuto}
            autoFocus={false}
            onValueChange={handleAutoSwitch}
            trackColor={colors.GRAY_200}
            thumbColor={isAuto ? colors.PRIMARY : colors.LIGHT}
          />
          {isEdit ? <Text style={styles.editLabel}>Редактирование</Text> : ''}
        </View>
        <View style={styles.formRow}>
          <TextInput
            style={[styles.formInput, styles.formInputBarcode ]}
            ref={barcodeRef}
            value={barcode}
            inputMode={ isAuto ? 'none' : 'text' }
            placeholder="Штрихкод"
            placeholderTextColor={colors.GRAY_500}
            autoCorrect={false}
            selectTextOnFocus={true}
            onChangeText={setBarcode}
            onSubmitEditing={() => {
              if (!barcode) setTimeout(() => barcodeRef.current.focus(), constant.refDelay)
              else if(isAuto) handlePressSave()
              else setTimeout(() => countRef.current.focus(), constant.refDelay)
            }}
          />
          <TextInput
            style={[styles.formInput, styles.formInputCount, !isAuto ? styles.formInputLong : {} ]}
            ref={countRef}
            value={count}
            editable={!isAuto}
            placeholder="Кол-во"
            placeholderTextColor={colors.GRAY_500}
            onChangeText={setCount}
            keyboardType="numeric"
            autoCorrect={false}
            selectTextOnFocus={true}
            onSubmitEditing={() => {
              if (!count) setTimeout(() => countRef.current.focus(), constant.refDelay)
              else if (!barcode) setTimeout(() => barcodeRef.current.focus(), constant.refDelay)
              else handlePressSave()
            }}
          />
          {isAuto &&
            <TouchableOpacity
              style={[styles.formBtn, (barcode && count) ? {} : styles.formBtnDisabled]}
              activeOpacity={constant.activeOpacity}
              disabled={(barcode && count) ? false : true}
              accessibilityRole="button"
              onPress={handlePressSave}
            >
              <Text style={styles.formBtnText}>Ок</Text>
            </TouchableOpacity>
          }
        </View>
        {!isAuto &&
          <TouchableOpacity
            style={[styles.formBottomBtn, (barcode && count) ? {} : styles.formBtnDisabled]}
            activeOpacity={constant.activeOpacity}
            disabled={(barcode && count) ? false : true}
            accessibilityRole="button"
            onPress={handlePressSave}
          >
            <Text style={styles.formBtnText}>Сохранить</Text>
          </TouchableOpacity>
        }
      </View>

      <View style={styles.tableWrapper}>
        <ScrollView horizontal={true} contentContainerStyle={styles.tableInner}>
          <Thead />
          <FlatList
            removeClippedSubviews={false}
            initialNumToRender={1}
            maxToRenderPerBatch={20}
            windowSize={2}
            data={tableData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Tbody item={item} onPressEvent={onPressEvent} />}
          />
        </ScrollView>
      </View>

      <TouchableOpacity
        style={styles.btn}
        activeOpacity={constant.activeOpacity}
        accessibilityRole="button"
        onPress={handlePressFinish}
      >
        <Text style={styles.btnText}>Завершить сканирование</Text>
      </TouchableOpacity>

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
            <Dialog.Button
              label="Удалить"
              style={styles.dialogBtn}
              onPress={handlePressDelete}
            />
            <Dialog.Button
              label="Редактировать"
              style={styles.dialogBtn}
              onPress={handlePressEdit}
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
  form: { marginBottom: 12, },
  editLabel: { marginLeft: 16, fontSize: sizes.body4 },
  formSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  formSwitchText: {
    fontSize: sizes.body3,
    fontWeight: '500',
    color: colors.GRAY_700
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
  },
  formInput: {
    height: 40,
    paddingHorizontal: 10,
    fontSize: sizes.body4,
    backgroundColor: colors.WHITE,
    color: colors.GRAY_700,
    borderWidth: 1,
    borderColor: colors.GRAY_300,
    borderRadius: 7,
    elevation: 3,
  },
  formInputBarcode: { flexBasis: '56%' },
  formInputCount: { flexBasis: '28%' },
  formInputLong: { flexBasis: '42%' },
  formBottomBtn: {
    height: 34,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.PRIMARY,
    borderRadius: sizes.radius,
    marginTop: 8,
  },
  formBtn: {
    height: 38,
    width: 38,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.PRIMARY,
    borderRadius: sizes.radius,
  },
  formBtnText: { color: colors.WHITE, fontSize: sizes.body4, fontWeight: '400' },
  formBtnDisabled: { opacity: 0.6 },
  
  btn: {
    height: 34,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.SUCCESS,
    borderRadius: sizes.radius,
    marginTop: 8,
  },
  btnText: { color: colors.WHITE, fontSize: sizes.body4, fontWeight: '400' },
  
  tableWrapper: { flex: 1, flexDirection: 'column', width: '100%' },
  tableInner: { flexGrow: 1, flexDirection: 'column' },

  dialogHeader: { padding: 0, margin: 0 },
  dialogContent: { borderRadius: sizes.radius, backgroundColor: colors.WHITE  },
  dialogFooter: { justifyContent: 'center' },
  dialogTitle: { textAlign: 'center', fontSize: sizes.h4, fontWeight: '500', color: colors.GRAY_700, marginBottom: 15, },
  dialogBtn: { fontSize: sizes.body3, color: colors.BLACK, textTransform: 'none' },
  dialogBtnFill: { height: 50, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.PRIMARY, borderRadius: sizes.radius, },
  dialogBtnFillText: { color: colors.WHITE, fontSize: sizes.body3, fontWeight: '400' },
  dialogClose: { fontSize: sizes.body4, color: colors.SECONDARY, textTransform: 'none' },

});


export default ScanAreaScreen;