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
    <div className="ml-64">
      <div className="flex-1 min-h-screen bg-white p-6">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl p-8">
          <h1 className="text-4xl font-extrabold mb-8 text-[#4B2E09] text-center drop-shadow-lg">
            Daftar Kategori
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-4 mb-8 max-w-xl mx-auto"
          >
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Nama kategori"
              className="flex-grow px-4 py-2 bg-[#F5F5F5] text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C19A6B] shadow"
            />
            <button
              type="submit"
              className="bg-[#4B2E09] hover:bg-[#C19A6B] text-white px-4 py-2 rounded-lg shadow-lg hover:scale-105 transition font-semibold"
            >
              {editingId ? 'Update' : 'Tambah'}
            </button>
          </form>
          {loading ? (
            <p className="text-gray-500 italic text-center">Memuat data...</p>
          ) : kategoriList.length === 0 ? (
            <p className="text-gray-500 italic text-center">
              Tidak ada kategori tersedia.
            </p>
          ) : (
            <ul className="grid md:grid-cols-2 gap-6">
              {kategoriList.map((kategori) => (
                <li
                  key={kategori._id}
                  className="p-6 bg-[#F5F5F5] rounded-xl shadow-lg flex justify-between items-center hover:bg-[#C19A6B]/20 hover:scale-105 transition-all duration-300"
                >
                  <span className="text-[#4B2E09] font-semibold">
                    {kategori.nama}
                  </span>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(kategori)}
                      className="text-[#4B2E09] hover:text-[#C19A6B] transition"
                      title="Edit"
                    >
                      <FiEdit2 size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(kategori._id)}
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

export default Kategori;
