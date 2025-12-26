
import axios from 'axios';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

// Set the API URL based on the environment variable
const getBaseUrl = () => {
  // Use the environment variable defined in .env
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  // Fallback if env var is missing (dev safety)
  if (!apiUrl) {
      if (Platform.OS === 'android') {
        return 'http://10.0.2.2:3000';
      }
      return 'http://localhost:3000';
  }
  
  return apiUrl;
};

export const API_URL = getBaseUrl();

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add token to requests
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
