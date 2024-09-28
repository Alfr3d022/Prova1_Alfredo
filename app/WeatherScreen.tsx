import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Search, Cloud, Droplets, Wind, Thermometer } from 'lucide-react-native';
import axios from 'axios';

interface WeatherCardProps {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city, temperature, condition, humidity, windSpeed }) => (
  <View style={styles.card}>
    <View style={styles.iconContainer}>
      <Cloud color="#FFFFFF" size={40} />
      <Droplets color="#FFFFFF" size={20} style={styles.raindrop} />
    </View>
    <Text style={styles.cityName}>{city}</Text>
    <Text style={styles.temperature}>{temperature}°C</Text>
    <Text style={styles.condition}>{condition}</Text>
    <View style={styles.extraInfo}>
      <View style={styles.infoItem}>
        <Droplets color="#FFFFFF" size={16} />
        <Text style={styles.infoText}>{humidity}%</Text>
      </View>
      <View style={styles.infoItem}>
        <Wind color="#FFFFFF" size={16} />
        <Text style={styles.infoText}>{windSpeed} km/h</Text>
      </View>
    </View>
  </View>
);

export default function WeatherScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherCardProps | null>(null);
  const [city, setCity] = useState('Barretos');

  const fetchWeather = async (cityName: string) => {
    try {
      const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=20b022a906c24dd3877234326242709&q=${cityName}`);
      const data = response.data;
      setWeatherData({
        city: data.location.name,
        temperature: data.current.temp_c,
        condition: data.current.condition.text,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_kph,
      });
    } catch (error) {
      console.error("Error fetching weather data: ", error);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const handleSearch = () => {
    if (searchQuery) {
      setCity(searchQuery);
      setSearchQuery('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Digite aqui"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Search color="#666" size={20} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {weatherData ? (
          <WeatherCard
            city={weatherData.city}
            temperature={weatherData.temperature}
            condition={weatherData.condition}
            humidity={weatherData.humidity}
            windSpeed={weatherData.windSpeed}
          />
        ) : (
          <Text style={styles.loadingText}>Carregando...</Text>
        )}

        <Text style={styles.sectionTitle}>Outras informações</Text>
        <View style={styles.otherInfo}>
          <View style={styles.infoCard}>
            <Thermometer color="#6151C3" size={24} />
            <Text style={styles.infoCardTitle}>Sensação</Text>
            <Text style={styles.infoCardValue}>{weatherData ? `${weatherData.temperature + 2}°C` : 'Loading...'}</Text>
          </View>
          <View style={styles.infoCard}>
            <Droplets color="#6151C3" size={24} />
            <Text style={styles.infoCardTitle}>Umidade</Text>
            <Text style={styles.infoCardValue}>{weatherData ? `${weatherData.humidity}%` : 'Loading...'}</Text>
          </View>
          <View style={styles.infoCard}>
            <Wind color="#6151C3" size={24} />
            <Text style={styles.infoCardTitle}>Vento</Text>
            <Text style={styles.infoCardValue}>{weatherData ? `${weatherData.windSpeed} km/h` : 'Loading...'}</Text>
          </View>
        </View>
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 10,
  },
  card: {
    backgroundColor: '#6151C3',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  raindrop: {
    position: 'absolute',
    bottom: -5,
    right: -5,
  },
  cityName: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  temperature: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  condition: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 10,
  },
  extraInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    color: '#FFFFFF',
    marginLeft: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  otherInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoCard: {
    backgroundColor: '#F0F0F0',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    width: '30%',
  },
  infoCardTitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  infoCardValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#666',
    marginTop: 20,
  },
});
