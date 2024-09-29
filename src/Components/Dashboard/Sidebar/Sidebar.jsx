import { useState } from "react"
import { AiOutlineBars } from 'react-icons/ai'
import MenuItem from "./Menu/MenuItem"
import { FcSettings } from "react-icons/fc"
import { GrLogout } from "react-icons/gr"
import useRole from "../../../hooks/useRole"
import useAuth from "../../../hooks/useAuth"
import NormalUser from "./Menu/NormalUser"
import AdminMenu from "./Menu/AdminMenu"
import ReporterMenu from "./Menu/ReporterMenu"


const Sidebar = () => {
  const { logOut } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [role, isLoading] = useRole()
  console.log(role, isLoading)
  // Sidebar Responsive Handler
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <>
      {/* Small Screen Navbar */}
      <div className='w-64 min-h-screen bg-[#1A1A1A] text-white flex justify-between md:hidden'>
        <div>
        <div>
          <img
            src="https://i.postimg.cc/ZK91WD3k/Green-and-Blue-3-D-Global-News-Logo-removebg-preview.png"
            className="my-5 px-4"
            alt=""
          />
          <hr className="my-4" />
        </div>
        </div>

        <button
          onClick={toggleSidebar}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`w-64 min-h-screen bg-[#1A1A1A] text-white ${
            sidebarOpen ? "block transition-all duration-300" : "hidden transition-all duration-300"
          } lg:block`}
      >
        <div>
          <div>
          <div>
          <img
            src="https://i.postimg.cc/ZK91WD3k/Green-and-Blue-3-D-Global-News-Logo-removebg-preview.png"
            className="my-5 px-4"
            alt=""
          />
          <hr className="my-4" />
        </div>
          </div>

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            {/*  Menu Items */}
            <nav>
              {role === 'Normal User' && <NormalUser/>}
              {role === 'Reporter' && <ReporterMenu/>}
              {role === 'admin' && <AdminMenu />}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}
          <MenuItem
            label='Profile'
            address='/dashboard'
            icon={FcSettings}
          />

          <button
            onClick={logOut}
            className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
          >
            <GrLogout className='w-5 h-5' />

            <span className='mx-4 font-medium'>Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar