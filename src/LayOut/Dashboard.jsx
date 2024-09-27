import { FaChartPie, FaHome, FaList, FaUser, FaUsers } from "react-icons/fa";
import { GiHamburgerMenu, GiKnightBanner } from "react-icons/gi";
import { GrDocumentTest, GrTest } from "react-icons/gr";
import { IoBookmarks, IoNewspaperOutline } from "react-icons/io5";
import { RiAddLargeFill } from "react-icons/ri";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { IoIosPaper, IoMdClose } from "react-icons/io";
//import { Toaster } from "react-hot-toast";
//import useUser from "../hooks/useUser";
import { useState } from "react";
import { MdSettingsSuggest } from "react-icons/md";
import { Toaster } from "react-hot-toast";

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
      <div className="flex bg-neutral-950 glass text-white">
        {/* dashboard side bar */}
        <div className={`w-64 min-h-screen bg-[#1A1A1A] glass rounded-r-2xl text-white ${sidebarOpen ? 'block transition-all duration-300' : 'hidden transition-all duration-300'} lg:block`}>
          <div>
            <img src="https://i.postimg.cc/ZK91WD3k/Green-and-Blue-3-D-Global-News-Logo-removebg-preview.png" 
            className="my-5 px-4"
            alt="" />
            <hr className="my-4" />
          </div>
          <Toaster></Toaster>
          <ul className="menu p-4 space-y-6">
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
                <li>
                  <NavLink to="/dashboard/news-post"
                  className={({ isActive }) =>
                    `px-2 py-1 rounded ${isActive
                           ? "bg-[#02AA08] text-white"
                           : "hover:bg-[#02AA08] hover:text-white"
                         }`
                   }
                  >
                    <IoNewspaperOutline />
                    News Post
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manage-news"
                  className={({ isActive }) =>
                    `px-2 py-1 rounded ${isActive
                           ? "bg-[#02AA08] text-white"
                           : "hover:bg-[#02AA08] hover:text-white"
                         }`
                   }
                  >
                    <MdSettingsSuggest />
                    Manage News
                  </NavLink>
                </li>
                {/* Add other admin routes here */}
              </>
            ) : (
              <h1>Normal user dashboard</h1>
            )}
            {/* shared nav links */}
            <div className="divider glass"></div>
            <li>
              <NavLink to="/"
              className={({ isActive }) =>
                `px-2 py-1 rounded ${isActive
                       ? "bg-[#02AA08] text-white"
                       : "hover:bg-[#02AA08] hover:text-white"
                     }`
               }
              >
                <FaHome />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/all-news"
              className={({ isActive }) =>
                `px-2 py-1 rounded ${isActive
                       ? "bg-[#02AA08] text-white"
                       : "hover:bg-[#02AA08] hover:text-white"
                     }`
               }
              >
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
  
