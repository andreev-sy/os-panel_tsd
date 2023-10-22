import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { colors, sizes } from '../../themes/variables';
import MainData from './partials/MainData';
import OtherData from './partials/OtherData/';

function ReviseAreaScreen({ navigation, route }) {

  const [index, setIndex] = useState(0);
  const [routes] = useState([ { key: 'main', title: 'На сверку' }, { key: 'other', title: 'Другие товары' } ]);

  console.log('render ReviseAreaScreen')

  return (
    <TabView
      lazy
      swipeEnabled={false}
      navigationState={{ index, routes }}
      renderTabBar={props => (
        <TabBar
          {...props}
          renderLabel={ ({ focused, route }) => (
            <Text style={[styles.tabBarText, focused ? styles.tabBarTextActive : {} ]}>{route.title}</Text>
          )}
          indicatorStyle={styles.tabBarIndicator}
          style={styles.tabBar}
        />
      )}
      renderScene={SceneMap({ 
        main: () => <MainData navigation={navigation} area={route.params.area} />, 
        other: () => <OtherData navigation={navigation} area={route.params.area} />,
      })}
      onIndexChange={setIndex}
      initialLayout={styles.tabView}
    />
  );
}

export const styles = StyleSheet.create({
  tabView: { width: sizes.width },
  tabBar: { backgroundColor: colors.BG },
  tabBarText: { color: colors.GRAY_600, fontSize: sizes.body3, fontWeight: '400' },
  tabBarTextActive: { color: colors.BLACK },
  tabBarIndicator: { backgroundColor: colors.BLACK, borderRadius: sizes.radius },
});

                        
export default ReviseAreaScreen;