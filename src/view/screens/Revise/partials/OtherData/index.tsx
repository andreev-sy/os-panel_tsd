import React, { useState, useEffect } from 'react';
import { View, ScrollView, FlatList, StyleSheet, Vibration } from 'react-native';
import { colors, sizes } from '../../../../themes/variables';
import Spinner from 'react-native-loading-spinner-overlay';
import OtherBody from './OtherBody';
import OtherHead from './OtherHead';
import createInstance from '../../../../helpers/AxiosInstance';
import Snackbar from 'react-native-snackbar';

function OtherData({ navigation, area }) {
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  console.log('render other');

  const api = createInstance();
  useEffect(() => {
    api.get(`/revise/other/?area_id=${area.id}`)
      .then(res => { 
        setTableData(res.data) 
        setIsLoading(false)
      })
      .catch(e => {
        setIsLoading(false)
        setTimeout(() => {
          Vibration.vibrate(constant.vibroTimeShort)
          Snackbar.show({ text: e.response.data.msg, textColor: colors.DANGER, backgroundColor: colors.LIGHT_DANGER, duration: Snackbar.LENGTH_SHORT, });
        }, constant.snackbarDelay)
      });
  }, [])

  return (
    <View style={styles.wrapper}>
        <Spinner visible={isLoading} animation="fade" />
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
            />
          </ScrollView>
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

  tableWrapper: { flexDirection: 'column', backgroundColor: colors.WHITE, width: '100%' },
  tableInner: { flexGrow: 1, flexDirection: 'column' },
});


export default OtherData;