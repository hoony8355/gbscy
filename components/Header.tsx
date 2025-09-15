
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-teal-600">
          AI 치약 정보 허브
        </Link>
        <div className="space-x-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-lg font-medium pb-1 ${isActive ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-600 hover:text-teal-500'}`
            }
          >
            홈
          </NavLink>
          <NavLink
            to="/generate"
            className={({ isActive }) =>
              `text-lg font-medium pb-1 ${isActive ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-600 hover:text-teal-500'}`
            }
          >
            AI 아티클 생성
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
