import React, { useState, useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity, View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import AreaRowComponent from './../components/AreaRowComponent';
import { colors, fonts } from './../themes/variables';
import axiosInstance from './../axiosInstance';

function ScanScreen({ navigation }) {
  // const data = [];
  // for (let i = 1; i <= 100; i++) {
  //   data.push({
  //     id: i,
  //     name: '000'+i+' (ряд А)',
  //     scan: i * 2,
  //   });
  // }

  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance.get('/api/scan/?user_id=3').then(response => {
        setData(response.data);
    });
  }, []);

  console.log(data);

  return (
    <View style={ styles.rowWrapper }>
      <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
              <AreaRowComponent navigation={ navigation } item={ item }></AreaRowComponent>
          )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rowWrapper: {
    flex: 1, 
    flexDirection: 'column', 
    paddingHorizontal: 5, 
    paddingVertical: 5
  },
});


export default ScanScreen;