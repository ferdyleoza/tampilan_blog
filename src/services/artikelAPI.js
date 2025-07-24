import axiosInstance from './axiosinstance';

// ARTIKEL
export const getAllArtikel = async () => {
  try {
    const response = await axiosInstance.get("/artikels");
    return response.data.data || [];
  } catch (error) {
    console.error("Gagal mengambil data artikel:", error);
    throw error;
  }
};

export const createArtikel = async (artikel) => {
  try {
    const response = await axiosInstance.post("/artikels", artikel);
    return response.data.data || response.data;
  } catch (error) {
    console.error("Gagal menambahkan artikel:", error.response?.data || error);
    throw error;
  }
};

export const updateArtikel = async (id, artikel) => {
  try {
    const response = await axiosInstance.put(`/artikels/${id}`, artikel);
    return response.data.data || response.data;
  } catch (error) {
    console.error("Gagal mengupdate artikel:", error.response?.data || error);
    throw error;
  }
};

export const deleteArtikel = async (id) => {
  try {
    const response = await axiosInstance.delete(`/artikels/${id}`);
    return response.data.data || response.data;
  } catch (error) {
    console.error("Gagal menghapus artikel:", error.response?.data || error);
    throw error;
  }
};
