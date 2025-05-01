import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

export default function WeatherAPI() {

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  // New York
  const latitude = 40.7;
  const longitude = 74;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`,
          {
            headers: {
              'User-Agent': 'MyWeatherApp/1.0 jth@drexel.edu',
            },
          }
        );
        const data = await response.json();
        const now = data.properties.timeseries[0]; // weather now today
        setWeather(now.data.instant.details);
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
  