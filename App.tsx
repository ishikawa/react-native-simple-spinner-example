import React from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Spinner } from './Spinner';

export default function App() {
  const windowWidth = useWindowDimensions().width;
  const spinnerWidth = windowWidth * 0.25;
  const spinnerBorderWidth = windowWidth * 0.025;

  return (
    <View style={styles.container}>
      <Spinner
        duration={1500}
        width={spinnerBorderWidth}
        color="#f33"
        backgroundColor="#ddd"
        style={{ width: spinnerWidth, height: spinnerWidth }}
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
