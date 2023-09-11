import React, { useState } from 'react';
import { View, Text, Switch, TextInput, Button, FlatList } from 'react-native';
import { colors } from '../../themes/variables';
import { ScanStyles } from '../../themes/styles';
import TableRow from './partials/TableRow';
import TableHeader from './partials/TableHeader';

const keyExtractor = (item) => item.id;
const renderHeader = () => <TableHeader />;
const renderItem = ({ item }) => <TableRow item={item} />;

function ScanAreaScreen({ area }) {
  const [isAuto, setIsAuto] = useState(false);
  const [barcode, setBarcode] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleAutoSwitch = () => {
    setIsAuto(!isAuto);
    setQuantity(!isAuto ? '1' : '');
  };

  const handleBtnSave = () => { };


  const data = [];
  for (let i = 1; i <= 10000; i++) {
    data.push({
      id: i,
      article: 'артикул' + i,
      name: 'наименование' + i,
      param1: 'параметр' + i,
      scanCount: i * 2,
      barcode: 'штрихкод' + i,
    });
  }

  return (
    <View style={ScanStyles.container}>
      {/* <View style={ScanStyles.top}> */}
        <FlatList
          // contentContainerStyle={{ flexDirection: 'row' }}
          initialNumToRender={6}
          removeClippedSubviews={true}
          maxToRenderPerBatch={6}
          windowSize={2}
          
          data={data}
          keyExtractor={keyExtractor}
          ListHeaderComponent={renderHeader}
          renderItem={renderItem}
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={true}
          
        />
      {/* </View> */}

      <View style={ScanStyles.bottom}>
        <View style={ScanStyles.rowSwitch}>
          <Text style={ScanStyles.label}>Авто</Text>
          <Switch
            value={isAuto}
            onValueChange={handleAutoSwitch}
            thumbColor={isAuto ? colors.PRIMARY : colors.LIGHT}
          />
        </View>
        <View style={ScanStyles.row}>
          <TextInput
            style={ScanStyles.input}
            value={barcode}
            placeholder="Штрихкод"
            onChangeText={setBarcode}
          />
          <TextInput
            style={ScanStyles.input}
            value={quantity}
            editable={!isAuto}
            placeholder="Кол-во"
            onChangeText={setQuantity}
            keyboardType="numeric"
          />
        </View>
        <View style={ ScanStyles.bottom }>
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