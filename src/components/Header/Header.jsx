import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-white bg-opacity-30 backdrop-blur-lg border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto p-3 space-y-3 sm:space-y-0">
          {/* Logo */}
          <Link to={'/login'}>
            <img src="../logo.png" alt="Logo" className="w-12 h-12 sm:w-16 sm:h-16" />
          </Link>

          {/* Search Bar */}
          <form className="bg-indigo-100 p-2 sm:p-3 rounded-lg flex items-center w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-full sm:w-64"
            />
            <button>
              <FaSearch className="text-indigo-600" />
            </button>
          </form>

          {/* Navigation Links */}
          <ul className="flex gap-4">
            <Link to={'/dashboard'}>
              <li className="text-white text-sm sm:text-base border p-2 sm:p-3 rounded-lg bg-indigo-600 hover:text-black">
                Dashboard
              </li>
            </Link>
          </ul>
        </div>
      </nav>
    </header>
  );
}
