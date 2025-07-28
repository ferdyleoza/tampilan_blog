import React, { useEffect, useState } from 'react';
import {
  getAllArtikel,
  createArtikel,
  updateArtikel,
  deleteArtikel,
} from '../services/artikelAPI';
import { FiEdit2, FiTrash2, FiFileText } from 'react-icons/fi';
import Swal from 'sweetalert2';

const Artikel = () => {
  const [artikelList, setArtikelList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: '',
    judul: '',
    isi: '',
    tanggal: '',
    id_penulis: '',
    id_kategori: '',
  });
  const [editId, setEditId] = useState(null);

  const fetchArtikel = async () => {
    setLoading(true);
    try {
      const data = await getAllArtikel();
      setArtikelList(data);
    } catch (error) {
      console.error('Error saat fetch artikel:', error);
      Swal.fire('Error', 'Gagal mengambil data artikel.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtikel();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        judul: formData.judul,
        isi: formData.isi,
        tanggal: new Date(formData.tanggal),
        id_penulis: formData.id_penulis,
        id_kategori: formData.id_kategori,
      };

      if (editId) {
        await updateArtikel(editId, payload);
        Swal.fire('Berhasil', 'Artikel berhasil diperbarui.', 'success');
      } else {
        await createArtikel(payload);
        Swal.fire('Berhasil', 'Artikel berhasil ditambahkan.', 'success');
      }

      setFormData({
        id: '',
        judul: '',
        isi: '',
        tanggal: '',
        id_penulis: '',
        id_kategori: '',
      });
      setEditId(null);
      fetchArtikel();
    } catch (error) {
      console.error('Gagal menyimpan data artikel:', error);
      Swal.fire('Error', 'Gagal menyimpan data artikel.', 'error');
    }
  };

  const handleEdit = (artikel) => {
    setFormData({
      id: artikel._id || artikel.id,
      judul: artikel.judul,
      isi: artikel.isi,
      tanggal: artikel.tanggal?.split('T')[0] || '',
      id_penulis: artikel.id_penulis,
      id_kategori: artikel.id_kategori,
    });
    setEditId(artikel._id || artikel.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Yakin ingin menghapus?',
      text: 'Data artikel akan dihapus permanen!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      try {
        await deleteArtikel(id);
        fetchArtikel();
        Swal.fire('Terhapus!', 'Artikel berhasil dihapus.', 'success');
      } catch (error) {
        console.error('Gagal menghapus artikel:', error);
        Swal.fire('Error', 'Gagal menghapus artikel.', 'error');
      }
    }
  };

  return (
    <div className="ml-64">
      <div className="flex-1 min-h-screen bg-gray-100 p-6 animate-fade-in">
        <div className="max-w-7xl mx-auto bg-gray-50 rounded-xl shadow-2xl p-8 animate-slide-up">
          <h1 className="text-4xl font-extrabold mb-8 text-gray-700 text-center drop-shadow-lg flex items-center justify-center gap-3">
            <span className="animate-bounce">
              <FiFileText className="text-gray-400" />
            </span>
            Daftar Artikel
          </h1>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-3xl mx-auto"
          >
            <input
              type="text"
              name="judul"
              value={formData.judul}
              onChange={handleChange}
              placeholder="Judul artikel"
              className="bg-gray-200 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-gray-400 shadow"
              required
            />
            <input
              type="text"
              name="isi"
              value={formData.isi}
              onChange={handleChange}
              placeholder="Isi artikel"
              className="bg-gray-200 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-gray-400 shadow"
              required
            />
            <input
              type="date"
              name="tanggal"
              value={formData.tanggal}
              onChange={handleChange}
              className="bg-gray-200 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-gray-400 shadow"
              required
            />
            <input
              type="text"
              name="id_penulis"
              value={formData.id_penulis}
              onChange={handleChange}
              placeholder="ID Penulis"
              className="bg-gray-200 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-gray-400 shadow"
              required
            />
            <input
              type="text"
              name="id_kategori"
              value={formData.id_kategori}
              onChange={handleChange}
              placeholder="ID Kategori"
              className="bg-gray-200 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-gray-400 shadow"
              required
            />
            <button
              type="submit"
              className="col-span-1 md:col-span-2 bg-gray-700 hover:bg-gray-500 text-white font-semibold py-3 rounded-lg shadow-lg transition flex items-center justify-center gap-2"
            >
              <FiEdit2 className="animate-spin-slow text-gray-200" />
              {editId ? 'Update Artikel' : 'Tambah Artikel'}
            </button>
          </form>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10">
              <span className="animate-spin text-4xl text-gray-400 mb-2">
                <FiFileText />
              </span>
              <p className="text-gray-500 italic text-center">
                Memuat data artikel...
              </p>
            </div>
          ) : artikelList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10">
              <span className="text-4xl text-gray-400 mb-2">
                <FiFileText />
              </span>
              <p className="text-gray-500 italic text-center">
                Tidak ada data artikel.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-300">
              {artikelList.map((artikel) => (
                <li
                  key={artikel._id || artikel.id}
                  className="py-6 px-4 flex flex-col md:flex-row items-start justify-between bg-gray-100 rounded-xl shadow-lg mb-4 hover:bg-gray-200 hover:scale-105 transition-all duration-300 animate-fade-in"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <FiFileText className="text-gray-400 text-2xl" />
                    <p className="text-lg font-semibold mb-1 text-gray-700">
                      {artikel.judul}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{artikel.isi}</p>
                  <p className="text-xs text-gray-500 mb-1">
                    {new Date(artikel.tanggal).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    Penulis ID: {artikel.id_penulis}
                  </p>
                  <p className="text-xs text-gray-500">
                    Kategori ID: {artikel.id_kategori}
                  </p>
                  <div className="flex gap-3 mt-4 md:mt-0">
                    <button
                      onClick={() => handleEdit(artikel)}
                      className="text-gray-700 hover:text-gray-500 transition flex items-center gap-1"
                      title="Edit"
                    >
                      <FiEdit2 /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(artikel._id || artikel.id)}
                      className="text-gray-700 hover:text-red-600 transition flex items-center gap-1"
                      title="Hapus"
                    >
                      <FiTrash2 /> Hapus
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

export default Artikel;
