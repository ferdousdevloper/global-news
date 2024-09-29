import { FaChartPie, FaHome, FaList, FaUser, FaUsers } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoNewspaperOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { useState } from "react";
import RequestReporterModal from "../Components/Dashboard/RequestReporterModal";


const Dashboard = () => {
  const [isAdmin, isLoading, isError] = useAdmin();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (isError) {
    return <div>Error loading admin status</div>;
  }

  return (
    <div className="flex">
      {/* dashboard side bar */}
      <div
        className={`w-64 min-h-screen bg-[#1A1A1A] text-white ${
          sidebarOpen ? "block transition-all duration-300" : "hidden transition-all duration-300"
        } lg:block`}
      >
        <div>
          <img
            src="https://i.postimg.cc/ZK91WD3k/Green-and-Blue-3-D-Global-News-Logo-removebg-preview.png"
            className="my-5 px-4"
            alt=""
          />
          <hr className="my-4" />
        </div>
        <ul className="menu p-4">
          <li>
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                `px-2 py-1 rounded ${
                  isActive
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
                <NavLink
                  to="/dashboard/allUsers"
                  className={({ isActive }) =>
                    `px-2 py-1 rounded ${
                      isActive
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
                <NavLink
                  to="/dashboard/news-post"
                  className={({ isActive }) =>
                    `px-2 py-1 rounded ${
                      isActive
                        ? "bg-[#02AA08] text-white"
                        : "hover:bg-[#02AA08] hover:text-white"
                    }`
                  }
                >
                  <IoNewspaperOutline />
                  News Post
                </NavLink>
              </li>
              {/* Add other admin routes here */}
            </>
          ) : (
            <h1>Normal user dashboard</h1>
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

       {/* Request Reporter Button */}
<li>
  <button
    onClick={openModal}
    className="flex items-center space-x-2 px-2 py-1 rounded bg-transparent text-[#02AA08] hover:bg-[#02AA08] hover:text-white border border-[#02AA08] transition-all"
  >
    <FaUser />
    <span>Request Reporter</span>
  </button>
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

      {/* Modal Component */}
      <RequestReporterModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Dashboard;
