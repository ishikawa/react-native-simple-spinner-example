import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { Spinner } from './Spinner';

export default function App() {
  const windowWidth = useWindowDimensions().width;
  const spinnerViewWidth = windowWidth * 0.25;
  const spinnerWidth = windowWidth * 0.025;

  return (
    <View style={styles.container}>
      <Spinner
        width={spinnerWidth}
        color="#f33"
        backgroundColor="#ddd"
        style={{ width: spinnerViewWidth, height: spinnerViewWidth }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
