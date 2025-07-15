import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Arahkan balik ke login
  };

  return (
    <nav className="bg-black text-white px-8 py-6 shadow-lg flex items-center justify-between text-lg">
      {/* Kiri - Nama Aplikasi */}
      <div className="font-bold text-2xl tracking-wide">
        <Link to="/dashboard" className="hover:text-gray-300">
          BLOGCMS
        </Link>
      </div>

      {/* Tengah - Menu */}
      <div className="flex-1">
        <ul className="flex justify-center gap-10">
          <li>
            <Link to="/dashboard" className="hover:text-gray-300 transition">Dashboard</Link>
          </li>
          <li>
            <Link to="/artikel" className="hover:text-gray-300 transition">Artikel</Link>
          </li>
          <li>
            <Link to="/komentar" className="hover:text-gray-300 transition">Komentar</Link>
          </li>
          <li>
            <Link to="/kategori" className="hover:text-gray-300 transition">Kategori</Link>
          </li>
          <li>
            <Link to="/penulis" className="hover:text-gray-300 transition">Penulis</Link>
          </li>
        </ul>
      </div>

      {/* Kanan - Logout */}
      <div>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
