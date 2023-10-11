import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { View, Text, Switch, TextInput, ScrollView, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { colors, constant, sizes } from '../../themes/variables';
import Dialog from "react-native-dialog";
import Snackbar from "react-native-snackbar";
import Tbody from './partials/Tbody';
import Thead from './partials/Thead';

function ScanAreaScreen({ area }) {
  const [isAuto, setIsAuto] = useState(false);
  const [barcode, setBarcode] = useState('');
  const [quantity, setQuantity] = useState('');
  const [contextModalVisible, setContextModalVisible] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [item, setitem] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  
  console.log('render ScanAreaScreen')
  
  const onPressEvent = useCallback((item) => {
    setitem(item)
    setContextModalVisible(!contextModalVisible)
  }, []);

  const handleAutoSwitch = () => {
    if(isEdit) setIsEdit(false);
    if(barcode !== '') setBarcode('');
    if(quantity !== '') setQuantity('');

    setIsAuto(!isAuto);
    setQuantity(!isAuto ? '1' : '');
  };

  const handlePressEdit = () => {
    setBarcode(item.barcode)
    setQuantity(item.scanCount)

    if(!isEdit) setIsEdit(true);
    if(isAuto) setIsAuto(false);
    setContextModalVisible(!contextModalVisible)
  };

  const handlePressDelete = () => {
    Alert.alert("", "Вы точно хотите удалить товар из зоны?", [
        { text: "Отмена" },
        { text: "Да", onPress: () => deleteItem() },
    ])
  };

  const deleteItem = () => {
    const index = tableData.findIndex(el => el.id === item.id);
    if (index !== -1) {
      tableData.splice(index, 1); // Удаляем элемент из массива
      setTableData([...tableData]); // Обновляем состояние массива
    }
    setContextModalVisible(!contextModalVisible)
    
    setTimeout(function(){
      Snackbar.show({
        text: 'Товар успешно удален',
        textColor: colors.SUCCESS,
        backgroundColor: colors.LIGHT_SUCCESS,
        duration: Snackbar.LENGTH_LONG,
        action: {
          text: 'СКРЫТЬ',
          textColor: colors.PRIMARY,
          onPress: () => { /* Do something. */ },
        },
      });
    }, 500)
  }

  const handleBtnSave = () => {
    if(isEdit){
      setIsEdit(false);
      setBarcode('')
      setQuantity('')

      Snackbar.show({
        text: 'Товар успешно изменён',
        textColor: colors.SUCCESS,
        backgroundColor: colors.LIGHT_SUCCESS,
        duration: Snackbar.LENGTH_LONG,
        action: {
          text: 'СКРЫТЬ',
          textColor: colors.PRIMARY,
          onPress: () => { /* Do something. */ },
        },
      });
    }else{
      setBarcode('')
      setQuantity('')

      Snackbar.show({
        text: 'Товар успешно добавлен',
        duration: Snackbar.LENGTH_LONG ,
        action: {
          text: 'СКРЫТЬ',
          textColor: 'green',
          onPress: () => { /* Do something. */ },
        },
      });
    }
    
   

  };

  const setData = () => {
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
  }

  useEffect(() => {
    setData();
  },[])


  return (
    <View style={styles.wrapper}>
      <View style={styles.form}>
        <View style={styles.formSwitch}>
          <Text style={styles.formSwitchText}>Авто</Text>
          <Switch
            value={isAuto}
            onValueChange={handleAutoSwitch}
            thumbColor={isAuto ? colors.PRIMARY : colors.LIGHT}
          />
          {isEdit ? <Text style={{ marginLeft: 16, fontSize: sizes.body4 }}>Редактирование</Text> : ''}
        </View>
        <View style={styles.formRow}>
          <TextInput
            style={[styles.formInput, styles.formInputBarcode ]}
            value={barcode}
            placeholder="Штрихкод"
            onChangeText={setBarcode}
            autoFocus={!isAuto}
          />
          <TextInput
            style={[styles.formInput, styles.formInputCount, !isAuto ? styles.formInputLong : {} ]}
            value={quantity}
            editable={!isAuto}
            autoFocus={isEdit}
            placeholder="Кол-во"
            onChangeText={setQuantity}
            keyboardType="numeric"
          />
          {isAuto &&
            <TouchableOpacity
              style={styles.formBtn}
              activeOpacity={constant.activeOpacity}
              accessibilityRole="button"
              onPress={handleBtnSave}
            >
              <Text style={styles.formBtnText}>Ок</Text>
            </TouchableOpacity>
          }
        </View>
        {!isAuto &&
          <TouchableOpacity
            style={styles.formBottomBtn}
            activeOpacity={constant.activeOpacity}
            accessibilityRole="button"
            onPress={handleBtnSave}
          >
            <Text style={styles.formBtnText}>Сохранить</Text>
          </TouchableOpacity>
        }
      </View>

      <View style={styles.tableWrapper}>
        <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1, flexDirection: 'column' }}>
          <Thead />
          <FlatList
            // contentContainerStyle={{ flexDirection: 'column' }}
            removeClippedSubviews={false}
            initialNumToRender={20}
            maxToRenderPerBatch={20}
            windowSize={2}
            data={tableData}
            keyExtractor={(item) => item.id}
            // ListHeaderComponent={renderHeader}
            renderItem={({ item }) => <Tbody item={item} onPressEvent={onPressEvent} />}
          // showsVerticalScrollIndicator={true}
          // showsHorizontalScrollIndicator={true}
          />
        </ScrollView>
      </View>


      <View>
        <Dialog.Container
          headerStyle={{  padding: 0, margin: 0, marginBottom: 15, }}
          contentStyle={{ borderRadius: sizes.radius }}
          footerStyle={{ justifyContent: 'center' }}
          visible={contextModalVisible}
          onBackdropPress={() => setContextModalVisible(!contextModalVisible)}
        >
          <Dialog.Title style={{ textAlign: 'center', fontSize: sizes.h4, fontWeight: '500' }}>Артикул -{item.article}</Dialog.Title>
          <View>
            <Dialog.Button
              label="Удалить"
              style={{ fontSize: sizes.body3, color: colors.BLACK, textTransform: 'none' }}
              onPress={handlePressDelete}
            />
            <Dialog.Button
              label="Редактировать"
              style={{ fontSize: sizes.body3, color: colors.BLACK, textTransform: 'none' }}
              onPress={handlePressEdit}
            />
          </View>

          <Dialog.Button
            label="Закрыть"
            style={{ fontSize: sizes.body4, color: colors.SECONDARY, textTransform: 'none' }}
            onPress={() => setContextModalVisible(!contextModalVisible)}
          />
        </Dialog.Container>
      </View>

    </View>
  );
}


export const styles = StyleSheet.create({
  wrapper: {
    padding: sizes.padding,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  form: {
    marginBottom: 12,
  },
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
    color: colors.GRAY_600,
    borderWidth: 1,
    borderColor: colors.GRAY_300,
    borderRadius: 7,
    elevation: 3,
  },
  formInputBarcode: { flexBasis: '56%' },
  formInputCount: { flexBasis: '28%', textAlign: 'center' },
  formInputLong: { flexBasis: '42%' },
  formBottomBtn: {
    height: 38,
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
  formBtnText: {
    color: colors.WHITE,
    fontSize: sizes.body4,
    fontWeight: '400'
  },

  tableWrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.WHITE,
    width: '100%',
  }

});


export default ScanAreaScreen;