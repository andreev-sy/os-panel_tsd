import React, { useState, useCallback, useEffect } from 'react';
import { TextInput, Text, View, FlatList, Alert, StyleSheet, TouchableOpacity, ScrollView, Vibration } from 'react-native';
import Thead from './partials/Thead';
import Tbody from './partials/Tbody';
import { colors, constant, sizes } from '../../themes/variables';
import Dialog from 'react-native-dialog';
import Snackbar from 'react-native-snackbar';
import createInstance from '../../helpers/AxiosInstance';
import Spinner from 'react-native-loading-spinner-overlay';

const ReacountScreen = ({ navigation, route }) => {
  const [text, onChangeText] = useState('');
  const [number, onChangeNumber] = useState('');
  const [tableData, setTableData] = useState([]);
  const [contextModalVisible, setContextModalVisible] = useState(false);
  const [area, setArea] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const api = createInstance();

  console.log('render ReacountScreen')

  const onPressEvent = useCallback((area) => {
    console.log(area)
    setArea(area)
    setContextModalVisible(!contextModalVisible)
  }, []);

  const handlePressFinish = () => {
    Alert.alert('', 'Вы точно хотите завершить пересчёт в зоне?', [
      { text: 'Отмена' }, { text: 'Да', onPress: () => finishArea() }
    ])
  };

  const finishArea = () => {
    const index = tableData.findIndex(el => el.id === area.id);
    if (index !== -1) {
      tableData.splice(index, 1); // Удаляем элемент из массива
      setTableData([...tableData]); // Обновляем состояние массива
    }
    setContextModalVisible(!contextModalVisible)
    setArea({})

    setTimeout(function () {
      Snackbar.show({ text: 'Пересчёт в зоне успешно завершён', textColor: colors.SUCCESS, backgroundColor: colors.LIGHT_SUCCESS, duration: Snackbar.LENGTH_SHORT, });
    }, constant.snackbarDelay)
  }

  useEffect(() => {
    api.get(`/recount/index/`)
      .then(res => { 
        setTableData(res.data) 
        setIsLoading(false)
      })
      .catch(e => {
        setIsLoading(false)
        setTimeout(() => {
          Vibration.vibrate(constant.vibroTimeShort)
          Snackbar.show({ text: e.response.data.msg, textColor: colors.DANGER, backgroundColor: colors.LIGHT_DANGER, duration: Snackbar.LENGTH_SHORT })
        }, constant.snackbarDelay)
      });
  }, [])

 
  return (
    <View style={styles.wrapper}>
      <Spinner visible={isLoading} animation="fade" />
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          placeholder="Зона"
          placeholderTextColor={colors.GRAY_500} 
          value={text}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Количество"
          placeholderTextColor={colors.GRAY_500} 
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={constant.activeOpacity}
          accessibilityRole="button"
        >
          <Text style={styles.btnText}>Ок</Text>
        </TouchableOpacity>
      </View>


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
          <Dialog.Title style={styles.dialogTitle}>{area.title}</Dialog.Title>
          <View>
            <Dialog.Button label="Завершить пересчет" style={styles.dialogBtn} onPress={handlePressFinish} />
          </View>
          <Dialog.Button label="Закрыть" style={styles.dialogClose} onPress={() => setContextModalVisible(!contextModalVisible)} />
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
  tableWrapper: { flex: 1, flexDirection: 'column',  width: '100%' },
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
  dialogContent: { borderRadius: sizes.radius, backgroundColor: colors.WHITE  },
  dialogFooter: { justifyContent: 'center' },
  dialogTitle: { textAlign: 'center', fontSize: sizes.h4, fontWeight: '500', color: colors.GRAY_700 },
  dialogBtn: { fontSize: sizes.body3, color: colors.BLACK, textTransform: 'none' },
  dialogClose: { fontSize: sizes.body4, color: colors.SECONDARY, textTransform: 'none' },

});


export default ReacountScreen;