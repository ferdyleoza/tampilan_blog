// src/service/penulis/penulisService.js
import axios from 'axios';

const API_URL = 'https://backendblog.up.railway.app/api/penulis';

export const getAllPenulis = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.error('Gagal mengambil data penulis:', error);
    throw error;
  }
};

export const createPenulis = async (penulis) => {
  try {
    const response = await axios.post(API_URL, penulis);
    return response.data.data;
  } catch (error) {
    console.error('Gagal menambahkan penulis:', error);
    throw error;
  }
};

export const updatePenulis = async (id, penulis) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, penulis);
    return response.data.data;
  } catch (error) {
    console.error('Gagal mengupdate penulis:', error);
    throw error;
  }
};

export const deletePenulis = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Gagal menghapus penulis:', error);
    throw error;
  }
};


