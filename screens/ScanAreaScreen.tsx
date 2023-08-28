import React, { useState } from 'react';
import { View, Text, Switch, TextInput, Button, FlatList } from 'react-native';
import { colors } from './../themes/variables';
import { ScanAreaStyles } from './../themes/styles';

function ScanAreaScreen({ area }) {
  const [isAuto, setIsAuto] = useState(false);
  const [barcode, setBarcode] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleAutoSwitch = () => {
    setIsAuto(!isAuto);
    setQuantity(
      !isAuto ? '1' : ''
    );
  };

  const handleBtnSave = () => {
    setIsAuto(!isAuto);
  };


  const data = [];
  for (let i = 1; i <= 100; i++) {
    data.push({
      id: i,
      article: 'артикул' + i,
      name: 'наименование' + i,
      param1: 'параметр' + i,
      scanCount: i * 2,
      barcode: 'штрихкод' + i,
    });
  }

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', marginBottom: 4, width: 500 }}>
      <Text numberOfLines={1} style={{ flex: 1 }}>{item.article}</Text>
      <Text numberOfLines={1} style={{ flex: 1 }}>{item.name}</Text>
      <Text numberOfLines={1} style={{ flex: 1 }}>{item.param1}</Text>
      <Text numberOfLines={1} style={{ flex: 1 }}>{item.scanCount}</Text>
      <Text numberOfLines={1} style={{ flex: 1 }}>{item.barcode}</Text>
    </View>
  );

  return (
    <View style={ScanAreaStyles.container}>
      {/* <View style={ScanAreaStyles.top}> */}
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          // contentContainerStyle={{ flexDirection: 'row' }}
          renderItem={renderItem}
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={true}
          ListHeaderComponent={() => (
            <View style={{ flexDirection: 'row', marginBottom: 8, width: 500 }}>
                <Text numberOfLines={1} style={{ flex: 1, fontWeight: 'bold' }}>Артикул</Text>
                <Text numberOfLines={1} style={{ flex: 1, fontWeight: 'bold' }}>Название</Text>
                <Text numberOfLines={1} style={{ flex: 1, fontWeight: 'bold' }}>Параметр1</Text>
                <Text numberOfLines={1} style={{ flex: 1, fontWeight: 'bold' }}>Количество</Text>
                <Text numberOfLines={1} style={{ flex: 1, fontWeight: 'bold' }}>Штрихкод</Text>
            </View>
          )}
        />
      {/* </View> */}

      <View style={ScanAreaStyles.bottom}>
        <View style={ScanAreaStyles.rowSwitch}>
          <Text style={ScanAreaStyles.label}>Авто</Text>
          <Switch
            value={isAuto}
            onValueChange={handleAutoSwitch}
            thumbColor={isAuto ? colors.PRIMARY : colors.LIGHT}
          />
        </View>
        <View style={ScanAreaStyles.row}>
          <TextInput
            style={ScanAreaStyles.input}
            value={barcode}
            placeholder="Штрихкод"
            onChangeText={setBarcode}
          />
          <TextInput
            style={ScanAreaStyles.input}
            value={quantity}
            editable={!isAuto}
            placeholder="Кол-во"
            onChangeText={setQuantity}
            keyboardType="numeric"
          />
        </View>
        <View style={ ScanAreaStyles.bottom }>
          {!isAuto &&
              <Button
                onPress={handleBtnSave}
                title="Сохранить"
                color={colors.PRIMARY}
              />
          }
        </View>
      </View>
    </View>
  );
}

export default ScanAreaScreen;