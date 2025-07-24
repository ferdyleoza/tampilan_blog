// src/service/penulis/penulisService.js
import axiosInstance from './axiosinstance'; // pastikan path ini sesuai

const ENDPOINT = '/penulis'; // biar clean dan konsisten

export const getAllPenulis = async () => {
  try {
    const response = await axiosInstance.get(ENDPOINT);
    return response.data.data;
  } catch (error) {
    console.error('Gagal mengambil data penulis:', error);
    throw error;
  }
};

export const createPenulis = async (penulis) => {
  try {
    const response = await axiosInstance.post(ENDPOINT, penulis);
    return response.data.data;
  } catch (error) {
    console.error('Gagal menambahkan penulis:', error);
    throw error;
  }
};

export const updatePenulis = async (id, penulis) => {
  try {
    const response = await axiosInstance.put(`${ENDPOINT}/${id}`, penulis);
    return response.data.data;
  } catch (error) {
    console.error('Gagal mengupdate penulis:', error);
    throw error;
  }
};

export const deletePenulis = async (id) => {
  try {
    const response = await axiosInstance.delete(`${ENDPOINT}/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Gagal menghapus penulis:', error);
    throw error;
  }
};
