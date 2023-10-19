import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import AreaRow from './partials/AreaRow';
import { colors, constant, sizes } from '../../themes/variables';
import Dialog from "react-native-dialog";
import Snackbar from "react-native-snackbar";
import createInstance from '../../helpers/AxiosInstance';
import Spinner from 'react-native-loading-spinner-overlay';

function ReviseScreen({ navigation }) {
  const [listData, setListData] = useState([]);
  const [modalVisible, setmodalVisible] = useState(false);
  const [areaSelect, setAreaSelect] = useState({});
  const [areaBarcode, setAreaBarcode] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const onPressEvent = useCallback((area) => {
    console.log(area)
    setAreaSelect(area)
    setmodalVisible(!modalVisible)
  }, []);

  const handlePressEnter = () => {
    // сверяем введный ШК с ШК из выбранной зоны
    if (areaBarcode.trim() == areaSelect.barcode) {
      navigation.navigate('ReviseAreaStackRoute', { headerTitle: areaSelect.title, area: areaSelect })
      setmodalVisible(!modalVisible)
      return;
    }

    setAreaBarcode('');
    Snackbar.show({
      text: 'Введенный штрихкод не совпадает с выбраной зоной',
      textColor: colors.DANGER,
      backgroundColor: colors.LIGHT_DANGER,
      duration: Snackbar.LENGTH_SHORT,
    });
  };

  const api = createInstance();
  useEffect(() => {
    api.get('/revise/index/')
      .then(res => { 
        setListData(res.data) 
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
      <FlatList
        contentContainerStyle={styles.inner}
        initialNumToRender={6}
        removeClippedSubviews={true}
        maxToRenderPerBatch={6}
        windowSize={2}
        data={listData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AreaRow area={item} onPressEvent={onPressEvent} />}
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
              // ref={areaScanRef}
              autoFocus={true}
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


    </View>
  );
}


export const styles = StyleSheet.create({
  wrapper: { paddingVertical: sizes.padding, backgroundColor: colors.BG, height: '100%' },
  inner: { paddingHorizontal: sizes.padding, },

  dialogHeader: { padding: 0, margin: 0 },
  dialogContent: { borderRadius: sizes.radius },
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
      color: colors.GRAY_600,
      borderWidth: 1,
      borderColor: colors.GRAY_300,
      borderRadius: 7,
      elevation: 3,
      marginBottom: 12,
  },
});

export default ReviseScreen;