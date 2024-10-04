import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList } from 'react-native';
import axios from 'axios';
import styles from './styles'; 
import { useTheme } from 'react-native-paper';

const WeatherSearch: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<any[]>([]); 
  const theme = useTheme();


  const fetchWeather = async () => {
    if (!city) {
      Alert.alert('Erro', 'Por favor, insira uma cidade.');
      return;
    }

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: city,
          appid: 'b619d00fa5a5670821bf8e06f118e99a', 
          units: 'metric', 
        },
      });
      setWeatherData([response.data]);
      setCity(''); 
    } catch (error) {
      console.error('Erro ao buscar o clima:', error);
      Alert.alert('Erro', 'Não foi possível encontrar a cidade. Verifique o nome e tente novamente.');
    }
  };

  const renderWeatherItem = ({ item }: { item: any }) => (
    <View style={styles.weatherItem}>
      <Text style={styles.cityName}>{item.name}</Text>
      <Text>Temperatura: {item.main.temp} °C</Text>
      <Text>Descrição: {item.weather[0].description}</Text>
    </View>
  );

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Text style={styles.title}>Clima do Destino: Praia ou Chuva?</Text>
      <Text style={styles.instructions}>
        Insira o nome de uma cidade para ver a previsão do tempo.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Digite a cidade"
        value={city}
        onChangeText={(text) => setCity(text)}
      />

      <TouchableOpacity onPress={fetchWeather} style={styles.button}>
        <Text style={styles.buttonText}>Buscar Clima</Text>
      </TouchableOpacity>

      <View style={styles.listContainer}> 
        <FlatList
          data={weatherData}
          renderItem={renderWeatherItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

    </View>
  );
};

export default WeatherSearch;
