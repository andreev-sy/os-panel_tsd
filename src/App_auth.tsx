import * as React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AuthContext = React.createContext();

function HomeScreen() {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View style={{ padding: 4 }}>
      <Text>Signed in!</Text>
      <Button title="Выйти" onPress={signOut} />
    </View>
  );
}

function SignInScreen() {
  const [username, setUsername] = React.useState('admin');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

  return (
    <View style={{ padding: 4 }}>
      <TextInput
        placeholder="Логин"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Войти" onPress={() => signIn({ username, password })} />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isSignout: false,
      userToken: null,
    }
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        const response = await fetch('http://135.181.78.213:1333/api/auth/login/?username='+data.username+'&password='+data.password, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        const auth_result = await response.json()

        console.log(auth_result)
        dispatch({ type: 'SIGN_IN', token: auth_result.token });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          { 
            state.userToken == null ? 
            (
                <Stack.Screen
                    name="Авторизация"
                    component={SignInScreen}
                />
            ) : (  <Stack.Screen name="Главная" component={HomeScreen} /> )
          }
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
