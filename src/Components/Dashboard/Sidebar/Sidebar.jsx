import { useState } from "react";
import { AiOutlineBars } from 'react-icons/ai';
import MenuItem from "./Menu/MenuItem";
import { FcSettings } from "react-icons/fc";
import { GrLogout } from "react-icons/gr";
import useRole from "../../../hooks/useRole";
import useAuth from "../../../hooks/useAuth";
import NormalUser from "./Menu/NormalUser";
import AdminMenu from "./Menu/AdminMenu";
import ReporterMenu from "./Menu/ReporterMenu";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { IoIosHome } from "react-icons/io";
import { FaListAlt } from "react-icons/fa";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [role, isLoading] = useRole();
  const navigate = useNavigate(); // Initialize useNavigate

  // Sidebar Responsive Handler
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handle Logout
  const handleLogout = async () => {
    await logOut();
    navigate("/"); // Navigate to home page after logout
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className='md:hidden bg-[#1A1A1A] text-white flex justify-between items-center p-4'>
        <img
          src="https://i.postimg.cc/ZK91WD3k/Green-and-Blue-3-D-Global-News-Logo-removebg-preview.png"
          className="w-32"
          alt="Logo"
        />
        <button
          onClick={toggleSidebar}
          className='focus:outline-none'
        >
          <AiOutlineBars className='h-6 w-6 text-white' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`w-64 min-h-screen bg-[#1A1A1A] text-white transition-all duration-300 fixed z-40 top-0 ${
          sidebarOpen ? "left-0" : "-left-64"
        } md:relative md:left-0 md:block`}
      >
        <div>
          <img
            src="https://i.postimg.cc/ZK91WD3k/Green-and-Blue-3-D-Global-News-Logo-removebg-preview.png"
            className="my-5 px-4"
            alt="Logo"
          />
          <hr className="my-4" />
        </div>

        {/* Navigation Items */}
        <div className='flex flex-col justify-between flex-1 mt-6'>
          <nav>
            {role === 'Normal User' && <NormalUser />}
            {role === 'Reporter' && <ReporterMenu />}
            {role === 'admin' && <AdminMenu />}
          </nav>
        </div>

        {/* Profile Menu */}
        <div>
          <hr className="my-4" />
          <MenuItem
            label='Profile'
            address='/dashboard/profile'
            icon={FcSettings}
          />
          <MenuItem
            label='Home'
            address='/'
            icon={IoIosHome}
          />
          <MenuItem
            label='All News'
            address='/all-news'
            icon={FaListAlt}
          />
          

          <button
            onClick={handleLogout} // Use the handleLogout function
            className='flex w-full items-center px-4 py-2 mt-5 text-[#02AA08] hover:bg-[#02AA08] hover:text-white border border-[#02AA08] transition-all duration-300'
          >
            <GrLogout className='w-5 h-5' />
            <span className='mx-4 font-medium'>Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay for Small Screens */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
