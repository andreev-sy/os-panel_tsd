import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, Text, Switch, TextInput, ScrollView, RefreshControl, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Alert, Vibration } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dialog from 'react-native-dialog';
import Snackbar from 'react-native-snackbar';
import Spinner from 'react-native-loading-spinner-overlay';
import Tbody from './partials/Tbody';
import Thead from './partials/Thead';
import FindRow from './partials/FindRow';
import createInstance from '../../../helpers/AxiosInstance';
import { colors, constant, sizes } from '../../themes/variables';
import Notification from '../../components/Notification';

function ScanAreaScreen({ navigation, route }) {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuto, setIsAuto] = useState(true);
  const [count, setCount] = useState('1');
  const [barcode, setBarcode] = useState('');
  const [contextModalVisible, setContextModalVisible] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [findData, setFindData] = useState([]);
  const [item, setitem] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [barcodeList, setBarcodeList] = useState([]);
  const barcodeRef = useRef(null);
  const countRef = useRef(null);
  const api = createInstance();

  console.log('render ScanAreaScreen')

  const onPressEvent = useCallback((item) => {
    setitem(item)
    setContextModalVisible(!contextModalVisible)
  }, []);

  const onPressFindEvent = useCallback((item) => {
    setIsLoading(true)
    api.post(`/scan/add/`, { 'item': item.item?.id, 'count': item.count, 'area': route.params?.area.id })
      .then(res => {
        setTableData(res.data)
        setBarcode('')
        if (!isAuto) setCount('')
        else setTimeout(() => barcodeRef?.current?.focus(), constant.refDelay)
        setFindData([])
        setIsLoading(false)
        setTimeout(() => {
          Snackbar.show({ text: 'Товар успешно добавлен', textColor: colors.SUCCESS, backgroundColor: colors.LIGHT_SUCCESS, duration: Snackbar.LENGTH_SHORT });
        }, constant.snackbarDelay)
      })
      .catch(e => {
        setIsLoading(false)
        setTimeout(() => {
          Vibration.vibrate(constant.vibroTimeShort)
          Snackbar.show({ text: e.message, textColor: colors.DANGER, backgroundColor: colors.LIGHT_DANGER, duration: Snackbar.LENGTH_SHORT, });
        }, constant.snackbarDelay)
      });

  }, []);

  const handleSearch = async (text) => {
    setBarcode(text)
    if (!isAuto) {
      if (text.length >= 3) api.get(`/scan/search/?query=${text}`).then(res => { setBarcodeList(res.data) })
      else setBarcodeList([])
    }
  };

  const handleAutoSwitch = () => {
    if (isEdit) setIsEdit(false)
    AsyncStorage.setItem('isAuto', JSON.stringify(!isAuto))
    setIsAuto(!isAuto)
    setBarcode('')
    setCount('')
    setBarcodeList([])
    setCount(!isAuto ? '1' : '')
    setTimeout(() => barcodeRef?.current?.focus(), constant.refDelay)
  };

  const handlePressEdit = async () => {
    const arr_barcode = item.barcode.split(',')
    setBarcode(arr_barcode[0])
    setCount(item.scan)

    if (!isEdit) setIsEdit(true)
    if (isAuto) setIsAuto(false)

    setContextModalVisible(!contextModalVisible)
    setTimeout(() => countRef?.current?.focus(), constant.refDelay)
    setTimeout(() => {
      Snackbar.show({ text: 'Данные о товаре занесены в форму', textColor: colors.PRIMARY, backgroundColor: colors.LIGHT_PRIMARY, duration: Snackbar.LENGTH_SHORT });
    }, constant.snackbarDelay)
  };

  const handlePressFinish = () => Alert.alert('', 'Вы точно хотите завершить сканирование?', [ { text: 'Отмена' }, { text: 'Да', onPress: () => finish() } ])

  const handlePressClose = () => navigation.reset({ index: 0, routes: [{ name: 'HomeStackRoute', params: { modal: true } }] })

  const finish = async () => {
    api.post(`/scan/finish/`, { 'area': route.params?.area.id })
      .then(res => {
        navigation.goBack()
        setTimeout(() => {
          Snackbar.show({ text: 'Скан в зоне успешно завершён', textColor: colors.SUCCESS, backgroundColor: colors.LIGHT_SUCCESS, duration: Snackbar.LENGTH_SHORT, });
        }, constant.snackbarDelay)
      })
      .catch(e => {
        setTimeout(() => {
          Vibration.vibrate(constant.vibroTimeShort)
          Snackbar.show({ text: e.message, textColor: colors.DANGER, backgroundColor: colors.LIGHT_DANGER, duration: Snackbar.LENGTH_SHORT })
        }, constant.snackbarDelay)
      });
  }

  const handlePressDelete = () => {
    Alert.alert('', 'Вы точно хотите удалить товар из зоны?', [
      { text: 'Отмена' }, { text: 'Да', onPress: () => deleteItem() },
    ])
  };

  const deleteItem = async () => {
    setIsLoading(true)

    api.post(`/scan/delete/`, { 'area': route.params?.area.id, 'area_item': item.id })
      .then(res => {
        setTableData(res.data)
        setitem({})
        setContextModalVisible(!contextModalVisible)
        setIsLoading(false)
        setTimeout(() => {
          Snackbar.show({ text: 'Товар удален из зоны', textColor: colors.SUCCESS, backgroundColor: colors.LIGHT_SUCCESS, duration: Snackbar.LENGTH_SHORT, });
        }, constant.snackbarDelay)
      })
      .catch(e => {
        setIsLoading(false)
        setTimeout(() => {
          Vibration.vibrate(constant.vibroTimeShort)
          Snackbar.show({ text: e.message, textColor: colors.DANGER, backgroundColor: colors.LIGHT_DANGER, duration: Snackbar.LENGTH_SHORT, });
        }, constant.snackbarDelay)
      });
  }

  const handlePressSave = async () => {
    setTimeout(() => barcodeRef?.current?.focus(), constant.refDelay)
    setIsLoading(true)
    if (isEdit) {
      api.post(`/scan/update/`, { 'new_scan': count, 'area_item': item.id })
        .then(res => {
          setTableData(res.data)
          setIsEdit(false)
          setBarcode('')
          setCount('')
          setitem({})
          setIsLoading(false)
          setTimeout(() => {
            Snackbar.show({ text: 'Товар успешно изменён', textColor: colors.SUCCESS, backgroundColor: colors.LIGHT_SUCCESS, duration: Snackbar.LENGTH_SHORT });
          }, constant.snackbarDelay)
        })
        .catch(e => {
          setIsLoading(false)
          setTimeout(() => {
            Vibration.vibrate(constant.vibroTimeShort)
            Snackbar.show({ text: e.message, textColor: colors.DANGER, backgroundColor: colors.LIGHT_DANGER, duration: Snackbar.LENGTH_SHORT, });
          }, constant.snackbarDelay)
        });

    } else {
      api.post(`/scan/add/`, { 'barcode': barcode, 'count': count, 'area': route.params?.area.id })
        .then(res => {
          console.log(res.data)
          if (res.data?.msg?.length > 0) {
            setFindData(res.data?.find)
            setIsLoading(false)
            setTimeout(() => {
              Snackbar.show({ text: res.data.msg, textColor: colors.INFO, backgroundColor: colors.LIGHT_INFO, duration: Snackbar.LENGTH_LONG });
            }, constant.snackbarDelay)

          } else {
            setTableData(res.data)
            setBarcode('')
            if (isAuto) setTimeout(() => barcodeRef?.current?.focus(), constant.refDelay)
            else setCount('')
            setIsLoading(false)
            setTimeout(() => {
              Snackbar.show({ text: 'Товар успешно добавлен', textColor: colors.SUCCESS, backgroundColor: colors.LIGHT_SUCCESS, duration: Snackbar.LENGTH_SHORT });
            }, constant.snackbarDelay)
          }
        })
        .catch(e => {
          console.log(e)
          setIsLoading(false)
          setTimeout(() => {
            Vibration.vibrate(constant.vibroTimeShort)
            Snackbar.show({ text: e.message, textColor: colors.DANGER, backgroundColor: colors.LIGHT_DANGER, duration: Snackbar.LENGTH_SHORT, });
          }, constant.snackbarDelay)
        });
    }
  };

  const scanView = async (showSuccess=false) => {
    api.get(`/scan/view/?area_id=${route.params?.area.id}`)
      .then(res => {
        setTableData(res.data)
        setIsLoading(false)
        if (showSuccess)
          setTimeout(() => {
            Snackbar.show({ text: 'Данные обновлены', textColor: colors.SUCCESS, backgroundColor: colors.LIGHT_SUCCESS, duration: Snackbar.LENGTH_SHORT });
          }, constant.snackbarDelay)
      })
      .catch(e => {
        setIsLoading(false)
        setTimeout(() => {
          Vibration.vibrate(constant.vibroTimeShort)
          Snackbar.show({ text: e.message, textColor: colors.DANGER, backgroundColor: colors.LIGHT_DANGER, duration: Snackbar.LENGTH_SHORT, });
        }, constant.snackbarDelay)
      });
  }

  const setFromAsyncStorage = async () => {
    AsyncStorage.getItem('isAuto').then(value => {
      if (value !== null) {
        let auto = JSON.parse(value)
        if (auto) setTimeout(() => barcodeRef?.current?.focus(), constant.refDelay)
        else setIsAuto(JSON.parse(auto));
      }
    });
  }

  useEffect(() => {
    console.log('axios usEffect scanView')
    setFromAsyncStorage()
    scanView()
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    scanView(true)
    setRefreshing(false)
  }, []);


  return (
    <SafeAreaView style={styles.wrapper}>
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
          <View style={styles.formSearch}>
            <TextInput
              style={[styles.formInput, styles.formInputBarcode]}
              ref={barcodeRef}
              value={barcode}
              inputMode={isAuto ? 'none' : 'text'}
              placeholder="Штрихкод"
              placeholderTextColor={colors.GRAY_500}
              autoCorrect={false}
              selectTextOnFocus={true}
              onChangeText={handleSearch}
              onSubmitEditing={() => {
                if (!barcode) setTimeout(() => barcodeRef?.current?.focus(), constant.refDelay)
                else if (isAuto) handlePressSave()
                else setTimeout(() => countRef?.current?.focus(), constant.refDelay)
              }}
            />
            {
              barcodeList.length > 0 ?
                <View style={styles.listWrapper}>
                  <FlatList
                    data={barcodeList}
                    renderItem={({ item }) => (<Text style={styles.listText} onPress={() => { if (item.value !== '') { setBarcode(item.value); setBarcodeList([]); } }}>{item.label}</Text>)}
                    keyExtractor={(item) => item.value}
                  />
                </View>
                : ''
            }

          </View>
          <TextInput
            style={[styles.formInput, styles.formInputCount, !isAuto ? styles.formInputLong : {}]}
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
              if (!count) setTimeout(() => countRef?.current?.focus(), constant.refDelay)
              else if (!barcode) setTimeout(() => barcodeRef?.current?.focus(), constant.refDelay)
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

      {
        route.params.main ?
          <TouchableOpacity
            style={[styles.btn, styles.btnClose]}
            activeOpacity={constant.activeOpacity}
            accessibilityRole="button"
            onPress={handlePressClose}
          >
            <Text style={styles.btnText}>Закрыть</Text>
          </TouchableOpacity>
          : ''
      }

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
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
        </ScrollView>
      </View>

      {
        !route.params.main ?
          <TouchableOpacity
            style={[styles.btn, styles.btnFinish]}
            activeOpacity={constant.activeOpacity}
            accessibilityRole="button"
            onPress={handlePressFinish}
          >
            <Text style={styles.btnText}>Завершить сканирование</Text>
          </TouchableOpacity>
          : ''
      }


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

      <View >
        <Dialog.Container
          headerStyle={styles.dialogHeader}
          contentStyle={styles.dialogContent}
          footerStyle={styles.dialogFooter}
          visible={findData.length > 0 ? true : false}
          onBackdropPress={() => setFindData([])}
        >
          <Dialog.Title style={styles.dialogTitle}>Выберите товар из списка</Dialog.Title>
          {
            findData.length > 0 ?
              <FlatList
                removeClippedSubviews={false}
                initialNumToRender={1}
                maxToRenderPerBatch={10}
                windowSize={1}
                data={findData}
                keyExtractor={(item) => item.item?.id}
                renderItem={({ item }) => <FindRow item={item} onPressEvent={onPressFindEvent} />}
              />
              :
              ''
          }
          <Dialog.Button
            label="Закрыть"
            style={styles.dialogClose}
            onPress={() => setFindData([])}
          />
        </Dialog.Container>
      </View>
      <Notification style={{ padding: 0, margin: sizes.padding }}/>
    </SafeAreaView>
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
  listWrapper: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    top: 42,
    borderRadius: sizes.radius,
    maxHeight: 160,
    width: '100%',
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    borderColor: colors.GRAY_300,
    elevation: 3,
  },
  listText: {
    color: colors.GRAY_600,
    fontSize: sizes.body4,
    fontWeight: '400',
    paddingVertical: 7,
    paddingHorizontal: sizes.padding
  },
  form: { marginBottom: 8, },
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
  formSearch: {
    height: 40,
    flexBasis: '56%'
  },
  formInput: {
    height: 40,
    paddingHorizontal: 10,
    fontSize: sizes.body4,
    backgroundColor: colors.WHITE,
    color: colors.GRAY_700,
    borderWidth: 1,
    borderColor: colors.GRAY_300,
    borderRadius: sizes.radius,
    elevation: 3,
  },
  formInputBarcode: { width: '100%', height: '100%' },
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
  },
  btnFinish: { marginTop: 8,},
  btnClose: { marginBottom: 8,},
  btnText: { color: colors.WHITE, fontSize: sizes.body4, fontWeight: '400' },

  tableWrapper: { flex: 1, flexDirection: 'column', width: '100%' },
  tableInner: { flexGrow: 1, flexDirection: 'column' },

  dialogHeader: { padding: 0, margin: 0 },
  dialogContent: { borderRadius: sizes.radius, backgroundColor: colors.WHITE, maxHeight: '84%' },
  dialogFooter: { justifyContent: 'center' },
  dialogTitle: { textAlign: 'center', fontSize: sizes.h4, fontWeight: '500', color: colors.GRAY_700, marginBottom: 15, },
  dialogBtn: { fontSize: sizes.body3, color: colors.BLACK, textTransform: 'none' },
  dialogBtnFill: { height: 50, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.PRIMARY, borderRadius: sizes.radius, },
  dialogBtnFillText: { color: colors.WHITE, fontSize: sizes.body3, fontWeight: '400' },
  dialogClose: { fontSize: sizes.body4, color: colors.SECONDARY, textTransform: 'none' },

});


export default ScanAreaScreen;