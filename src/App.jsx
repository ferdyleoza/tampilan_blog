// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Penulis from './pages/penulis';
import Artikel from './pages/artikel';
import Kategori from './pages/kategori';
import Komentar from './pages/komentar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

function AppRoutes() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!isAuthPage && <Navbar />}
      <div className="container mx-auto p-4">
        <Routes>
          {/* Default redirect ke register */}
          <Route path="/" element={<Navigate to="/register" />} />

          {/* Route Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Route App */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/penulis" element={<Penulis />} />
          <Route path="/artikel" element={<Artikel />} />
          <Route path="/kategori" element={<Kategori />} />
          <Route path="/komentar" element={<Komentar />} />

          {/* 404 Not Found */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center flex-col">
                <h1 className="text-2xl font-bold">404 - Halaman Tidak Ditemukan</h1>
                <p className="text-red-500">Route tidak dikenali</p>
              </div>
            }
          />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
