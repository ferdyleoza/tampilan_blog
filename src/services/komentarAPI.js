// src/services/komentarAPI.js
import axios from 'axios';
import Komentar from '../pages/komentar';

const API_URL = 'https://backendblog.up.railway.app/api/komentars';

export const getAllKomentar = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data; // Pastikan backend kirim dalam field `data`
  } catch (error) {
    console.error('Gagal mengambil data komentar:', error);
    throw error;
  }
};

// Benar
export const createKomentar = async (komentar) => {
  try {
    const response = await axios.post(API_URL, komentar); // ✅ Kirim objek komentar
    return response.data.data;
  } catch (error) {
    console.error('Gagal menambahkan komentar:', error);
    throw error;
  }
};

export const updateKomentar = async (id, komentar) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, komentar); // ✅ Sama juga
    return response.data.data;
  } catch (error) {
    console.error('Gagal mengupdate komentar:', error);
    throw error;
  }
};


export const deleteKomentar = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Gagal menghapus komentar:', error);
    throw error;
  }
};
