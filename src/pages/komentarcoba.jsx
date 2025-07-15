// src/pages/komentar.jsx
import React, { useEffect, useState } from 'react';
import { getAllKomentar, createKomentar, deleteKomentar } from '../services/komentarAPI';
import { FiTrash2 } from 'react-icons/fi';
import Swal from 'sweetalert2';

const Komentar = () => {
  const [komentarList, setKomentarList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newKomentar, setNewKomentar] = useState('');

  useEffect(() => {
    fetchKomentar();
  }, []);

  const fetchKomentar = async () => {
    try {
      const data = await getAllKomentar();
      setKomentarList(data);
    } catch (error) {
      console.error('Gagal mengambil data komentar:', error);
      Swal.fire('Error', 'Gagal mengambil data komentar.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setNewKomentar(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newKomentar.trim()) {
      Swal.fire('Oops!', 'Komentar tidak boleh kosong.', 'warning');
      return;
    }

    try {
      await createKomentar({ isi: newKomentar });
      setNewKomentar('');
      fetchKomentar();
      Swal.fire('Berhasil', 'Komentar berhasil ditambahkan.', 'success');
    } catch (error) {
      console.error('Gagal menambahkan komentar:', error);
      Swal.fire('Error', 'Gagal menambahkan komentar.', 'error');
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Yakin ingin menghapus?',
      text: 'Komentar akan dihapus secara permanen!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      try {
        await deleteKomentar(id);
        fetchKomentar();
        Swal.fire('Terhapus', 'Komentar berhasil dihapus.', 'success');
      } catch (error) {
        console.error('Gagal menghapus komentar:', error);
        Swal.fire('Error', 'Gagal menghapus komentar.', 'error');
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Daftar Komentar</h1>

        <form onSubmit={handleSubmit} className="flex items-center mb-6 gap-2 max-w-xl">
          <input
            type="text"
            placeholder="Tulis komentar..."
            className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            value={newKomentar}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Kirim
          </button>
        </form>

        {loading ? (
          <p className="text-gray-500 italic">Memuat komentar...</p>
        ) : komentarList.length === 0 ? (
          <p className="text-gray-500 italic">Tidak ada komentar.</p>
        ) : (
          <ul className="grid md:grid-cols-2 gap-4">
            {komentarList.map((komentar) => (
              <li
                key={komentar._id}
                className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
              >
                <p className="text-gray-800">{komentar.isi}</p>
                <button
                  onClick={() => handleDelete(komentar._id)}
                  className="text-gray-500 hover:text-red-600 transition"
                  title="Hapus komentar"
                >
                  <FiTrash2 size={18} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Komentar;
