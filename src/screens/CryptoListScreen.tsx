// Archivo: CryptoListScreen.tsx
// En esta pantalla se muestra una lista de criptomonedas con su nombre, símbolo y precio en USD.
// Los usuarios pueden buscar criptomonedas utilizando una barra de búsqueda.
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { getCryptocurrencies } from '../services/cryptoService';
import Cryptocurrency from '../models/Cryptocurrency';

const CryptoListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [cryptos, setCryptos] = useState<Cryptocurrency[]>([]);
  const [filteredCryptos, setFilteredCryptos] = useState<Cryptocurrency[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCryptocurrencies();
      setCryptos(data);
      setFilteredCryptos(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text === '') {
      setFilteredCryptos(cryptos);
    } else {
      setFilteredCryptos(
        cryptos.filter(crypto =>
          crypto.name.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar Cripto Divisas"
        value={search}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredCryptos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('CryptoDetail', { crypto: item })}>
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.name} ({item.symbol})</Text>
              <Text style={styles.itemText}>Price: ${item.price_usd}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  searchInput: { borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 10, borderRadius: 5 },
  itemContainer: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  itemText: { fontSize: 16 },
});

export default CryptoListScreen;
