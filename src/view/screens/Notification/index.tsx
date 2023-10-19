import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, sizes } from '../../themes/variables';
import Snackbar from "react-native-snackbar";
import NotificationRow from './partials/NotificationRow';
import createInstance from '../../helpers/AxiosInstance';
import Spinner from 'react-native-loading-spinner-overlay';

function NotificationScreen() {
  const [notificationData, setNotificationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log('render NotificationScreen')

  const onPressEvent = useCallback((notification) => {
    const index = notificationData.findIndex(el => el.id === notification.id);
    if (index !== -1) {
      api.get('/notification/update/?id=' + notification.id)
        .then(res => {
          notificationData[index]['viewed'] = true;
          setNotificationData(notificationData);

          Snackbar.show({
            text: 'Уведомление прочитано',
            textColor: colors.SUCCESS,
            backgroundColor: colors.LIGHT_SUCCESS,
            duration: Snackbar.LENGTH_SHORT,
          });
        })
        .catch(e => {
          Snackbar.show({
            text: e.response.data.msg,
            textColor: colors.LIGHT_DANGER,
            backgroundColor: colors.DANGER,
            duration: Snackbar.LENGTH_SHORT,
          });
        });
    }
  }, []);

  const api = createInstance();

  useEffect(() => {
    api.get('/notification/index/')
      .then(res => { 
        setNotificationData(res.data) 
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
  }, []);


  return (
    <View style={styles.wrapper}>
      <Spinner visible={isLoading} animation="fade" />
      <FlatList
        contentContainerStyle={styles.inner}
        initialNumToRender={6}
        removeClippedSubviews={true}
        maxToRenderPerBatch={6}
        windowSize={2}
        data={notificationData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificationRow notification={item} onPressEvent={onPressEvent} />}
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