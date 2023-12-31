import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, FlatList, StyleSheet, RefreshControl, SafeAreaView, TextInput, TouchableOpacity, Text, Vibration } from 'react-native';
import AreaRow from './partials/AreaRow';
import { colors, constant, sizes, sounds } from '../../themes/variables';
import Dialog from "react-native-dialog";
import Snackbar from "react-native-snackbar";
import createInstance from '../../../helpers/AxiosInstance';
import Spinner from 'react-native-loading-spinner-overlay';
import { useFocusEffect } from '@react-navigation/native';
import Notification from '../../components/Notification';

function ScanScreen({ navigation, route }) {
  const [refreshing, setRefreshing] = useState(false);
  const [listData, setListData] = useState([]);
  const [modalVisible, setmodalVisible] = useState(false);
  const [areaSelect, setAreaSelect] = useState({});
  const [areaBarcode, setAreaBarcode] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const areaBarcodeRef = useRef(null);
  const api = createInstance();

  const onPressEvent = useCallback((area) => {
    setAreaSelect(area)
    setTimeout(() => areaBarcodeRef?.current?.focus(), constant.refDelay)
    setmodalVisible(!modalVisible)
  }, []);

  const handlePressEnter = async () => {
    // сверяем введный ШК с ШК из выбранной зоны
    if (areaBarcode.trim() == areaSelect.barcode) {
      sounds.beep.play()
      setmodalVisible(!modalVisible)
      navigation.navigate('ScanAreaStackRoute', { headerTitle: areaSelect.title, area: areaSelect, main: false })
      return
    }else{
      setTimeout(() => areaBarcodeRef?.current?.focus(), constant.refDelay)
      setTimeout( () => {
        sounds.beep_fail.play()
        Vibration.vibrate(constant.vibroTimeMedium)
        Snackbar.show({ text: 'Введенный штрихкод не совпадает с выбраной зоной', textColor: colors.DANGER, backgroundColor: colors.LIGHT_DANGER, duration: Snackbar.LENGTH_SHORT });
      }, constant.snackbarDelay)
     }
  };

  const scanIndex = async (showSuccess = false) => {
    api.get(`/scan/index/`)
      .then(res => { 
        setListData(res.data) 
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
          Snackbar.show({ text: e.message, textColor: colors.DANGER, backgroundColor: colors.LIGHT_DANGER, duration: Snackbar.LENGTH_SHORT })
        }, constant.snackbarDelay)
      })
  }

  useFocusEffect( 
    useCallback( () => { 
      //console.log('axios useFocusEffect scanIndex')
      scanIndex() 
    }, []) 
  );
  
  useEffect(() => { 
    //console.log('axios useEffect scanIndex')
    scanIndex() 
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    scanIndex(true)
    setRefreshing(false)
  }, []);


  return (
    <SafeAreaView style={styles.wrapper}>
      <Notification/>
      <Spinner visible={isLoading} animation="fade" />
      <FlatList
        contentContainerStyle={styles.inner}
        initialNumToRender={6}
        removeClippedSubviews={true}
        maxToRenderPerBatch={6}
        windowSize={2}
        data={listData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AreaRow area={item} onPressEvent={onPressEvent} />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />

      <View>
        <Dialog.Container
          headerStyle={styles.dialogHeader}
          contentStyle={styles.dialogContent}
          footerStyle={styles.dialogFooter}
          visible={modalVisible}
          onBackdropPress={() => setmodalVisible(!modalVisible)}
        >
          <Dialog.Title style={styles.dialogTitle}>{areaSelect.title}</Dialog.Title>
          <View>
            <TextInput
              style={styles.dialogInput}
              placeholder="Штрихкод зоны"
              placeholderTextColor={colors.GRAY_500}
              ref={areaBarcodeRef}
              selectTextOnFocus={true}
              autoCorrect={false}
              onChangeText={setAreaBarcode}
              onSubmitEditing={handlePressEnter}
            />
            <TouchableOpacity
              style={styles.dialogBtnFill}
              activeOpacity={constant.activeOpacity}
              accessibilityRole="button"
              onPress={handlePressEnter}
            >
              <Text style={styles.dialogBtnFillText}>Войти</Text>
            </TouchableOpacity>
          </View>
          <Dialog.Button label="Закрыть" style={styles.dialogClose} onPress={() => setmodalVisible(!modalVisible)} />
        </Dialog.Container>
      </View>

    </SafeAreaView>
  );
}


export const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: sizes.padding,
    backgroundColor: colors.BG,
    height: '100%'
  },
  inner: {
    paddingHorizontal: sizes.padding,
  },

  dialogHeader: { padding: 0, margin: 0 },
  dialogContent: { borderRadius: sizes.radius, backgroundColor: colors.WHITE  },
  dialogFooter: { justifyContent: 'center' },
  dialogTitle: { textAlign: 'center', fontSize: sizes.h4, fontWeight: '500', color: colors.GRAY_700, marginBottom: 15, },
  dialogBtn: { fontSize: sizes.body3, color: colors.BLACK, textTransform: 'none' },
  dialogBtnFill: { height: 50, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.PRIMARY, borderRadius: sizes.radius, },
  dialogBtnFillText: { color: colors.WHITE, fontSize: sizes.body3, fontWeight: '400' },
  dialogClose: { fontSize: sizes.body4, color: colors.SECONDARY, textTransform: 'none' },
  dialogInput: {
    flexBasis: 55,
    paddingHorizontal: 10,
    width: '100%',
    fontSize: sizes.body3,
    backgroundColor: colors.WHITE,
    color: colors.GRAY_700,
    borderWidth: 1,
    borderColor: colors.GRAY_300,
    borderRadius: 7,
    elevation: 3,
    marginBottom: 12,
  },
});

export default ScanScreen;