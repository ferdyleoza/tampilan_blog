// src/services/komentarAPI.js
import axiosInstance from './axiosinstance'; // sesuaikan path kalau perlu

const ENDPOINT = '/komentars'; // supaya gampang diubah kalau perlu

export const getAllKomentar = async () => {
  try {
    const response = await axiosInstance.get(ENDPOINT);
    return response.data.data;
  } catch (error) {
    console.error('Gagal mengambil data komentar:', error);
    throw error;
  }
};

export const createKomentar = async (komentar) => {
  try {
    const response = await axiosInstance.post(ENDPOINT, komentar);
    return response.data.data;
  } catch (error) {
    console.error('Gagal menambahkan komentar:', error);
    throw error;
  }
};

export const updateKomentar = async (id, komentar) => {
  try {
    const response = await axiosInstance.put(`${ENDPOINT}/${id}`, komentar);
    return response.data.data;
  } catch (error) {
    console.error('Gagal mengupdate komentar:', error);
    throw error;
  }
};

export const deleteKomentar = async (id) => {
  try {
    const response = await axiosInstance.delete(`${ENDPOINT}/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Gagal menghapus komentar:', error);
    throw error;
  }
};
