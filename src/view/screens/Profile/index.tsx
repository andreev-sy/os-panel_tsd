import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, constant, sizes } from '../../themes/variables';
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';

function ProfileScreen({ navigation, route }) {
  const { userInfo, baseUrl, logout } = useContext(AuthContext);

  console.log('render ProfileScreen')

  useEffect(() => {
    console.log('useEffect')

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        console.log(this)
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("GET", "http://135.181.78.213:1333/site/get-message/");
    xhr.setRequestHeader("Accept", "text/event-stream");
    xhr.setRequestHeader("Accept-Encoding", "gzip, deflate");
    xhr.setRequestHeader("Accept-Language", "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7");

    xhr.send();
    

  }, [])



  return (
    <View style={styles.wrapper}>
      <View style={styles.inner}>
        <View>
          <View style={styles.boxWrapper}>
            <Text style={styles.boxTitle}>Аккаунт</Text>
            <View style={styles.boxText}>
              <Text style={styles.boxKey}>Адрес API:</Text>
              <Text style={styles.boxValue}>{baseUrl}</Text>
            </View>
            <View style={styles.boxText}>
              <Text style={styles.boxKey}>ФИО:</Text>
              <Text style={styles.boxValue}>{userInfo.fullname}</Text>
            </View>
            <View style={styles.boxText}>
              <Text style={styles.boxKey}>Логин:</Text>
              <Text style={styles.boxValue}>{userInfo.username}</Text>
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
              <Text style={styles.boxValue}>{userInfo.access.self_control == '1' ? 'Да' : 'Нет'}</Text>
            </View>
            <View style={styles.boxText}>
              <Text style={styles.boxKey}>Редактировать товары:</Text>
              <Text style={styles.boxValue}>{userInfo.access.edit_products == '1' ? 'Да' : 'Нет'}</Text>
            </View>
            <View style={styles.boxText}>
              <Text style={styles.boxKey}>Обнулять зону:</Text>
              <Text style={styles.boxValue}>{userInfo.access.nullable_area == '1' ? 'Да' : 'Нет'}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.btnLogout}
          activeOpacity={constant.activeOpacity}
          accessibilityRole="button"
          onPress={logout}
        >
          <Text style={styles.btnLogoutText}>Выход</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'space-between'
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
})

export default ProfileScreen;
