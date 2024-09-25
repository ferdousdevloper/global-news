import { FaChartPie, FaHome, FaList, FaUser, FaUsers } from "react-icons/fa";
import { GiHamburgerMenu, GiKnightBanner } from "react-icons/gi";
import { GrDocumentTest, GrTest } from "react-icons/gr";
import { IoBookmarks } from "react-icons/io5";
import { RiAddLargeFill } from "react-icons/ri";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { IoIosPaper, IoMdClose } from "react-icons/io";
//import { Toaster } from "react-hot-toast";
//import useUser from "../hooks/useUser";
import { useState } from "react";

const Dashboard = () => {
    const [isAdmin, isLoading, isError] = useAdmin();
    const [sidebarOpen, setSidebarOpen] = useState(false);
  
    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };
  
    if (isLoading) {
      return <h1>Loading</h1>;
    }
  
    if (isError) {
      return <div>Error loading admin status</div>;
    }
  
    console.log(isAdmin);
  
    return (
      <div className="flex">
        {/* dashboard side bar */}
        <div className={`w-64 min-h-screen bg-[#1A1A1A] text-white ${sidebarOpen ? 'block transition-all duration-300' : 'hidden transition-all duration-300'} lg:block`}>
          <div>
            <img src="https://i.postimg.cc/ZK91WD3k/Green-and-Blue-3-D-Global-News-Logo-removebg-preview.png" 
            className="my-5 px-4"
            alt="" />
            <hr className="my-4" />
          </div>
          <ul className="menu p-4">
            <li>
              <NavLink to="/dashboard/profile"
              className={({ isActive }) =>
                `px-2 py-1 rounded ${isActive
                       ? "bg-[#02AA08] text-white"
                       : "hover:bg-[#02AA08] hover:text-white"
                     }`
               }
              >
                <FaUser />
                Profile
              </NavLink>
            </li>
            {isAdmin ? (
              <>
                <li>
                  <NavLink to="/dashboard/allUsers"
                  className={({ isActive }) =>
                    `px-2 py-1 rounded ${isActive
                           ? "bg-[#02AA08] text-white"
                           : "hover:bg-[#02AA08] hover:text-white"
                         }`
                   }
                  >
                    <FaUsers />
                    All Users
                  </NavLink>
                </li>
                {/* Add other admin routes here */}
              </>
            ) : (
              <h1>test</h1>
            )}
            {/* shared nav links */}
            <div className="divider"></div>
            <li>
              <NavLink to="/">
                <FaHome />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/all-news">
                <FaList />
                All News
              </NavLink>
            </li>
          </ul>
        </div>
        {/* dashboard content */}
        <div className="flex-1 p-8 items-end justify-end w-full">
          <label className="btn btn-circle swap swap-rotate lg:hidden">
            <input type="checkbox" onClick={toggleSidebar} />
            {sidebarOpen ? <IoMdClose /> : <GiHamburgerMenu />}
          </label>
          <Outlet />
        </div>
      </div>
    );
  };
  
  export default Dashboard;
  
