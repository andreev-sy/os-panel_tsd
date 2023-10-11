import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import NotyRow from './partials/NotyRow';
import { colors, sizes } from '../../themes/variables';
import Dialog from "react-native-dialog";
import Snackbar from "react-native-snackbar";

function NotificationScreen() {
  const [listData, setListData] = useState([]);
  console.log('render NotificationScreen')

  const onPressEvent = useCallback((noty) => {
    const index = listData.findIndex(el => el.id === noty.id);
    if (index !== -1) {
      noty.viewed = true;
      listData[index] = noty;
      setListData([...listData]);

      Snackbar.show({
        text: 'Уведомление прочитано',
        textColor: colors.SUCCESS,
        backgroundColor: colors.LIGHT_SUCCESS,
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }, []);

  const setData = () => {
    const data = [];
    for (let i = 1; i <= 100; i++) {
      data.push({ 
        id: i, 
        text: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. ', 
        viewed: i % 2 == 0 ? false : true
      });
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
        renderItem={({ item }) => <NotyRow noty={item} onPressEvent={onPressEvent} />}
      />
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
});

export default NotificationScreen;