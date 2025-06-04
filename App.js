import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState } from 'react';
import TempUnitToggle from './tempUnitToggle';
import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity } from 'react-native';
import WeatherAPI from './WeatherAPI';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

const API_URL = 'http://localhost:5000'; //Must set to your own IP if using expo app

const getBackgroundColors = (temp) => {
  if (temp === null) return ['#ccc', '#eee']; // fallback/default
  if (temp <= 0) return ['#74ebd5', '#ACB6E5']; // cold
  if (temp <= 15) return ['#00c6ff', '#0072ff']; // cool
  if (temp <= 25) return ['#f7971e', '#ffd200']; // warm
  return ['#ff512f', '#dd2476']; // hot
};

export default function App() {
  const [unit, setUnit] = useState('C');
  const [temperatureInCelsius, setTemperatureInCelsius] = useState(0);
  const [latitude, setLatitude] = useState(40.7);
  const [longitude, setLongitude] = useState(74);
  const  background = getBackgroundColors(temperatureInCelsius);

  const getDisplayedTemperature = () => {
    if (unit === 'F') {
      return (temperatureInCelsius * 9/5 + 32).toFixed(1);
    }
    return temperatureInCelsius;
  };

  const [input, setInput] = useState('');
  const [data, setData] = useState('');
  const [current, setCurrent] = useState('');
  
  useEffect(() => {load();}, []); //run on app start to load from db

  const post = async () => {
    try {await axios.post(`${API_URL}/api/save`, {value: input});
    } catch (error) {console.error('Could not save!! ', error.message);}
    setCurrent(input);
    coord(); // get coords from city input
    load(); //refresh
  };

  const load = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/data`);
      setData(response.data.values);
    } catch (error) { console.error('Could not load!! ', error.message); }
  };

  const coord = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/coord?city=${current}`);
      //const coord = await response.json();
      //console.log(response.data);
      setLatitude(parseFloat(response.data[0].lat));
      setLongitude(parseFloat(response.data[0].lon));
    } catch (error) { console.error('City not found', error.message);}
  };

  return (
    <View style={styles.container}>
    <LinearGradient colors={background} style={styles.container}>
      <Text style={styles.header}>☆ Weather App! ☆</Text>
      <Text>weather in {current}: </Text>
      <Text style={styles.tempText}>
        Temperature: {getDisplayedTemperature()}°{unit}
      </Text>
      <TempUnitToggle unit={unit} setUnit={setUnit} />

      <FlatList
        renderItem={({item}) => 
        <TouchableOpacity onPress={() => {setCurrent(item.value); coord();}}>
        <Text style={[styles.item,
          current === item.value && styles.selectedItem
         ]} /*onPress={() => removeItem(item.id)}*/>
          {/*item.id*/}{item.value}
        </Text>
        </TouchableOpacity>}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        data={data}
      />
      <TextInput 
        placeholder='Enter City Name'
        value={input}
        onChangeText={setInput}
        style={styles.input}
      />
      
      <Button title="Save!" onPress={post} style={styles.button} color="#333"/>
      {/*<Button title="Load Locations" onPress={load} style={styles.button} color="#333"/>*/}
      <WeatherAPI setTemp={setTemperatureInCelsius} lat={latitude} long = {longitude}/> 
      <StatusBar style="auto" />
    </LinearGradient>
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
  selectedItem: {
    backgroundColor: '#ccc',
  },
});
