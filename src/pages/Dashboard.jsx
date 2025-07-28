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
    <div className="ml-64">
      <div className="min-h-screen w-full bg-gray-100 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto bg-gray-50 rounded-xl shadow-2xl p-8 backdrop-blur-md">
          <h1 className="text-4xl font-extrabold mb-4 text-gray-700 text-center drop-shadow-lg">
            Dashboard Overview
          </h1>
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 rounded-xl shadow animate-fade-in">
              <span className="text-2xl">👋</span>
              <span className="text-lg font-semibold text-gray-700">
                Selamat datang di Dashboard! Semoga harimu menyenangkan 😊
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {cards.map((card, index) => (
              <div
                key={index}
                onClick={() => navigate(card.path)}
                className="cursor-pointer bg-gray-200 text-gray-700 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center hover:bg-gray-300 hover:scale-105 hover:shadow-2xl transition-all duration-300"
              >
                <div className="mb-2">{card.icon}</div>
                <h2 className="text-lg font-semibold mb-1">{card.title}</h2>
                <p className="text-3xl font-bold">{card.count}</p>
              </div>
            ))}
          </div>
          {/* Konten tambahan agar bisa scroll ke bawah */}
          <div className="mt-12 space-y-8">
            <div className="bg-gray-200 rounded-xl p-6 shadow text-gray-700">
              <h2 className="text-xl font-bold mb-2">Tips Menulis Artikel Menarik</h2>
              <ul className="list-disc pl-6 text-gray-600">
                <li>Gunakan judul yang memancing rasa penasaran.</li>
                <li>Awali dengan paragraf pembuka yang kuat.</li>
                <li>Gunakan gambar atau ilustrasi pendukung.</li>
                <li>Pastikan isi artikel mudah dipahami dan relevan.</li>
                <li>Akhiri dengan ajakan atau pertanyaan untuk pembaca.</li>
              </ul>
            </div>
            <div className="bg-gray-200 rounded-xl p-6 shadow text-gray-700">
              <h2 className="text-xl font-bold mb-2">Info Kategori Populer</h2>
              <p className="text-gray-600">Kategori yang paling banyak digunakan akan muncul di bagian atas. Pastikan Anda memilih kategori yang sesuai dengan topik artikel Anda.</p>
            </div>
            <div className="bg-gray-200 rounded-xl p-6 shadow text-gray-700">
              <h2 className="text-xl font-bold mb-2">Komentar Terbaru</h2>
              <p className="text-gray-600">Pantau komentar terbaru dari pembaca untuk meningkatkan interaksi dan kualitas konten Anda.</p>
            </div>
            <div className="bg-gray-200 rounded-xl p-6 shadow text-gray-700">
              <h2 className="text-xl font-bold mb-2">Penulis Aktif</h2>
              <p className="text-gray-600">Penulis yang aktif akan mendapatkan badge khusus di profil mereka. Teruslah menulis dan berbagi inspirasi!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
