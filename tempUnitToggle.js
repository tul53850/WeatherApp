// tempUnitToggle.js
import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const TempUnitToggle = ({ unit, setUnit }) => {
  const isFahrenheit = unit === 'F';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{isFahrenheit ? 'Fahrenheit' : 'Celsius'}</Text>
      <Switch
        value={isFahrenheit}
        onValueChange={() => setUnit(isFahrenheit ? 'C' : 'F')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
});

export default TempUnitToggle;