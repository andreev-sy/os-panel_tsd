import React from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const SplashScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
          <Spinner visible={true} />
    </View>
  );
};

export default SplashScreen;