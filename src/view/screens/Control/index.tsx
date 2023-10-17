import React, { useState, useCallback, useEffect, useRef } from 'react';
import { TextInput, Text, View, FlatList, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import Thead from './partials/Thead';
import Tbody from './partials/Tbody';
import { colors, constant, sizes } from '../../themes/variables';
import Dialog from "react-native-dialog";
import Snackbar from "react-native-snackbar";
import Spinner from 'react-native-loading-spinner-overlay';
import createInstance from '../../helpers/AxiosInstance';

const ControlScreen = () => {
  const [area, setArea] = useState('');
  const [control, setControl] = useState('');
  const [tableData, setTableData] = useState([]);
  const [contextModalVisible, setContextModalVisible] = useState(false);
  const [areaSelected, setAreaSelected] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const areaRef = useRef(null);
  const controlRef = useRef(null);

  console.log('render ControlScreen')

  const onPressEvent = useCallback((area) => {
    console.log(area)
    setAreaSelected(area)
    setContextModalVisible(!contextModalVisible)
  }, []);

  const handlePressSave = () => {
    setIsLoading(true)

    api.post('/control/update/', {
      area, control
    })
      .then(res => {
        setTableData(res.data)
        setArea('')
        setControl('')
        setTimeout(() => areaRef.current.focus(), 150)
        setIsLoading(false)
        Snackbar.show({
          text: 'Контроль сохранен',
          textColor: colors.LIGHT_SUCCESS,
          backgroundColor: colors.SUCCESS,
          duration: Snackbar.LENGTH_SHORT,
        });
      })
      .catch(e => {
        setIsLoading(false)
        setTimeout(() => areaRef.current.focus(), 150)
        Snackbar.show({
          text: e.response.data.msg,
          textColor: colors.LIGHT_DANGER,
          backgroundColor: colors.DANGER,
          duration: Snackbar.LENGTH_SHORT,
        });
      });
  };

  const handlePressFinish = () => {
    Alert.alert("", "Вы точно хотите закончить контроль в зоне?", [
      { text: "Отмена" },
      { text: "Да", onPress: () => finishArea() },
    ])
  };

  const finishArea = () => {
    const index = tableData.findIndex(el => el.id === areaSelected.id);
    if (index !== -1) {
      tableData.splice(index, 1); // Удаляем элемент из массива
      setTableData([...tableData]); // Обновляем состояние массива
    }
    setContextModalVisible(!contextModalVisible)
    setAreaSelected({})

    setTimeout(function () {
      Snackbar.show({
        text: 'Контроль в зоне успешно закончен',
        textColor: colors.SUCCESS,
        backgroundColor: colors.LIGHT_SUCCESS,
        duration: Snackbar.LENGTH_SHORT,
      });
    }, 500)
  }

  const api = createInstance();

  useEffect(() => {
    api.get('/control/index/')
      .then(res => {
        setTableData(res.data)
        console.log(res.data)
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
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          ref={areaRef}
          onChangeText={setArea}
          placeholder="Код зоны"
          value={area}
          selectTextOnFocus={true}
          onSubmitEditing={() => {
            if (!area) setTimeout(() => areaRef.current.focus(), 150)
            else setTimeout(() => controlRef.current.focus(), 150)
          }}
        />
        <TextInput
          style={styles.input}
          ref={controlRef}
          onChangeText={setControl}
          value={control}
          selectTextOnFocus={true}
          placeholder="Контроль"
          keyboardType="numeric"
          onSubmitEditing={() => {
            if (!control) setTimeout(() => controlRef.current.focus(), 150)
            else if (!area) setTimeout(() => areaRef.current.focus(), 150)
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
        <Thead />
        <FlatList
          removeClippedSubviews={false}
          initialNumToRender={1}
          maxToRenderPerBatch={20}
          windowSize={2}
          data={tableData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Tbody area={item} onPressEvent={onPressEvent} />}
        />
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
            <Dialog.Button label="Закончить контроль" style={styles.dialogBtn} onPress={handlePressFinish} />
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
    color: colors.GRAY_600,
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


  tableWrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.WHITE,
    width: '100%',
  },

  dialogHeader: { padding: 0, margin: 0, marginBottom: 15, },
  dialogContent: { borderRadius: sizes.radius },
  dialogFooter: { justifyContent: 'center' },
  dialogTitle: { textAlign: 'center', fontSize: sizes.h4, fontWeight: '500', color: colors.GRAY_700 },
  dialogBtn: { fontSize: sizes.body3, color: colors.BLACK, textTransform: 'none' },
  dialogClose: { fontSize: sizes.body4, color: colors.SECONDARY, textTransform: 'none' },

});


export default ControlScreen;