import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../../../context/AuthContext';

export default function ProfileScreen() {
  const {isLoading, userInfo, logout} = useContext(AuthContext);

  return (
    <View style={{ padding: 10 }}>
       <Spinner visible={isLoading} />
       <Text>Токен {userInfo.access_token}</Text>
       <Text>Логин {userInfo.user.username}</Text>
       <Text>ФИО {userInfo.user.fullname}</Text>
       <Text>self_control {userInfo.user.access.self_control}</Text>
       <Text>edit_products {userInfo.user.access.edit_products}</Text>
       <Text>nullable_area {userInfo.user.access.nullable_area}</Text>
       <Button title="Выход" color="red" onPress={logout} />
    </View>
  );
}
