import React, { useState } from 'react';
import { Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { colors, sizes } from '../../themes/variables';
import MainData from './partials/MainData';
import OtherData from './partials/OtherData/';

function ReviseAreaScreen({ navigation, area }) {

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'main', title: 'На сверку' },
    { key: 'other', title: 'Другие товары' },
  ]);

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
            <Text style={{ color: focused ? colors.BLACK : colors.GRAY_600, fontSize: sizes.body3, fontWeight: '600' }}>{route.title}</Text>
          )}
          indicatorStyle={{ backgroundColor: colors.BLACK, borderRadius: sizes.radius }}
          style={{backgroundColor: colors.BG }}
        />
      )}
      renderScene={SceneMap({ main: MainData, other: OtherData })}
      onIndexChange={setIndex}
      initialLayout={{ width: sizes.width }}
    />
  );
}

export default ReviseAreaScreen;