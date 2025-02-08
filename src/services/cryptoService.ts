// Archivo: cryptoService.ts
import axios from 'axios';
import Cryptocurrency from '../models/Cryptocurrency';

const API_URL = 'https://api.coinlore.net/api/tickers/';

// Define el tipo para la respuesta de la API
interface ApiResponse {
  data: Array<{
    id: string;
    name: string;
    symbol: string;
    price_usd: string;
  }>
}

export const getCryptocurrencies = async (): Promise<Cryptocurrency[]> => {
  const response = await axios.get<ApiResponse>(API_URL);
  return response.data.data.map((crypto) => new Cryptocurrency(
    crypto.id,
    crypto.name,
    crypto.symbol,
    parseFloat(crypto.price_usd)
  ));
};
