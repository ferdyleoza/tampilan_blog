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
    <div className="bg-gray-100 min-h-screen w-full p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Daftar Penulis</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            placeholder="Nama penulis"
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email penulis"
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
          />
          <button
            type="submit"
            className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            {editId ? 'Update' : 'Tambah'}
          </button>
        </form>

        {loading ? (
          <p className="text-gray-500 italic">Memuat data penulis...</p>
        ) : penulisList.length === 0 ? (
          <p className="text-gray-500 italic">Tidak ada data penulis.</p>
        ) : (
          <ul className="grid md:grid-cols-2 gap-4">
            {penulisList.map((penulis) => (
              <li
                key={penulis._id}
                className="p-4 bg-white rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <p className="text-gray-800 font-semibold">{penulis.nama}</p>
                  <p className="text-gray-600 text-sm">{penulis.email}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(penulis)}
                    className="text-gray-600 hover:text-yellow-500 transition"
                    title="Edit"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(penulis._id)}
                    className="text-gray-600 hover:text-red-600 transition"
                    title="Hapus"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Penulis;
