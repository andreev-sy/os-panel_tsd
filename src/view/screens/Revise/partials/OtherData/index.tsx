import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, FlatList, StyleSheet, Vibration, RefreshControl, SafeAreaView } from 'react-native';
import { colors, sizes, constant } from '../../../../themes/variables';
import createInstance from '../../../../../helpers/AxiosInstance';
import OtherBody from './OtherBody';
import OtherHead from './OtherHead';
import Snackbar from 'react-native-snackbar';
import { useFocusEffect } from '@react-navigation/native';

function OtherData({ navigation, data, area }) {
  const [refreshing, setRefreshing] = useState(false);
  const [tableData, setTableData] = useState(data);
  const api = createInstance();

  //console.log('render other');

  const reviseOther = async (showSuccess = false) => {
    api.get(`/revise/other/?area_id=${area.id}`)
      .then(res => {
        setTableData(res.data)
        if (showSuccess)
          setTimeout(() => {
            Snackbar.show({ text: 'Данные обновлены', textColor: colors.SUCCESS, backgroundColor: colors.LIGHT_SUCCESS, duration: Snackbar.LENGTH_SHORT });
          }, constant.snackbarDelay)
      })
      .catch(e => {
        setTimeout(() => {
          Vibration.vibrate(constant.vibroTimeShort)
          Snackbar.show({ text: e.message, textColor: colors.DANGER, backgroundColor: colors.LIGHT_DANGER, duration: Snackbar.LENGTH_SHORT, });
        }, constant.snackbarDelay)
      });
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    reviseOther(true)
    setRefreshing(false)
  }, []);

  return (
    <View style={styles.inner}>
      <View style={styles.tableWrapper}>
        <ScrollView horizontal={true} contentContainerStyle={styles.tableInner}>
          <OtherHead />
          <FlatList
            removeClippedSubviews={false}
            initialNumToRender={1}
            maxToRenderPerBatch={20}
            windowSize={2}
            data={tableData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <OtherBody item={item} />}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
        </ScrollView>
      </View>
    </View>
  );
}


export const styles = StyleSheet.create({
  inner: { 
    flex: 1,
    padding: sizes.padding,
  },
  tableWrapper: { flex: 1, flexDirection: 'column', width: '100%' },
  tableInner: { flexGrow: 1, flexDirection: 'column' },
});


export default OtherData;