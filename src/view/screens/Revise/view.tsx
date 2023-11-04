import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Text, StyleSheet, Vibration, SafeAreaView } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { colors, sizes, constant } from '../../themes/variables';
import MainData from './partials/MainData';
import OtherData from './partials/OtherData/';
import Snackbar from 'react-native-snackbar';
import createInstance from '../../../helpers/AxiosInstance';
import Spinner from 'react-native-loading-spinner-overlay';

function ReviseAreaScreen({ navigation, route }) {
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [routes] = useState([{ key: 'main', title: 'На сверку' }, { key: 'other', title: 'Другие товары' }]);
  const [mainData, setMainData] = useState([]);
  const [otherData, setOtherData] = useState([]);
  const api = createInstance();

  console.log('render ReviseAreaScreen')

  const reviseMain = async (showSuccess = false) => {
    api.get(`/revise/view/?area_id=${route.params.area.id}`)
      .then(res => {
        setMainData(res.data)
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
          Snackbar.show({ text: e.message, textColor: colors.DANGER, backgroundColor: colors.LIGHT_DANGER, duration: Snackbar.LENGTH_SHORT, });
        }, constant.snackbarDelay)
      });
  }

  const reviseOther = async (showSuccess = false) => {
    api.get(`/revise/other/?area_id=${route.params.area.id}`)
      .then(res => {
        setOtherData(res.data)
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

  useFocusEffect(
    useCallback(() => {
      console.log('axios useFocusEffect reviseIndex')
      reviseMain()
      reviseOther()
    }, [])
  );

  useEffect(() => {
    console.log('axios useEffect reviseIndex')
    reviseMain()
    reviseOther()
  }, [])

  return (
    <SafeAreaView style={styles.wrapper}>
      <Spinner visible={isLoading} animation="fade" />
      <TabView
        lazy
        swipeEnabled={false}
        initialLayout={styles.tabView}
        navigationState={{ index, routes }}
        renderTabBar={props => (
          <TabBar
            {...props}
            renderLabel={({ focused, route }) => (
              <Text style={[styles.tabBarText, focused ? styles.tabBarTextActive : {}]}>{route.title}</Text>
            )}
            indicatorStyle={styles.tabBarIndicator}
            style={styles.tabBar}
          />
        )}
        renderScene={SceneMap({
          main: () => <MainData navigation={navigation} data={mainData} area={route.params.area} />,
          other: () => <OtherData navigation={navigation} data={otherData} area={route.params.area} />,
        })}
        onIndexChange={setIndex}
      />
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.BG,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  tabView: { width: sizes.width },
  tabBar: { backgroundColor: colors.BG },
  tabBarText: { color: colors.GRAY_600, fontSize: sizes.body3, fontWeight: '400' },
  tabBarTextActive: { color: colors.BLACK },
  tabBarIndicator: { backgroundColor: colors.BLACK, borderRadius: sizes.radius },
});


export default ReviseAreaScreen;