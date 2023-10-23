import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, Vibration } from 'react-native';
import { colors, constant, sizes } from '../../themes/variables';
import Snackbar from 'react-native-snackbar';
import NotificationRow from './partials/NotificationRow';
import createInstance from '../../../helpers/AxiosInstance';
import Spinner from 'react-native-loading-spinner-overlay';

function NotificationScreen({ navigation, route }) {
  const [notificationData, setNotificationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const api = createInstance();

  console.log('render NotificationScreen')

  const onPressEvent = useCallback((notification) => {
    const index = notificationData.findIndex(el => el.id === notification.id);
    if (index !== -1) {
      api.get(`/notification/update/?id=${notification.id}`)
        .then(res => {
          notificationData[index]['viewed'] = true;
          setNotificationData(notificationData);
          setTimeout(() => {
            Snackbar.show({ text: 'Уведомление прочитано', textColor: colors.SUCCESS, backgroundColor: colors.LIGHT_SUCCESS, duration: Snackbar.LENGTH_SHORT });
          }, constant.snackbarDelay)
        })
        .catch(e => {
          setTimeout(() => {
            Vibration.vibrate(constant.vibroTimeShort)
            Snackbar.show({ text: e.message, textColor: colors.LIGHT_DANGER, backgroundColor: colors.DANGER, duration: Snackbar.LENGTH_SHORT })
          }, constant.snackbarDelay)
        });
    }
  }, []);


  const notificationIndex = () => {
    api.get(`/notification/index/`)
      .then(res => {
        setNotificationData(res.data)
        setIsLoading(false)
      })
      .catch(e => {
        setIsLoading(false)
        setTimeout(() => {
          Vibration.vibrate(constant.vibroTimeShort)
          Snackbar.show({ text: e.message, textColor: colors.LIGHT_DANGER, backgroundColor: colors.DANGER, duration: Snackbar.LENGTH_SHORT })
        }, constant.snackbarDelay)
      });
  }

  useEffect(() => {
    console.log('axios useEffect notificationIndex')
    notificationIndex()
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
  wrapper: { paddingVertical: sizes.padding, backgroundColor: colors.BG },
  inner: { paddingHorizontal: sizes.padding, },
});

export default NotificationScreen;