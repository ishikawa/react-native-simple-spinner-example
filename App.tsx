import React from 'react';
import { StyleSheet, TouchableOpacity, Text, useWindowDimensions, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Spinner } from './Spinner';
import { useState } from 'react';

export default function App() {
  const [animating, setAnimating] = useState(true);
  const windowWidth = useWindowDimensions().width;
  const spinnerWidth = windowWidth * 0.25;
  const spinnerBorderWidth = windowWidth * 0.025;

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Spinner
          animating={animating}
          duration={1500}
          width={spinnerBorderWidth}
          color="#f33"
          backgroundColor="#ddd"
          style={{ width: spinnerWidth, height: spinnerWidth }}
        />
        <TouchableOpacity style={styles.button} onPress={() => setAnimating(!animating)}>
          <Text>{animating ? 'Stop animation' : 'Start animation'}</Text>
        </TouchableOpacity>
      </View>
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
  button: {
    borderRadius: 10,
    backgroundColor: '#ccc',
    padding: 10,
    marginTop: 10,
  },
});
