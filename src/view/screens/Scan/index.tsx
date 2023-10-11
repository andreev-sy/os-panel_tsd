import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import AreaRow from './partials/AreaRow';
import { colors, sizes } from '../../themes/variables';
import Dialog from "react-native-dialog";
import Snackbar from "react-native-snackbar";

function ScanScreen({ navigation }) {
  const [listData, setListData] = useState([]);
  const [contextModalVisible, setContextModalVisible] = useState(false);
  const [area, setArea] = useState({});

  const onPressEvent = useCallback((area) => {
    console.log(area)
    setArea(area)
    setContextModalVisible(!contextModalVisible)
  }, []);

  const setData = () => {
    const data = [];
    for (let i = 1; i <= 100; i++) {
      data.push({ id: i, title: 'Зона 000' + i + ' (ряд А)', code: '000' + i, row: '(A)', barcode: '000' + i, scan: i * 2 });
    }
    setListData(data)
  }


  useEffect(() => {
    setData();
  }, [])


  return (
    <View style={styles.wrapper}>
      <FlatList
        contentContainerStyle={styles.inner}
        initialNumToRender={6}
        removeClippedSubviews={true}
        maxToRenderPerBatch={6}
        windowSize={2}
        data={listData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AreaRow navigation={navigation} area={item} onPressEvent={onPressEvent} />}
      />

      <View>
        <Dialog.Container
          headerStyle={{ padding: 0, margin: 0, marginBottom: 15, }}
          contentStyle={{ borderRadius: sizes.radius }}
          footerStyle={{ justifyContent: 'center' }}
          visible={contextModalVisible}
          onBackdropPress={() => setContextModalVisible(!contextModalVisible)}
        >
          <Dialog.Title style={{ textAlign: 'center', fontSize: sizes.h4, fontWeight: '500', color: colors.GRAY_700 }}>{area.title}</Dialog.Title>
          <View>
            <Dialog.Input
              label={false}
              placeholder='Штрихкод зоны'
              underlineColorAndroid='transparent'
              style={styles.input}
            />
            <Dialog.Button
              label="Войти"
              style={{ fontSize: sizes.body3, color: colors.BLACK, textTransform: 'none' }}
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
    paddingVertical: sizes.padding,
    backgroundColor: colors.BG,
  },
  inner: {
    paddingHorizontal: sizes.padding,
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
  },
});

export default ScanScreen;