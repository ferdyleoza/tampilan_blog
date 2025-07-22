// src/services/userAPI.js
import axios from 'axios';

const API_URL = 'https://backendblog.up.railway.app/';

export const loginUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/login`, user);
    return response.data;
  } catch (error) {
    console.error('Gagal login user:', error);
    throw error.response?.data || error;
  }
};

export const registerUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/register`, user);
    return response.data;
  } catch (error) {
    console.error('Gagal register user:', error);
    throw error.response?.data || error;
  }
};
