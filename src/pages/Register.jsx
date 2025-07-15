// src/pages/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://127.0.0.1:6969/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("📤 Dikirim:", formData);
      console.log("📥 Status:", res.status);
      console.log("📥 Respon:", data);

      if (res.ok) {
        console.log("✅ Register berhasil. Redirect ke login...");
        navigate('/login', { replace: true });
      } else {
        setError(data.message || 'Register gagal');
      }
    } catch (err) {
      console.error("❌ Error register:", err);
      setError('Gagal terhubung ke server');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white px-4">
      <h1 className="text-3xl font-bold mb-6">BLOGCMS</h1>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nama"
          value={formData.name}
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
