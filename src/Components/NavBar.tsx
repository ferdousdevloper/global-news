import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Left Side: Global News */}
        <div className="text-2xl font-bold">
          <Link to="/">GLOBAL NEWS</Link>
        </div>

        {/* Middle: Menu Links (Responsive) */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-400">Home</Link>
          <Link to="/all-news" className="hover:text-gray-400">All News</Link>
          <Link to="/category/politics" className="hover:text-gray-400">Politics</Link>
          <Link to="/category/sports" className="hover:text-gray-400">Sports</Link>
          <Link to="/category/technology" className="hover:text-gray-400">Technology</Link>
          <Link to="/category/entertainment" className="hover:text-gray-400">Entertainment</Link>
        </div>

        {/* Right Side: Login Button */}
        <div className="hidden md:block">
          <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Login
          </Link>
        </div>

        {/* Hamburger Menu Icon (for small screens) */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-700 text-white space-y-2 px-4 py-2">
          <Link to="/" className="block hover:text-gray-400">Home</Link>
          <Link to="/all-news" className="block hover:text-gray-400">All News</Link>
          <Link to="/category/politics" className="block hover:text-gray-400">Politics</Link>
          <Link to="/category/sports" className="block hover:text-gray-400">Sports</Link>
          <Link to="/category/technology" className="block hover:text-gray-400">Technology</Link>
          <Link to="/category/entertainment" className="block hover:text-gray-400">Entertainment</Link>
          <Link to="/login" className="block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
