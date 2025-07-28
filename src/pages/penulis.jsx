import React, { useEffect, useState } from 'react';
import {
  getAllPenulis,
  createPenulis,
  updatePenulis,
  deletePenulis,
} from '../services/penulisAPI';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import Swal from 'sweetalert2';

const Penulis = () => {
  const [penulisList, setPenulisList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ nama: '', email: '' });
  const [editId, setEditId] = useState(null);

  const fetchPenulis = async () => {
    setLoading(true);
    try {
      const data = await getAllPenulis();
      setPenulisList(data);
    } catch (error) {
      console.error('Error saat fetch penulis:', error);
      Swal.fire('Error', 'Gagal mengambil data penulis.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPenulis();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updatePenulis(editId, formData);
        Swal.fire('Berhasil', 'Data penulis berhasil diperbarui.', 'success');
      } else {
        await createPenulis(formData);
        Swal.fire('Berhasil', 'Penulis berhasil ditambahkan.', 'success');
      }
      setFormData({ nama: '', email: '' });
      setEditId(null);
      fetchPenulis();
    } catch (error) {
      console.error('Gagal menyimpan data penulis:', error);
      Swal.fire('Error', 'Gagal menyimpan data.', 'error');
    }
  };

  const handleEdit = (penulis) => {
    setFormData({ nama: penulis.nama, email: penulis.email });
    setEditId(penulis._id);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Yakin ingin menghapus?',
      text: 'Data penulis akan dihapus permanen!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      try {
        await deletePenulis(id);
        Swal.fire('Terhapus!', 'Penulis berhasil dihapus.', 'success');
        fetchPenulis();
      } catch (error) {
        console.error('Gagal menghapus penulis:', error);
        Swal.fire('Error', 'Gagal menghapus penulis.', 'error');
      }
    }
  };

  return (
    <div className="ml-64">
      <div className="flex-1 min-h-screen bg-white p-6">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl p-8">
          <h1 className="text-4xl font-extrabold mb-8 text-[#4B2E09] text-center drop-shadow-lg">
            Daftar Penulis
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4 mb-8 max-w-2xl mx-auto"
          >
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Nama penulis"
              className="flex-1 px-4 py-2 bg-[#F5F5F5] text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C19A6B] shadow"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email penulis"
              className="flex-1 px-4 py-2 bg-[#F5F5F5] text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C19A6B] shadow"
              required
            />
            <button
              type="submit"
              className="bg-[#4B2E09] hover:bg-[#C19A6B] text-white px-6 py-2 rounded-lg shadow-lg hover:scale-105 transition font-semibold"
            >
              {editId ? 'Update' : 'Tambah'}
            </button>
          </form>
          {loading ? (
            <p className="text-gray-500 italic text-center">
              Memuat data penulis...
            </p>
          ) : penulisList.length === 0 ? (
            <p className="text-gray-500 italic text-center">
              Tidak ada data penulis.
            </p>
          ) : (
            <ul className="grid md:grid-cols-2 gap-6">
              {penulisList.map((penulis) => (
                <li
                  key={penulis._id}
                  className="p-6 bg-[#F5F5F5] rounded-xl shadow-lg flex justify-between items-center hover:bg-[#C19A6B]/20 hover:scale-105 transition-all duration-300"
                >
                  <div>
                    <p className="text-[#4B2E09] font-semibold">{penulis.nama}</p>
                    <p className="text-gray-600 text-sm">{penulis.email}</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(penulis)}
                      className="text-[#4B2E09] hover:text-[#C19A6B] transition"
                      title="Edit"
                    >
                      <FiEdit2 size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(penulis._id)}
                      className="text-[#4B2E09] hover:text-red-600 transition"
                      title="Hapus"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Penulis;
