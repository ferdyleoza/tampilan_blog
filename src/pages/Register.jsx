// src/pages/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/userAPI';
import Swal from 'sweetalert2'; // ← Tambahin ini

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nama: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      console.log('📤 Dikirim:', formData);
      const data = await registerUser(formData);
      console.log('📥 Respon:', data);

      Swal.fire({
        icon: 'success',
        title: 'Registrasi Berhasil',
        text: 'Silakan login dengan akunmu',
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 1500);
    } catch (err) {
      console.error('❌ Error register:', err);
      setError(err.message || 'Register gagal');
      Swal.fire({
        icon: 'error',
        title: 'Gagal Registrasi',
        text: err.message || 'Terjadi kesalahan saat registrasi.',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white px-4">
      <h1 className="text-3xl font-bold mb-6">BLOGCMS</h1>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <input
          type="text"
          name="nama"
          placeholder="Nama"
          value={formData.nama}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded outline-none"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded outline-none"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded outline-none"
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded"
        >
          Register
        </button>
      </form>
      <p className="text-sm mt-4">
        Sudah punya akun?{' '}
        <Link to="/login" className="text-black underline">
          Login di sini
        </Link>
      </p>
    </div>
  );
};

export default Register;
