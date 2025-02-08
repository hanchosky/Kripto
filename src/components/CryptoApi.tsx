// Archivo: CryptoApi.tsx
// Este componente se encarga de obtener y mostrar una lista de criptomonedas.
// Los usuarios pueden buscar criptomonedas y ver detalles básicos como el nombre, símbolo y precio en USD.
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

type Crypto = {
  id: string;
  name: string;
  symbol: string;
  price_usd: string;
};

const CryptoApi = ({ navigation }: { navigation: any }) => {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [filteredCryptos, setFilteredCryptos] = useState<Crypto[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://api.coinlore.net/api/tickers/')
      .then(response => response.json())
      .then(data => {
        if (data && data.data && Array.isArray(data.data)) {
          const formattedData = data.data.map((crypto: any) => ({
            id: crypto.id.toString(),
            name: crypto.name,
            symbol: crypto.symbol,
            price_usd: crypto.price_usd.toString(),
          }));
          setCryptos(formattedData);
          setFilteredCryptos(formattedData);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
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
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate('CryptoDetail', { crypto: item })}
          >
            <Text style={styles.itemText}>
              {item.name} ({item.symbol}) - ${item.price_usd}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  searchInput: { borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 10 },
  itemContainer: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  itemText: { fontSize: 16 },
});

export default CryptoApi;
