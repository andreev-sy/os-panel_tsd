import React, { useState } from 'react';
import { View, Text, Switch, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, constant, sizes } from '../../themes/variables';
import Tbody from './partials/Tbody';
import Thead from './partials/Thead';

const keyExtractor = (item) => item.id;
const renderHeader = () => <Thead />;
const renderItem = ({ item }) => <Tbody item={item} />;

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
    <View style={styles.wrapper}>
      <View style={styles.form}>
        <View style={styles.formSwitch}>
          <Text style={styles.formSwitchText}>Авто</Text>
          <Switch
            value={isAuto}
            onValueChange={handleAutoSwitch}
            thumbColor={isAuto ? colors.PRIMARY : colors.LIGHT}
          />
        </View>
        <View style={styles.formRow}>
          <TextInput
            style={[styles.formInput, styles.formInputBarcode]}
            value={barcode}
            placeholder="Штрихкод"
            onChangeText={setBarcode}
            autoFocus={isAuto}
          />
          <TextInput
            style={[styles.formInput, styles.formInputCount]}
            value={quantity}
            editable={!isAuto}
            placeholder="Кол-во"
            onChangeText={setQuantity}
            keyboardType="numeric"
          />
          {isAuto &&
            <TouchableOpacity
              style={styles.formBtn}
              activeOpacity={constant.activeOpacity}
              accessibilityRole="button"
              onPress={handleBtnSave}
            >
              <Text style={styles.formBtnText}>Ок</Text>
            </TouchableOpacity>
          }
        </View>
        {!isAuto &&
          <TouchableOpacity
            style={styles.formBottomBtn}
            activeOpacity={constant.activeOpacity}
            accessibilityRole="button"
            onPress={handleBtnSave}
          >
            <Text style={styles.formBtnText}>Сохранить</Text>
          </TouchableOpacity>
        }
      </View>

      <View style={styles.tableWrapper}>
        <FlatList
          // contentContainerStyle={{ flexDirection: 'row' }}
          initialNumToRender={1}
          removeClippedSubviews={true}
          maxToRenderPerBatch={1}
          windowSize={1}
          numColumns={5}
          data={data}
          keyExtractor={keyExtractor}
          ListHeaderComponent={renderHeader}
          renderItem={renderItem}
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={true}
        />

      </View>
    </View>
  );
}


export const styles = StyleSheet.create({
  wrapper: {
    padding: sizes.padding,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  form: {
    marginBottom: 12,
  },
  formSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  formSwitchText: {
    fontSize: sizes.body3,
    fontWeight: '500',
    color: colors.GRAY_700
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
  },
  formInput: {
    height: 40,
    paddingHorizontal: 10,
    fontSize: sizes.body4,
    backgroundColor: colors.WHITE,
    color: colors.GRAY_600,
    borderWidth: 1,
    borderColor: colors.GRAY_300,
    borderRadius: 7,
    elevation: 3,
  },
  formInputBarcode: { flexBasis: '56%' },
  formInputCount: { flexBasis: '28%', textAlign: 'center' },
  formBottomBtn: {
    height: 38,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.PRIMARY,
    borderRadius: sizes.radius,
    marginTop: 8,
  },
  formBtn: {
    height: 38,
    width: 38,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.PRIMARY,
    borderRadius: sizes.radius,
  },
  formBtnText: {
    color: colors.WHITE,
    fontSize: sizes.body4,
    fontWeight: '400'
  },

  tableWrapper: {
    flex: 1,
  }

});


export default ScanAreaScreen;