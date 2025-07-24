import axiosInstance from './axiosinstance'; // pastikan path ini sesuai

// GET semua kategori
export const getAllKategori = async () => {
  try {
    const response = await axiosInstance.get('/kategoris');
    return response.data.data;
  } catch (error) {
    console.error('Gagal mengambil data kategori:', error);
    throw error;
  }
};

// POST kategori baru
export const createKategori = async (data) => {
  try {
    const response = await axiosInstance.post('/kategoris', data);
    return response.data.data;
  } catch (error) {
    console.error('Gagal menambah kategori:', error);
    throw error;
  }
};

// PUT update kategori
export const updateKategori = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/kategoris/${id}`, data);
    return response.data.data;
  } catch (error) {
    console.error('Gagal mengupdate kategori:', error.response?.data || error);
    throw error;
  }
};

// DELETE kategori
export const deleteKategori = async (id) => {
  try {
    const response = await axiosInstance.delete(`/kategoris/${id}`);
    return response.data;
  } catch (error) {
    console.error('Gagal menghapus kategori:', error.response?.data || error);
    throw error;
  }
};
