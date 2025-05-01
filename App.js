import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import TempUnitToggle from './tempUnitToggle';
import { StyleSheet, Text, View } from 'react-native';
import WeatherAPI from './WeatherAPI';

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

      <Text style={styles.tempText}>
        Temperature: {getDisplayedTemperature()}°{unit}
      </Text>
      <TempUnitToggle unit={unit} setUnit={setUnit} />

      <Text>WeatherApp!</Text>
      <WeatherAPI/> 
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
