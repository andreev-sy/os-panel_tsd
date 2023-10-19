import React from 'react';
import { View, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { colors } from '../../themes/variables';

const SplashScreen = () => {
  return (
    <View style={styles.wrapper}>
        <Spinner visible={true} />
    </View>
  );
};

export const styles = StyleSheet.create({
    wrapper: { backgroundColor: colors.BG, flex: 1, justifyContent: 'center' },
});

export default SplashScreen;