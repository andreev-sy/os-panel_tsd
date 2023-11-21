import React, { useState, useCallback, useEffect, useRef } from 'react';
import { TextInput, Text, View, FlatList, RefreshControl, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Vibration } from 'react-native';
import Thead from './partials/Thead';
import Tbody from './partials/Tbody';
import { colors, constant, sizes, sounds } from '../../themes/variables';
import Dialog from 'react-native-dialog';
import Snackbar from 'react-native-snackbar';
import Spinner from 'react-native-loading-spinner-overlay';
import createInstance from '../../../helpers/AxiosInstance';
import Notification from '../../components/Notification';

const ControlMainScreen = ({ navigation, route }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [area, setArea] = useState('');
  const [control, setControl] = useState('');
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const areaRef = useRef(null);
  const controlRef = useRef(null);
  const api = createInstance();

  // console.log('render ControlMainScreen')

  const onPressEvent = () => { }

  const handlePressSave = async () => {
    setIsLoading(true)
    api.post(`/control-main/update/`, { area, control })
      .then(res => {
        setTableData(res.data)
        setArea('')
        setControl('')
        setIsLoading(false)
        setTimeout(() => areaRef?.current?.focus(), constant.refDelay)
        setTimeout(() => {
          sounds.beep.play()  
          Snackbar.show({ text: 'Контроль сохранен', textColor: colors.SUCCESS, backgroundColor: colors.LIGHT_SUCCESS, duration: Snackbar.LENGTH_SHORT });
        }, constant.snackbarDelay)
      })
      .catch(e => {
        setIsLoading(false)
        setTimeout(() => areaRef?.current?.focus(), constant.refDelay)
        setTimeout(() => {
          sounds.beep_fail.play()
          Vibration.vibrate(constant.vibroTimeShort)
          Snackbar.show({ text: e.message, textColor: colors.DANGER, backgroundColor: colors.LIGHT_DANGER, duration: Snackbar.LENGTH_SHORT });
        }, constant.snackbarDelay)
      });
  };

  const controlMainIndex = async (showSuccess = false) => {
    api.get(`/control-main/index/`)
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

  useEffect(() => {
    // console.log('axios useEffect controlMainIndex')
    controlMainIndex()
  }, [])


  const onRefresh = useCallback(() => {
    setRefreshing(true)
    controlMainIndex(true)
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
          placeholder="Код зоны"
          placeholderTextColor={colors.GRAY_500}
          value={area}
          selectTextOnFocus={true}
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

      {tableData.length > 0 ?
        <View style={styles.tableWrapper}>
          <ScrollView horizontal={true} contentContainerStyle={styles.tableInner}>
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
        : ''}
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

});


export default ControlMainScreen;