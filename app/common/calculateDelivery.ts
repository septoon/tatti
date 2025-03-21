import axios from 'axios';
import { point, distance } from '@turf/turf';

const RESTAURANT_COORDS: [number, number] = [44.669924, 34.413533];
const GEOAPIFY_API_KEY = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;

// Функция для получения координат по адресу через Geoapify API
async function getCoordinatesFromAddress(address: string): Promise<[number, number]> {
  try {
    const response = await axios.get(`https://api.geoapify.com/v1/geocode/search`, {
      params: {
        text: address,
        apiKey: GEOAPIFY_API_KEY,
      }
    });

    if (!response.data.features || response.data.features.length === 0) {
      throw new Error('Не удалось найти координаты для указанного адреса.');
    }

    const location = response.data.features[0].geometry.coordinates;
    console.log(`Координаты ${address}:`, location); // Добавлено логирование
    return [location[1], location[0]]; // [широта, долгота] для совместимости с Turf.js
  } catch (error) {
    console.error('Ошибка при получении координат:', error);
    throw new Error('Не удалось получить координаты по адресу.');
  }
}

// Функция расчета расстояния
export async function calculateDeliveryDistance(userAddress: string): Promise<number> {
  const userCoords = await getCoordinatesFromAddress(userAddress);

  const from = point(RESTAURANT_COORDS);
  const to = point(userCoords);

  const distanceKm = distance(from, to, { units: 'kilometers' });

  console.log(`Расстояние между точками: ${distanceKm} км`); // Добавлено логирование
  return distanceKm; // Возвращаем сразу в километрах
}

// Функция расчета стоимости доставки
export async function calculateDeliveryCost(userAddress: string): Promise<number> {
  const distanceKm = await calculateDeliveryDistance(userAddress);

  const baseCost = 0;
  const costPerKm = 30;

  const total = distanceKm < 7 ? 0 : baseCost + costPerKm * distanceKm;

  return Math.round(total);
}