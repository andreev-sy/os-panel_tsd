import React, { useState, useCallback, useEffect, useRef } from 'react';
import { SafeAreaView, TextInput, Text, View, FlatList, Alert, StyleSheet, RefreshControl, TouchableOpacity, ScrollView, Vibration } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Dialog from 'react-native-dialog';
import Snackbar from 'react-native-snackbar';
import createInstance from '../../../helpers/AxiosInstance';
import { colors, constant, sizes } from '../../themes/variables';
import Thead from './partials/Thead';
import Tbody from './partials/Tbody';
import Notification from '../../components/Notification';

const ReacountScreen = ({ navigation, route }) => {
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

  console.log('render ReacountScreen')

  const onPressEvent = useCallback((area) => {
    console.log(area)
    setAreaSelected(area)
    setContextModalVisible(!contextModalVisible)
  }, []);

  const handlePressSave = async () => {
    setIsLoading(true)
    api.post(`/recount/update/`, { area, control })
      .then(res => {
        setTableData(res.data)
        setArea('')
        setControl('')
        setIsLoading(false)
        setTimeout(() => areaRef?.current?.focus(), constant.refDelay)
        setTimeout(() => {
          Snackbar.show({ text: 'Пересчет сохранен', textColor: colors.SUCCESS, backgroundColor: colors.LIGHT_SUCCESS, duration: Snackbar.LENGTH_SHORT });
        }, constant.snackbarDelay)
      })
      .catch(e => {
        setIsLoading(false)
        setTimeout(() => areaRef?.current?.focus(), constant.refDelay)
        setTimeout(() => {
          Vibration.vibrate(constant.vibroTimeShort)
          Snackbar.show({ text: e.message, textColor: colors.DANGER, backgroundColor: colors.LIGHT_DANGER, duration: Snackbar.LENGTH_SHORT });
        }, constant.snackbarDelay)
      });
  };

  const handlePressFinish = () => {
    Alert.alert('', 'Вы точно хотите завершить пересчёт в зоне?', [
      { text: 'Отмена' }, { text: 'Да', onPress: () => finishArea() }
    ])
  };

  const finishArea = async () => {
    api.post(`/recount/finish/`, { 'area': areaSelected.id })
      .then(res => {
        console.log(res.data)
        setTableData(res.data);
        setContextModalVisible(!contextModalVisible)
        setAreaSelected({})

        if (res.data.length == 0) navigation.goBack()
        setTimeout(() => {
          Snackbar.show({ text: 'Пересчёт в зоне успешно завершён', textColor: colors.SUCCESS, backgroundColor: colors.LIGHT_SUCCESS, duration: Snackbar.LENGTH_SHORT, });
        }, constant.snackbarDelay)
      })
      .catch(e => {
        setContextModalVisible(!contextModalVisible)
        setTimeout(() => {
          Vibration.vibrate(constant.vibroTimeShort)
          Snackbar.show({ text: e.message, textColor: colors.DANGER, backgroundColor: colors.LIGHT_DANGER, duration: Snackbar.LENGTH_SHORT })
        }, constant.snackbarDelay)
      });
  }

  const recountIndex = async (showSuccess=false) => {
    api.get(`/recount/index/`)
      .then(res => {
        console.log(res.data)
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
          Snackbar.show({ text: e.message, textColor: colors.DANGER, backgroundColor: colors.LIGHT_DANGER, duration: Snackbar.LENGTH_SHORT })
        }, constant.snackbarDelay)
      });
  }

  useEffect(() => {
    console.log('axios useEffect recountIndex')
    recountIndex()
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    recountIndex(true)
    setRefreshing(false)
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <Spinner visible={isLoading} animation="fade" />
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          ref={areaRef}
          onChangeText={setArea}
          value={area}
          placeholder="Код зоны"
          autoCorrect={false}
          editable={tableData ? true : false}
          placeholderTextColor={colors.GRAY_500}
          selectTextOnFocus={true}
          onSubmitEditing={() => {
            if (!area) setTimeout(() => areaRef?.current?.focus(), constant.refDelay)
            else setTimeout(() => controlRef?.current?.focus(), constant.refDelay)
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Контроль"
          autoCorrect={false}
          editable={tableData ? true : false}
          placeholderTextColor={colors.GRAY_500}
          selectTextOnFocus={true}
          keyboardType="numeric"
          ref={controlRef}
          value={control}
          onChangeText={setControl}
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
        <ScrollView horizontal={true} contentContainerStyle={styles.tableInner}>
          <Thead />
          <FlatList
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
            <Dialog.Button label="Завершить пересчет" style={styles.dialogBtn} onPress={handlePressFinish} />
          </View>
          <Dialog.Button label="Закрыть" style={styles.dialogClose} onPress={() => setContextModalVisible(!contextModalVisible)} />
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
  tableWrapper: { flex: 1, flexDirection: 'column', width: '100%' },
  tableInner: { flexGrow: 1, flexDirection: 'column' },

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
  btnDisabled: { opacity: 0.6 },
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

  dialogHeader: { padding: 0, margin: 0, marginBottom: 15, },
  dialogContent: { borderRadius: sizes.radius, backgroundColor: colors.WHITE },
  dialogFooter: { justifyContent: 'center' },
  dialogTitle: { textAlign: 'center', fontSize: sizes.h4, fontWeight: '500', color: colors.GRAY_700 },
  dialogBtn: { fontSize: sizes.body3, color: colors.BLACK, textTransform: 'none' },
  dialogClose: { fontSize: sizes.body4, color: colors.SECONDARY, textTransform: 'none' },

});


export default ReacountScreen;