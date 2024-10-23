import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Lottie from "lottie-react";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import loadingAnimation from "../../../loadingAnimation.json"
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";


const ManageNews = () => {

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Show 6 news items per page


  const { data: news = [], refetch, isLoading, error } = useQuery({
    queryKey: ["ManageNews"],
    queryFn: async () => {
      const { data } = await axios.get("https://global-news-server-phi.vercel.app/news");
      return data;
    },
  });

  if (isLoading) return (
    <div className="w-2/4 mx-auto">
      <Lottie
        animationData={loadingAnimation}
        height={100}
        width={100}
      ></Lottie>
    </div>
  );
  if (error) return <p>Error loading news: {error.message}</p>;

  const handleDelete = (newsItem) => {
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
        axios
          .delete(`https://global-news-server-phi.vercel.app/news/${newsItem._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your news has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            console.error("Error deleting news:", error);
            Swal.fire({
              title: "Error!",
              text: "There was an error deleting the news.",
              icon: "error",
            });
          });
      }
    });
  };

  // Pagination logic
  const totalItems = news.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const allNews = news.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto my-10 px-4 text-gray-100">
      <h1 
      data-aos="zoom-in"
      data-aos-duration="1000"
      data-aos-delay="100"
      className="text-xl md:text-4xl fontBebas font-extrabold text-center mb-10">
        MANAGE NEWS
      </h1>
      <hr 
      data-aos="zoom-in"
      data-aos-duration="1000"
      data-aos-delay="200"
      className="my-5 border-2" />
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-400 glass">
          <thead>
            <tr 
            data-aos="zoom-in"
            data-aos-duration="1000"
            data-aos-delay="300"
            >
              <th className="border border-gray-300 px-2 py-1 sm:px-4 sm:py-2">Image</th>
              <th className="border border-gray-300 px-2 py-1 sm:px-4 sm:py-2">Title</th>
              <th className="border border-gray-300 px-2 py-1 sm:px-4 sm:py-2">Category</th>
              <th className="border border-gray-300 px-2 py-1 sm:px-4 sm:py-2">Region</th>
              <th className="border border-gray-300 px-2 py-1 sm:px-4 sm:py-2">Description</th>
              <th className="border border-gray-300 px-2 py-1 sm:px-4 sm:py-2">Date</th>
              <th className="border border-gray-300 px-2 py-1 sm:px-4 sm:py-2">Breaking</th>
              <th className="border border-gray-300 px-2 py-1 sm:px-4 sm:py-2">Popular</th>
              <th className="border border-gray-300 px-2 py-1 sm:px-4 sm:py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allNews.map((item) => (
              <tr 
              data-aos="zoom-in"
        data-aos-duration="1000"
        data-aos-delay="500"
              key={item._id} className="border-t">
                <td className="border border-gray-300 px-2 py-1 sm:px-4 sm:py-2">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-cover"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1 sm:px-4 sm:py-2"><div><p>{item.title}</p><p>Author: {item.author}</p></div></td>
                <td className="border border-gray-300 px-2 py-1 sm:px-4 sm:py-2">{item.category}</td>
                <td className="border border-gray-300 px-2 py-1 sm:px-4 sm:py-2">{item.region}</td>
                <td className="border border-gray-300 px-2 py-1 sm:px-4 sm:py-2">
                  {item.description.slice(0, 50)}...
                </td>
                <td className="border border-gray-300 px-2 py-1 sm:px-4 sm:py-2">
                  {new Date(item.date_time).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-2 py-1 sm:px-4 sm:py-2">
                  {item.breaking_news ? "Yes" : "No"}
                </td>
                <td className="border border-gray-300 px-2 py-1 sm:px-4 sm:py-2">
                  {item.popular_news ? "Yes" : "No"}
                </td>
                <td className="border border-gray-300 px-2 py-1 sm:px-4 sm:py-2 text-center">
                  <button
                    onClick={() => handleDelete(item)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrashAlt />
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
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
          className="px-4 py-2 mx-1 bg-colorPrimary glass rounded-lg"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FaArrowLeft />
        </button>

        {currentPage > 1 && (
          <button
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="250"
            className="px-4 py-2 mx-1 rounded-lg bg-gray-800 glass"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            {currentPage - 1}
          </button>
        )}

        <span
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="300"
          className="px-4 py-2 mx-1 rounded-lg bg-colorPrimary glass text-white"
        >
          {currentPage}
        </span>

        {currentPage < totalPages && (
          <button
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="350"
            className="px-4 py-2 mx-1 rounded-lg bg-gray-800 glass"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            {currentPage + 1}
          </button>
        )}

        <button
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="400"
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

export default ManageNews;
