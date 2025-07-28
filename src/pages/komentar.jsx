import React, { useEffect, useState } from 'react';
import {
  getAllKomentar,
  createKomentar,
  deleteKomentar,
} from '../services/komentarAPI';
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
      console.error('Gagal fetch komentar:', error);
      Swal.fire('Error', 'Gagal mengambil data komentar.', 'error');
    } finally {
      setLoading(false);
    }
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
    <div className="ml-64">
      <div className="flex-1 min-h-screen bg-white p-6">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl p-8">
          <h1 className="text-4xl font-extrabold mb-8 text-[#4B2E09] text-center drop-shadow-lg">
            Daftar Komentar
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex items-center mb-8 gap-2 max-w-xl mx-auto"
          >
            <input
              type="text"
              placeholder="Tulis komentar..."
              className="w-full px-4 py-2 bg-[#F5F5F5] text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C19A6B] shadow"
              value={newKomentar}
              onChange={(e) => setNewKomentar(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#4B2E09] hover:bg-[#C19A6B] text-white rounded-lg shadow-lg hover:scale-105 transition font-semibold"
            >
              Kirim
            </button>
          </form>
          {loading ? (
            <p className="text-gray-500 italic text-center">
              Memuat komentar...
            </p>
          ) : komentarList.length === 0 ? (
            <p className="text-gray-500 italic text-center">Tidak ada komentar.</p>
          ) : (
            <ul className="grid md:grid-cols-2 gap-6">
              {komentarList.map((komentar) => (
                <li
                  key={komentar._id}
                  className="bg-[#F5F5F5] p-6 rounded-xl shadow-lg flex justify-between items-center hover:bg-[#C19A6B]/20 hover:scale-105 transition-all duration-300"
                >
                  <p className="text-gray-800 font-medium">{komentar.isi}</p>
                  <button
                    onClick={() => handleDelete(komentar._id)}
                    className="text-[#4B2E09] hover:text-red-600 transition"
                    title="Hapus komentar"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Komentar;
