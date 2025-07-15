import React, { useEffect, useState } from 'react';
import {
  getAllArtikel,
  createArtikel,
  updateArtikel,
  deleteArtikel,
} from '../services/artikelAPI';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
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
    <div className="bg-gray-100 min-h-screen text-gray-800 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-md shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6">Daftar Artikel</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-8">
          <input
            type="text"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            placeholder="Judul artikel"
            className="bg-gray-100 p-3 rounded border"
            required
          />
          <input
            type="text"
            name="isi"
            value={formData.isi}
            onChange={handleChange}
            placeholder="Isi artikel"
            className="bg-gray-100 p-3 rounded border"
            required
          />
          <input
            type="date"
            name="tanggal"
            value={formData.tanggal}
            onChange={handleChange}
            className="bg-gray-100 p-3 rounded border"
            required
          />
          <input
            type="text"
            name="id_penulis"
            value={formData.id_penulis}
            onChange={handleChange}
            placeholder="ID Penulis"
            className="bg-gray-100 p-3 rounded border"
            required
          />
          <input
            type="text"
            name="id_kategori"
            value={formData.id_kategori}
            onChange={handleChange}
            placeholder="ID Kategori"
            className="bg-gray-100 p-3 rounded border"
            required
          />
          <button
            type="submit"
            className="col-span-2 bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 rounded transition"
          >
            {editId ? 'Update Artikel' : 'Tambah Artikel'}
          </button>
        </form>

        {loading ? (
          <p className="text-gray-500 italic">Memuat data artikel...</p>
        ) : artikelList.length === 0 ? (
          <p className="text-gray-500 italic">Tidak ada data artikel.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {artikelList.map((artikel) => (
              <li
                key={artikel._id || artikel.id}
                className="py-4 px-2 flex items-start justify-between hover:bg-gray-50 rounded transition"
              >
                <div>
                  <p className="text-lg font-semibold">{artikel.judul}</p>
                  <p className="text-sm text-gray-600">{artikel.isi}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(artikel.tanggal).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500">Penulis ID: {artikel.id_penulis}</p>
                  <p className="text-xs text-gray-500">Kategori ID: {artikel.id_kategori}</p>
                </div>
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={() => handleEdit(artikel)}
                    className="text-gray-600 hover:text-black text-lg"
                    title="Edit"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => handleDelete(artikel._id || artikel.id)}
                    className="text-gray-600 hover:text-black text-lg"
                    title="Hapus"
                  >
                    <FiTrash2 />
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

export default Artikel;
