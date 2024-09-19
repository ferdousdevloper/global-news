import React, { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user, logOut } = useContext(AuthContext) || {}; // Assuming user and logout are provided

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    if (logOut) {
      try {
        await logOut();
        // Handle successful logout (e.g., redirect to homepage or show a message)
      } catch (error) {
        console.error("Failed to log out", error);
      }
    }
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Left Side: Global News */}
        <div className="text-2xl font-bold">
          <NavLink to="/">
            <h1 className="text-center text-4xl font-bold tracking-widest">
              <span className="text-[#02AA08]">Global</span> News
            </h1>
          </NavLink>
        </div>

        {/* Middle: Menu Links (Responsive) */}
        <div className="hidden md:flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-2 py-1 rounded ${
                isActive
                  ? "bg-[#02AA08] text-white"
                  : "hover:bg-[#02AA08] hover:text-white"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/all-news"
            className={({ isActive }) =>
              `px-2 py-1 rounded ${
                isActive
                  ? "bg-[#02AA08] text-white"
                  : "hover:bg-[#02AA08] hover:text-white"
              }`
            }
          >
            All News
          </NavLink>
          <NavLink
            to="/category/politics"
            className={({ isActive }) =>
              `px-2 py-1 rounded ${
                isActive
                  ? "bg-[#02AA08] text-white"
                  : "hover:bg-[#02AA08] hover:text-white"
              }`
            }
          >
            Politics
          </NavLink>
          <NavLink
            to="/category/sports"
            className={({ isActive }) =>
              `px-2 py-1 rounded ${
                isActive
                  ? "bg-[#02AA08] text-white"
                  : "hover:bg-[#02AA08] hover:text-white"
              }`
            }
          >
            Sports
          </NavLink>
          <NavLink
            to="/category/technology"
            className={({ isActive }) =>
              `px-2 py-1 rounded ${
                isActive
                  ? "bg-[#02AA08] text-white"
                  : "hover:bg-[#02AA08] hover:text-white"
              }`
            }
          >
            Technology
          </NavLink>
          <NavLink
            to="/category/entertainment"
            className={({ isActive }) =>
              `px-2 py-1 rounded ${
                isActive
                  ? "bg-[#02AA08] text-white"
                  : "hover:bg-[#02AA08] hover:text-white"
              }`
            }
          >
            Entertainment
          </NavLink>
        </div>

        {/* Right Side: Login/Logout Button */}
        <div className="hidden md:block">
          {user ? (
            <button
              onClick={handleLogout}
              className="block px-4 py-2 rounded bg-[#02AA08] hover:bg-[#1b5c1d] text-white"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? "bg-[#02AA08]" : "bg-[#02AA08] hover:bg-[#1b5c1d]"
                } text-white px-8`
              }
            >
              Login
            </NavLink>
          )}
        </div>

        {/* Hamburger Menu Icon (for small screens) */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-700 text-white space-y-2 px-4 py-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-2 py-1 rounded ${
                isActive
                  ? "bg-[#02AA08] text-white"
                  : "hover:bg-[#02AA08] hover:text-white"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/all-news"
            className={({ isActive }) =>
              `block px-2 py-1 rounded ${
                isActive
                  ? "bg-[#02AA08] text-white"
                  : "hover:bg-[#02AA08] hover:text-white"
              }`
            }
          >
            All News
          </NavLink>
          <NavLink
            to="/category/politics"
            className={({ isActive }) =>
              `block px-2 py-1 rounded ${
                isActive
                  ? "bg-[#02AA08] text-white"
                  : "hover:bg-[#02AA08] hover:text-white"
              }`
            }
          >
            Politics
          </NavLink>
          <NavLink
            to="/category/sports"
            className={({ isActive }) =>
              `block px-2 py-1 rounded ${
                isActive
                  ? "bg-[#02AA08] text-white"
                  : "hover:bg-[#02AA08] hover:text-white"
              }`
            }
          >
            Sports
          </NavLink>
          <NavLink
            to="/category/technology"
            className={({ isActive }) =>
              `block px-2 py-1 rounded ${
                isActive
                  ? "bg-[#02AA08] text-white"
                  : "hover:bg-[#02AA08] hover:text-white"
              }`
            }
          >
            Technology
          </NavLink>
          <NavLink
            to="/category/entertainment"
            className={({ isActive }) =>
              `block px-2 py-1 rounded ${
                isActive
                  ? "bg-[#02AA08] text-white"
                  : "hover:bg-[#02AA08] hover:text-white"
              }`
            }
          >
            Entertainment
          </NavLink>
          {user ? (
            <button
              onClick={handleLogout}
              className="block px-4 py-2 rounded bg-[#02AA08] hover:bg-[#1b5c1d] text-white mt-2"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? "bg-[#02AA08]" : "bg-[#02AA08] hover:bg-[#1b5c1d]"
                } text-white mt-2`
              }
            >
              Login
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
