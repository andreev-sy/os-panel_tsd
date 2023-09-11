import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { ScanStyles } from '../../themes/styles';
import AreaRow from './partials/AreaRow';


const keyExtractor = (item) => item.id;

function ScanScreen({ navigation }) {
  const data = [];
  for (let i = 1; i <= 5000; i++) {
    data.push({
      id: i,
      name: '000'+i+' (ряд А)',
      scan: i * 2,
    });
  }

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   axiosInstance.get('/api/scan/?user_id=3').then(response => {
  //       setData(response.data);
  //   });
  // }, []);

  // console.log(data);

  return (
      <View style={ ScanStyles.rowWrapper }>
        <FlatList
            initialNumToRender={6}
            removeClippedSubviews={true}
            maxToRenderPerBatch={6}
            windowSize={2}

            data={data}
            keyExtractor={keyExtractor}
            renderItem={({ item }) => (
                <AreaRow navigation={ navigation } item={ item }/>
            )}
        />
      </View>
  );
}

export default ScanScreen;