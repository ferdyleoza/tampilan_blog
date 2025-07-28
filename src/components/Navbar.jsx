import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 z-50 bg-gradient-to-b from-gray-800 via-gray-500 to-gray-200 flex flex-col justify-between shadow-2xl transition-all duration-300">
      <div>
        <div className="flex items-center gap-3 px-8 py-6 border-b border-gray-300">
          <FaUserCircle className="text-3xl text-gray-100" />
          <Link
            to="/dashboard"
            className="font-bold text-2xl tracking-wide text-gray-100 hover:text-gray-400 transition duration-200"
          >
            BLOGCMS
          </Link>
        </div>
        <nav className="mt-8">
          <ul className="flex flex-col gap-2 px-8">
            <li>
              <Link
                to="/dashboard"
                className="block py-2 px-4 rounded-lg font-semibold text-gray-100 hover:bg-gray-300 hover:text-gray-800 transition"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/artikel"
                className="block py-2 px-4 rounded-lg font-semibold text-gray-100 hover:bg-gray-300 hover:text-gray-800 transition"
              >
                Artikel
              </Link>
            </li>
            <li>
              <Link
                to="/komentar"
                className="block py-2 px-4 rounded-lg font-semibold text-gray-100 hover:bg-gray-300 hover:text-gray-800 transition"
              >
                Komentar
              </Link>
            </li>
            <li>
              <Link
                to="/kategori"
                className="block py-2 px-4 rounded-lg font-semibold text-gray-100 hover:bg-gray-300 hover:text-gray-800 transition"
              >
                Kategori
              </Link>
            </li>
            <li>
              <Link
                to="/penulis"
                className="block py-2 px-4 rounded-lg font-semibold text-gray-100 hover:bg-gray-300 hover:text-gray-800 transition"
              >
                Penulis
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="px-8 py-6 border-t border-gray-300">
        <button
          onClick={handleLogout}
          className="w-full bg-gray-700 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-semibold shadow-lg transition border border-gray-400"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Navbar;
