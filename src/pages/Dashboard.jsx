import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ⬅️ Tambahan penting
import { FiFileText, FiTag, FiMessageSquare, FiUsers } from 'react-icons/fi';
import { getAllArtikel } from '../services/artikelAPI';
import { getAllKategori } from '../services/kategoriAPI';
import { getAllKomentar } from '../services/komentarAPI';
import { getAllPenulis } from '../services/penulisAPI';

const Dashboard = () => {
  const [artikelCount, setArtikelCount] = useState(0);
  const [kategoriCount, setKategoriCount] = useState(0);
  const [komentarCount, setKomentarCount] = useState(0);
  const [penulisCount, setPenulisCount] = useState(0);

  const navigate = useNavigate(); // ⬅️ Inisialisasi navigasi

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artikel = await getAllArtikel();
        const kategori = await getAllKategori();
        const komentar = await getAllKomentar();
        const penulis = await getAllPenulis();

        setArtikelCount(artikel.length);
        setKategoriCount(kategori.length);
        setKomentarCount(komentar.length);
        setPenulisCount(penulis.length);
      } catch (err) {
        console.error('Gagal fetch data dashboard:', err);
      }
    };

    fetchData();
  }, []);

  const cards = [
    {
      title: 'Articles',
      count: artikelCount,
      icon: <FiFileText className="text-blue-500 text-2xl" />,
      path: '/artikel',
    },
    {
      title: 'Categories',
      count: kategoriCount,
      icon: <FiTag className="text-green-500 text-2xl" />,
      path: '/kategori',
    },
    {
      title: 'Comments',
      count: komentarCount,
      icon: <FiMessageSquare className="text-yellow-500 text-2xl" />,
      path: '/komentar',
    },
    {
      title: 'Authors',
      count: penulisCount,
      icon: <FiUsers className="text-red-500 text-2xl" />,
      path: '/penulis',
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.path)} // ⬅️ Navigasi saat diklik
            className="cursor-pointer bg-white border rounded shadow p-4 flex items-center justify-between hover:shadow-md transition"
          >
            <div>
              <h2 className="text-gray-600 text-sm">{card.title}</h2>
              <p className="text-2xl font-semibold">{card.count}</p>
            </div>
            {card.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
