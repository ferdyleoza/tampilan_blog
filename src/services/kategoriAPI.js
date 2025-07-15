import axios from 'axios';

const API_URL = 'http://localhost:6969/api/kategoris';

export const getAllKategori = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.error('Gagal mengambil data kategori:', error);
    throw error;
  }
};

export const createKategori = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data.data;
  } catch (error) {
    console.error('Gagal menambah kategori:', error);
    throw error;
  }
};

export const updateKategori = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data.data;
  } catch (error) {
    console.error('Gagal mengupdate kategori:', error.response?.data || error);
    throw error;
  }
};

export const deleteKategori = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data; // optional
  } catch (error) {
    console.error('Gagal menghapus kategori:', error.response?.data || error);
    throw error;
  }
};
