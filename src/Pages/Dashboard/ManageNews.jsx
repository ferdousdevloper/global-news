import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ManageNews = () => {
  // Fetch all news using TanStack Query
  const { data: news = [], refetch, isLoading, error } = useQuery({
    queryKey: ["ManageNews"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:3001/news"); // Update the URL if necessary
      return data;
    }
  });

  if (isLoading) return <p>Loading news...</p>;
  if (error) return <p>Error loading news: {error.message}</p>;

  // Handle delete
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
        // Call delete endpoint
        axios
          .delete(`http://localhost:3001/news/${newsItem._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch(); // Refetch the news data after deletion
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

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-xl md:text-6xl fontBebas font-extrabold text-center mb-10">
        MANAGE NEWS
      </h1>
      <hr className="my-10 border-2" />
      <table className="min-w-full border-collapse border border-gray-400 glass">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Region</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Breaking</th>
            <th className="border border-gray-300 px-4 py-2">Popular</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {news.map((item) => (
            <tr key={item._id} className="border-t">
              <td className="border border-gray-300 px-4 py-2">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover" />
              </td>
              <td className="border border-gray-300 px-4 py-2">{item.title}</td>
              <td className="border border-gray-300 px-4 py-2">{item.category}</td>
              <td className="border border-gray-300 px-4 py-2">{item.region}</td>
              <td className="border border-gray-300 px-4 py-2">{item.description.slice(0, 100)}...</td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(item.date_time).toLocaleString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">{item.breaking_news ? "Yes" : "No"}</td>
              <td className="border border-gray-300 px-4 py-2">{item.popular_news ? "Yes" : "No"}</td>
              <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                <Link to={`/dashboard/update/${item._id}`}>
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(item)} // Pass the full news item object
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
  );
};

export default ManageNews;
