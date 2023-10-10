import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';
import { colors, constant, sizes } from '../../themes/variables';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../../../context/AuthContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ProfileScreen() {
  const { isLoading, userInfo, logout, baseUrl, changeBaseUrl } = useContext(AuthContext);
  const [newBaseUrl, setNewBaseUrl] = useState(baseUrl);
  
  const handlePressSave = () => changeBaseUrl(newBaseUrl)

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.inner}>
        <Spinner visible={isLoading} />

        <View style={styles.boxWrapper}>
          <Text style={styles.boxTitle}>Аккаунт</Text>
          <View style={styles.boxText}>
            <Text style={styles.boxKey}>ФИО:</Text>
            <Text style={styles.boxValue}>{userInfo.user.fullname}</Text>
          </View>
          <View style={styles.boxText}>
            <Text style={styles.boxKey}>Логин:</Text>
            <Text style={styles.boxValue}>{userInfo.user.username}</Text>
          </View>
          {/* <View style={styles.boxText}>
            <Text style={styles.boxKey}>Токен:</Text>
            <Text style={styles.boxValue}>{userInfo.access_token}</Text>
          </View> */}
        </View>

        <View style={styles.boxWrapper}>
          <Text style={styles.boxTitle}>Разрешения</Text>
          <View style={styles.boxText}>
            <Text style={styles.boxKey}>Контроль за собой:</Text>
            <Text style={styles.boxValue}>{userInfo.user.access.self_control == '1' ? 'Да' : 'Нет'}</Text>
          </View>
          <View style={styles.boxText}>
            <Text style={styles.boxKey}>Редактировать товары:</Text>
            <Text style={styles.boxValue}>{userInfo.user.access.edit_products == '1' ? 'Да' : 'Нет'}</Text>
          </View>
          <View style={styles.boxText}>
            <Text style={styles.boxKey}>Обнулять зону:</Text>
            <Text style={styles.boxValue}>{userInfo.user.access.nullable_area == '1' ? 'Да' : 'Нет'}</Text>
          </View>
        </View>

        <View style={ styles.form }>
          <TextInput
            style={styles.formInput}
            placeholder="Адрес API"
            value={newBaseUrl}
            onChange={setNewBaseUrl}
          />
          <TouchableOpacity
            style={styles.formBtn}
            activeOpacity={constant.activeOpacity}
            accessibilityRole="button"
            onPress={handlePressSave}
          >
            <MaterialCommunityIcons name="content-save" color={colors.SUCCESS} size={20} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.btnLogout}
          activeOpacity={constant.activeOpacity}
          accessibilityRole="button"
          onPress={logout}
        >
          <Text style={styles.btnLogoutText}>Выход</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

export const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: sizes.padding,
    backgroundColor: colors.BG,
    height: '100%',
  },
  inner: {
    paddingHorizontal: sizes.padding,
    height: '100%',
  },
  boxWrapper: {
    padding: sizes.padding,
    paddingTop: sizes.padding * 1.8,
    flexDirection: 'column',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.GRAY_500,
    borderRadius: sizes.radius,
    marginVertical: 12,
  },
  boxTitle: {
    backgroundColor: colors.BG,
    color: colors.GRAY_700,
    paddingHorizontal: 16,
    fontSize: sizes.body2,
    fontWeight: '400',
    position: 'absolute',
    top: -15,
    left: 6,
  },
  boxText: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  boxKey: { color: colors.GRAY_800, fontSize: sizes.body3, fontWeight: '500' },
  boxValue: { color: colors.GRAY_800, fontSize: sizes.body3, fontWeight: '400' },
  btnLogout: {
    borderStyle: 'solid',
    borderWidth: 1,
    height: 40,
    borderRadius: sizes.radius,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.LIGHT_DANGER,
    borderColor: colors.DANGER
  },
  btnLogoutText: { fontSize: sizes.body3, fontWeight: '400', color: colors.DANGER },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  },
  formInput: {
    height: 50,
    paddingHorizontal: 10,
    fontSize: sizes.body3,
    backgroundColor: colors.WHITE,
    color: colors.GRAY_600,
    borderWidth: 1,
    borderColor: colors.GRAY_300,
    borderRadius: sizes.radius,
    elevation: 3,
    marginBottom: 30,
    flexGrow: 1,
  },
  formBtn: {
    width: 50,
    height: 50,
    alignItems: 'center', 
    justifyContent: 'center',
    borderRadius: sizes.radius,
    backgroundColor: colors.LIGHT_SUCCESS,
    borderWidth: 1,
    borderColor: colors.SUCCESS
  },
})