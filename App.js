import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState } from 'react';
import TempUnitToggle from './tempUnitToggle';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import WeatherAPI from './WeatherAPI';
import axios from 'axios';

const API_URL = 'http://10.250.124.141:5000'; //Must set to your own IP if using expo app

export default function App() {
  const [unit, setUnit] = useState('C');
  const [temperatureInCelsius, setTemperatureInCelsius] = useState(0);

  const getDisplayedTemperature = () => {
    if (unit === 'F') {
      return (temperatureInCelsius * 9/5 + 32).toFixed(1);
    }
    return temperatureInCelsius;
  };

  const [input, setInput] = useState('');
  const [data, setData] = useState('');
  
  useEffect(() => {load();}, []); //run on app start to load from db

  const post = async () => {
    try {await axios.post(`${API_URL}/api/save`, {value: input});
    } catch (error) {console.error('Could not save!! ', error.message);}
    load(); //refresh
  };

  const load = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/data`);
      setData(response.data.values);
    } catch (error) { console.error('Could not load!! ', error.message); }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.tempText}>
        Temperature: {getDisplayedTemperature()}°{unit}
      </Text>
      <TempUnitToggle unit={unit} setUnit={setUnit} />

      <Text style={styles.header}>☆ Weather App ☆</Text>
      <FlatList
        renderItem={({item}) => 
        <Text style={styles.item} /*onPress={() => removeItem(item.id)}*/>
          {/*item.id*/}{item.value}
        </Text>}
        keyExtractor={(item, index) => index.toString()}
        numColumns={1}
        data={data}
      />
      <TextInput 
        placeholder='Enter location name'
        value={input}
        onChangeText={setInput}
        style={styles.input}
      />
      <Button title="Post!" onPress={post} style={styles.button} color="#333"/>
      {/*<Button title="Load Locations" onPress={load} style={styles.button} color="#333"/>*/}
      <WeatherAPI setTemp={setTemperatureInCelsius} /> 
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 30,
    backgroundColor: '#444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tempText: {
    fontSize: 24,
    marginBottom: 20,
  },
  header: {
    fontSize: 30,
    color: 'white',
    paddingBottom: 5
  },
  item: {
    padding: 10,
    margin: 10,
    fontSize: 14,
    height: 60,
    color: 'white',
    textAlign: 'center',
    
    borderWidth: 1,
    borderColor: 'white',
    borderStyle: 'dashed',
  },
  button: {
    paddingBottom: 50,
    paddingTop: 10,
    marginBottom: 10
  },
  input: {
    fontSize: 20,
    padding: 20,
    color: 'white',
  },
});
