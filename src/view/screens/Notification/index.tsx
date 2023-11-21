import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, StyleSheet, RefreshControl, Vibration, SafeAreaView } from 'react-native';
import { colors, constant, sizes } from '../../themes/variables';
import Snackbar from 'react-native-snackbar';
import NotificationRow from './partials/NotificationRow';
import createInstance from '../../../helpers/AxiosInstance';
import Spinner from 'react-native-loading-spinner-overlay';
import Notification from '../../components/Notification';

function NotificationScreen({ navigation, route }) {
  const [refreshing, setRefreshing] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const api = createInstance();
 
  //console.log('render NotificationScreen')

  const onPressEvent = useCallback((notification) => {
      api.get(`/notification/update/?id=${notification.id}`)
        .then(res => {
          setNotificationData(res.data);
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
  }, []);
 

  const notificationIndex = async (showSuccess = false) => {
    api.get(`/notification/index/`)
      .then(res => {
        setNotificationData(res.data)
        setIsLoading(false)
        if (showSuccess)
          setTimeout(() => {
            Snackbar.show({ text: 'Данные обновлены', textColor: colors.SUCCESS, backgroundColor: colors.LIGHT_SUCCESS, duration: Snackbar.LENGTH_SHORT });
          }, constant.snackbarDelay)
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
    //console.log('axios useEffect notificationIndex')
    notificationIndex()
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    notificationIndex(true)
    setRefreshing(false)
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <Notification/>
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
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
}


export const styles = StyleSheet.create({
  wrapper: { paddingVertical: sizes.padding, backgroundColor: colors.BG, height: '100%' },
  inner: { paddingHorizontal: sizes.padding, },
});

export default NotificationScreen;