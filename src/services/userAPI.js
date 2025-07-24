// src/services/userAPI.js
import axios from 'axios';

const API_URL = 'https://backendblog.up.railway.app/api';

export const loginUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/login`, user);

    // ✅ Simpan token ke localStorage
    const token = response.data.token;
    if (token) {
      localStorage.setItem('token', token);
    }

    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Unknown error';
    console.error('❌ Gagal login user:', message);
    throw new Error(message);
  }
};

export const registerUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/register`, user);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Unknown error';
    console.error('❌ Gagal register user:', message);
    throw new Error(message);
  }
};
