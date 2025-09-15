import React from 'react';
// FIX: Using namespace import for react-router-dom to handle potential module resolution issues.
import * as ReactRouterDOM from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <ReactRouterDOM.Link to="/" className="text-2xl font-bold text-teal-600 hover:text-teal-700 transition-colors">
          🦷 고불소치약 정보 허브
        </ReactRouterDOM.Link>
        <nav className="space-x-6">
          <ReactRouterDOM.NavLink
            to="/"
            className={({ isActive }) =>
              `text-lg font-medium transition-colors ${
                isActive ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-600 hover:text-teal-500'
              }`
            }
          >
            홈
          </ReactRouterDOM.NavLink>
          <ReactRouterDOM.NavLink
            to="/generate"
            className={({ isActive }) =>
              `text-lg font-medium transition-colors ${
                isActive ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-600 hover:text-teal-500'
              }`
            }
          >
            아티클 생성
          </ReactRouterDOM.NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
