import React, { useState, useCallback, useEffect, useRef } from 'react';
import { TextInput, Text, View, FlatList, Alert, SafeAreaView, RefreshControl, StyleSheet, ScrollView, TouchableOpacity, Vibration } from 'react-native';
import Dialog from 'react-native-dialog';
import Snackbar from 'react-native-snackbar';
import Spinner from 'react-native-loading-spinner-overlay';
import { colors, constant, sizes } from '../../themes/variables';
import createInstance from '../../../helpers/AxiosInstance';
import Thead from './partials/Thead';
import Tbody from './partials/Tbody';

const ControlScreen = ({ navigation, route }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [area, setArea] = useState('');
  const [control, setControl] = useState('');
  const [tableData, setTableData] = useState([]);
  const [contextModalVisible, setContextModalVisible] = useState(false);
  const [areaSelected, setAreaSelected] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const areaRef = useRef(null);
  const controlRef = useRef(null);
  const api = createInstance();

  console.log('render ControlScreen')

  const onPressEvent = useCallback((area) => {
    console.log(area)
    setAreaSelected(area)
    setContextModalVisible(!contextModalVisible)
  }, []);

  const handlePressSave = async () => {
    setIsLoading(true)
    api.post(`/control/update/`, { area, control })
      .then(res => {
        setTableData(res.data)
        setArea('')
        setControl('')
        setIsLoading(false)
        setTimeout(() => areaRef?.current?.focus(), constant.refDelay)
        setTimeout(() => {
          Snackbar.show({ text: 'Контроль сохранен', textColor: colors.SUCCESS, backgroundColor: colors.LIGHT_SUCCESS, duration: constant.snackbarShort });
        }, constant.snackbarDelay)
      })
      .catch(e => {
        setIsLoading(false)
        setTimeout(() => areaRef?.current?.focus(), constant.refDelay)
        setTimeout(() => {
          Vibration.vibrate(constant.vibroTimeShort)
          Snackbar.show({ text: e.message, textColor: colors.DANGER, backgroundColor: colors.LIGHT_DANGER, duration: constant.snackbarLong, action: { text: 'СКРЫТЬ', textColor: colors.GRAY_600 } });
        }, constant.snackbarDelay)
      });
  };


 
  const handlePressFinish = () => {
    Alert.alert('', 'Вы точно хотите завершить контроль в зоне?', [
      { text: 'Отмена' },
      { text: 'Да', onPress: () => finishArea() },
    ])
  };

  const finishArea = async () => {
    api.post(`/control/finish/`, { 'area': areaSelected.id })
      .then(res => {
        console.log(res.data)
        setTableData(res.data);
        setContextModalVisible(!contextModalVisible)
        setAreaSelected({})

        if (res.data.length == 0) navigation.goBack()
        setTimeout(() => {
          Snackbar.show({ text: 'Контроль в зоне успешно завершён', textColor: colors.SUCCESS, backgroundColor: colors.LIGHT_SUCCESS, duration: constant.snackbarShort });
        }, constant.snackbarDelay)
      })
      .catch(e => {
        setContextModalVisible(!contextModalVisible)
        setTimeout(() => {
          Vibration.vibrate(constant.vibroTimeShort)
          Snackbar.show({ text: e.message, textColor: colors.DANGER, backgroundColor: colors.LIGHT_DANGER, duration: constant.snackbarLong })
        }, constant.snackbarDelay)
      });
  }

  const controlIndex = async (showSuccess = false) => {
    api.get(`/control/index/`)
      .then(res => {
        setTableData(res.data)
        setIsLoading(false)
        if (showSuccess)
          setTimeout(() => {
            Snackbar.show({ text: 'Данные обновлены', textColor: colors.SUCCESS, backgroundColor: colors.LIGHT_SUCCESS, duration: constant.snackbarShort });
          }, constant.snackbarDelay)
      })
      .catch(e => {
        setIsLoading(false)
        setTimeout(() => {
          Vibration.vibrate(constant.vibroTimeShort)
          Snackbar.show({ text: e.message, textColor: colors.DANGER, backgroundColor: colors.LIGHT_DANGER, duration: constant.snackbarLong });
        }, constant.snackbarDelay)
      });
  }

  useEffect(() => {
    console.log('axios useEffect controlIndex')
    controlIndex()
  }, [])


  const onRefresh = useCallback(() => {
    setRefreshing(true)
    controlIndex(true)
    setRefreshing(false)
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <Spinner visible={isLoading} animation="fade" />

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          ref={areaRef}
          placeholder="Код зоны"
          placeholderTextColor={colors.GRAY_500}
          value={area}
          selectTextOnFocus={true}
          onChangeText={setArea}
          onSubmitEditing={() => {
            if (!area) setTimeout(() => areaRef?.current?.focus(), constant.refDelay)
            else setTimeout(() => controlRef?.current?.focus(), constant.refDelay)
          }}
        />
        <TextInput
          style={styles.input}
          ref={controlRef}
          onChangeText={setControl}
          value={control}
          selectTextOnFocus={true}
          placeholder="Контроль"
          placeholderTextColor={colors.GRAY_500}
          keyboardType="numeric"
          onSubmitEditing={() => {
            if (!control) setTimeout(() => controlRef?.current?.focus(), constant.refDelay)
            else if (!area) setTimeout(() => areaRef?.current?.focus(), constant.refDelay)
            else handlePressSave()
          }}
        />
        <TouchableOpacity
          style={[styles.btn, (area && control) ? {} : styles.btnDisabled]}
          activeOpacity={constant.activeOpacity}
          disabled={(area && control) ? false : true}
          accessibilityRole="button"
          onPress={handlePressSave}
        >
          <Text style={styles.btnText}>Ок</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tableWrapper}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.tableInner}
        >
          <Thead />
          <FlatList
            // contentContainerStyle={{ flexDirection: 'column' }}
            removeClippedSubviews={false}
            initialNumToRender={1}
            maxToRenderPerBatch={20}
            windowSize={2}
            data={tableData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Tbody area={item} onPressEvent={onPressEvent} />}
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
          <Dialog.Title style={styles.dialogTitle}>{areaSelected.title}</Dialog.Title>
          <View>
            <Dialog.Button label="Завершить контроль" style={styles.dialogBtn} onPress={handlePressFinish} />
          </View>

          <Dialog.Button label="Закрыть" style={styles.dialogClose} onPress={() => setContextModalVisible(!contextModalVisible)} />
        </Dialog.Container>
      </View>
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
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
    marginBottom: 12,
  },
  input: {
    height: 50,
    paddingHorizontal: 10,
    fontSize: sizes.body4,
    backgroundColor: colors.WHITE,
    color: colors.GRAY_700,
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
  btnDisabled: { opacity: 0.6 },
  btnText: {
    color: colors.WHITE,
    fontSize: sizes.body4,
    fontWeight: '400'
  },


  tableWrapper: { flex: 1, flexDirection: 'column', width: '100%', },
  tableInner: { flexGrow: 1, flexDirection: 'column' },

  dialogHeader: { padding: 0, margin: 0, marginBottom: 15, },
  dialogContent: { borderRadius: sizes.radius, backgroundColor: colors.WHITE },
  dialogFooter: { justifyContent: 'center' },
  dialogTitle: { textAlign: 'center', fontSize: sizes.h4, fontWeight: '500', color: colors.GRAY_700 },
  dialogBtn: { fontSize: sizes.body3, color: colors.BLACK, textTransform: 'none' },
  dialogClose: { fontSize: sizes.body4, color: colors.SECONDARY, textTransform: 'none' },

});


export default ControlScreen;