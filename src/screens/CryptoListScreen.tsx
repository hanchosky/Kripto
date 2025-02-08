// Descripción: En esta pantalla muestra una lista de criptomonedas con su nombre, símbolo y precio en USD
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { getCryptocurrencies } from '../services/cryptoService';
import Cryptocurrency from '../models/Cryptocurrency';

const CryptoListScreen: React.FC = () => {
  const [cryptos, setCryptos] = useState<Cryptocurrency[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCryptocurrencies();
      setCryptos(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
      <FlatList
        data={cryptos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name} ({item.symbol})</Text>
            <Text>Price: ${item.price_usd}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default CryptoListScreen;
