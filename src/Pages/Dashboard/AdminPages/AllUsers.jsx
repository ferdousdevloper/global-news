import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Lottie from "lottie-react";
import toast from "react-hot-toast";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import loadingAnimation from "../../../loadingAnimation.json"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useState } from "react";

const AllUsers = () => {

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Show 6 news items per page


  // Fetch all users using react-query with the Object form
  const { data: users = [], refetch, isLoading, error } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const { data } = await axios.get("https://global-news-server-phi.vercel.app/users"); // Update the URL if necessary
      return data;
    },
  });

  if (isLoading) return <div className="w-2/4 mx-auto">
  <Lottie
    animationData={loadingAnimation}
    height={100}
    width={100}
  ></Lottie>
</div>;
  if (error) return <p>Error loading users: {error.message}</p>;

  // Function to update user role
  const handleRoleChange = (user, role) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Change role to ${role}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, make ${role}!`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(`https://global-news-server-phi.vercel.app/users/role/${user._id}`, { role })
          .then((res) => {
            if (res.data.result.modifiedCount > 0) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${user.name} is now ${role}!`,
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: `Failed to change role for ${user.name}`,
              });
            }
          })
          .catch((error) => {
            toast.error("Failed to update role");
          });
      }
    });
  };

  const handleMakeBlock = (user) => {
    axios.patch(`https://global-news-server-phi.vercel.app/users/block/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("Successfully Blocked the user");
      }
    });
  };

  const handleMakeActive = (user) => {
    axios.patch(`https://global-news-server-phi.vercel.app/users/active/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("User is now Active");
      }
    });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://global-news-server-phi.vercel.app/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  // Pagination logic
  const totalItems = users.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const allUsers = users.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1 
      data-aos="zoom-in"
      data-aos-duration="1000"
      data-aos-delay="100"
      className="text-xl md:text-6xl fontBebas font-extrabold text-center mb-10 text-gray-100">
        ALL USERS
      </h1>
      <hr 
      data-aos="zoom-in"
      data-aos-duration="1000"
      data-aos-delay="200"
      className="my-10 border-2" />
      <div className="overflow-x-auto border glass rounded-3xl">
        <table className="table  max-w-7xl mx-auto text-gray-100">
          {/* head */}
          <thead>
            <tr 
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="100"
            className="text-white">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user, index) => (
              <tr 
              data-aos="zoom-in"
        data-aos-duration="1000"
        data-aos-delay="300"
              key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.status === "active" ? (
                    <button
                      onClick={() => handleMakeBlock(user)}
                      className="btn btn-sm bg-green-500 text-white"
                    >
                      Active
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeActive(user)}
                      className="btn btn-sm bg-red-500 text-white"
                    >
                      Block
                    </button>
                  )}
                </td>
                <td>
                  {user.role === "admin" ? (
                    <span className="text-blue-500 font-bold">Admin</span>
                  ) : user.role === "reporter" ? (
                    <span className="text-yellow-500 font-bold">Reporter</span>
                  ) : (
                    <span className="text-green-500 font-bold">Normal User</span>
                  )}
                  <select
                    onChange={(e) => handleRoleChange(user, e.target.value)}
                    className="ml-2 p-1 bg-gray-200 text-black rounded"
                    defaultValue={user.role}
                  >
                    <option value="admin">Admin</option>
                    <option value="reporter">Reporter</option>
                    <option value="normal user">Normal User</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-ghost btn-lg"
                  >
                    <FaTrashAlt className="text-red-600"></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Section */}
      <div className="mt-6 flex justify-center items-center text-white">
        <button
          className="px-4 py-2 mx-1 bg-colorPrimary glass rounded-lg"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FaArrowLeft />
        </button>

        {currentPage > 1 && (
          <button
            className="px-4 py-2 mx-1 rounded-lg bg-gray-800 glass"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            {currentPage - 1}
          </button>
        )}

        <span
          className="px-4 py-2 mx-1 rounded-lg bg-colorPrimary glass text-white"
        >
          {currentPage}
        </span>

        {currentPage < totalPages && (
          <button
            className="px-4 py-2 mx-1 rounded-lg bg-gray-800 glass"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            {currentPage + 1}
          </button>
        )}

        <button
          className="px-4 py-2 mx-1 bg-colorPrimary glass rounded-lg"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default AllUsers;
