import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

const API_URL = 'http://10.250.124.141:5000'; //Must set to your own IP if using expo app
//Jason's Component <3
export default function WeatherAPI({setTemp}) {

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  // New York
  const latitude = 40.7;
  const longitude = 74;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`${API_URL}/api/weather?lat=${latitude}&long=${longitude}`);
        const data = await response.json();
        const now = data.properties.timeseries[0]; // weather now today
        setWeather(now.data.instant.details);
        setTemp(now.data.instant.details.air_temperature);
      } catch (error) {
        console.error('Failed to fetch weather:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.centered} size="large" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather at {latitude}, {longitude}</Text>
      <Text>Temperature: {weather.air_temperature} °C</Text>
      <Text>Humidity: {weather.relative_humidity} %</Text>
      <Text>Wind Speed: {weather.wind_speed} m/s</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { padding: 20, marginTop: 50 },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  });
  