// Descripción: Este archivo contiene la función para obtener datos de criptomonedas desde la API de Coinlore.
import axios from 'axios';
import Cryptocurrency from '../models/Cryptocurrency';

const API_URL = 'https://api.coinlore.net/api/tickers/';

// Define the type for the API response
interface ApiResponse {
  data: Array<{
    id: string;
    name: string;
    symbol: string;
    price_usd: string;  // La API puede devolver el precio como cadena, puede ajustarse segun se quiera 
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
