import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Globe } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

const API_KEY = '20b022a906c24dd3877234326242709';

export default function WeatherListScreen() {
  const [citiesWeather, setCitiesWeather] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchWorldWeather();
  }, []);

  const fetchWorldWeather = async () => {
    const cities = ['New York', 'Tokyo', 'London'];
    try {
      const weatherPromises = cities.map(city =>
        axios.get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
      );
      const weatherResponses = await Promise.all(weatherPromises);
      setCitiesWeather(weatherResponses.map(response => response.data));
    } catch (error) {
      console.error('Erro ao buscar o clima:', error);
    }
  };

  const handleSearch = () => {
    router.push('/WeatherScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá User,</Text>
          <Text style={styles.subGreeting}>Descubra o clima</Text>
        </View>
        <Globe color="#000" size={24} />
      </View>

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Pesquise por uma cidade</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Ao redor do mundo</Text>

      <ScrollView style={styles.cityList}>
        {citiesWeather.map((weather, index) => (
          <View key={index} style={styles.cityCard}>
            <View>
              <Text style={styles.countryName}>{weather.location.country}</Text>
              <Text style={styles.cityName}>{weather.location.name}</Text>
            </View>
            <View style={styles.cardRight}>
              <Text style={styles.temperature}>{weather.current.temp_c}°C</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subGreeting: {
    fontSize: 16,
    color: '#666',
  },
  searchButton: {
    backgroundColor: '#6151C3',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cityList: {
    flex: 1,
  },
  cityCard: {
    backgroundColor: '#6151C3',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  countryName: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  cityName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardRight: {
    alignItems: 'flex-end',
  },
  temperature: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
