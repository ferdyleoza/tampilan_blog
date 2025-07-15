import React, { useEffect, useState } from 'react';
import {
  getAllKategori,
  createKategori,
  updateKategori,
  deleteKategori,
} from '../services/kategoriAPI';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import Swal from 'sweetalert2';

const Kategori = () => {
  const [kategoriList, setKategoriList] = useState([]);
  const [nama, setNama] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const data = await getAllKategori();
      setKategoriList(data);
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Gagal mengambil data kategori.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nama.trim()) return;

    try {
      if (editingId) {
        await updateKategori(editingId, { nama });
        Swal.fire('Berhasil', 'Kategori berhasil diperbarui.', 'success');
        setEditingId(null);
      } else {
        await createKategori({ nama });
        Swal.fire('Berhasil', 'Kategori berhasil ditambahkan.', 'success');
      }
      setNama('');
      fetchData();
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Gagal menyimpan kategori.', 'error');
    }
  };

  const handleEdit = (kategori) => {
    setNama(kategori.nama);
    setEditingId(kategori._id);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Yakin ingin menghapus?',
      text: 'Data kategori akan dihapus permanen!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      try {
        await deleteKategori(id);
        Swal.fire('Terhapus!', 'Kategori berhasil dihapus.', 'success');
        fetchData();
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Gagal menghapus kategori.', 'error');
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Daftar Kategori</h1>

        <form onSubmit={handleSubmit} className="flex items-center gap-4 mb-8 max-w-xl">
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Nama kategori"
            className="flex-grow px-4 py-2 bg-gray-200 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <button
            type="submit"
            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            {editingId ? 'Update' : 'Tambah'}
          </button>
        </form>

        {loading ? (
          <p className="text-gray-500 italic">Memuat data...</p>
        ) : kategoriList.length === 0 ? (
          <p className="text-gray-500 italic">Tidak ada kategori tersedia.</p>
        ) : (
          <ul className="grid md:grid-cols-2 gap-4">
            {kategoriList.map((kategori) => (
              <li
                key={kategori._id}
                className="p-4 border rounded-lg shadow bg-white flex justify-between items-center"
              >
                <span className="text-gray-800">{kategori.nama}</span>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(kategori)}
                    className="text-gray-600 hover:text-yellow-500 transition"
                    title="Edit"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(kategori._id)}
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

export default Kategori;
