import React, { useState, useEffect } from 'react';
import { View, ScrollView, FlatList, StyleSheet } from 'react-native';
import { colors, sizes } from '../../../../themes/variables';
import Spinner from 'react-native-loading-spinner-overlay';
import OtherBody from './OtherBody';
import OtherHead from './OtherHead';

function OtherData({ navigation, area }) {
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  console.log('render other');

  useEffect(() => {
    const data = [];
    for (let i = 1; i <= 20; i++) {
      data.push({
        id: i,
        article: 'артикул' + i,
        name: 'наименование' + i,
        scan: (i * 2).toString(),
        barcode: 'штрихкод' + i,
      });
    }
    setTableData(data)
    setIsLoading(false);
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

  tableWrapper: { flex: 1, flexDirection: 'column', backgroundColor: colors.WHITE, width: '100%' },
  tableInner: { flexGrow: 1, flexDirection: 'column' },
});


export default OtherData;