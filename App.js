import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TempUnitToggle from './tempUnitToggle';

export default function App() {
  const [unit, setUnit] = useState('C');
  const temperatureInCelsius = 22;

  const getDisplayedTemperature = () => {
    if (unit === 'F') {
      return (temperatureInCelsius * 9/5 + 32).toFixed(1);
    }
    return temperatureInCelsius;
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      
      <Text style={styles.tempText}>
        Temperature: {getDisplayedTemperature()}°{unit}
      </Text>
      <TempUnitToggle unit={unit} setUnit={setUnit} />

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
  tempText: {
    fontSize: 24,
    marginBottom: 20,
  },
});
