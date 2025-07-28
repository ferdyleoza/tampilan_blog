// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/userAPI';
import Swal from 'sweetalert2'; // ← tambahkan ini

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(formData);
      console.log('📥 Respon login:', data);

      Swal.fire({
        icon: 'success',
        title: 'Berhasil Login',
        text: 'Selamat datang kembali!',
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate('/dashboard');
      }, 1500); // biar animasi Swal selesai dulu
    } catch (err) {
      setError(err.message || 'Login gagal');
      Swal.fire({
        icon: 'error',
        title: 'Login Gagal',
        text: err.message || 'Cek email dan password kamu',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-gray-50 rounded-xl shadow-2xl p-8">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-700 text-center drop-shadow-lg">BLOGCMS</h1>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded outline-none bg-gray-200 text-gray-700 focus:ring-2 focus:ring-gray-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded outline-none bg-gray-200 text-gray-700 focus:ring-2 focus:ring-gray-400"
          />
          <button
            type="submit"
            className="w-full bg-gray-700 hover:bg-gray-500 text-white py-2 rounded font-bold shadow-lg hover:scale-105 transition"
          >
            Login
          </button>
        </form>
        <p className="text-sm mt-4 text-center">
          Belum punya akun?{' '}
          <Link to="/register" className="text-gray-700 underline font-semibold">Register di sini</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
