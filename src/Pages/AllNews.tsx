import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LiveNews from "../Components/AllNews/LiveNews";
import useAuth from "../hooks/useAuth";
import ShareDropdown from "../Components/Home/ShareDropdown";
import Bookmark from "../Components/Bookmark";
import Favorite from "../Components/Favorite";

interface NewsItem {
  _id: string;
  title: string;
  image: string;
  category: string;
  region: string;
  description: string;
  date_time: string;
  breaking_news: boolean;
  popular_news: boolean;
  isLive: boolean;
  timestamp: string;
}

const AllNews: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1); // Default to 1 in case the total isn't returned from server

  const newsPerPage = 9; // Number of news items per page

  const auth = useAuth();
  const { loading: authLoading } = auth || {};

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get<NewsItem[]>(
          `http://localhost:3001/news?pages=${currentPage}&size=${newsPerPage}`
        );
        const fetchedNews = response.data;
        setNews(fetchedNews);

        // Update total pages. If the data doesn't have the total, we'll estimate it based on response length.
        const estimatedTotalPages = fetchedNews.length < newsPerPage ? currentPage + 1 : currentPage + 2;
        setTotalPages(estimatedTotalPages);

        setLoading(false);
      } catch (error) {
        setError("Error fetching news");
        setLoading(false);
      }
    };

    fetchNews();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading || authLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="pt-10 container mx-auto px-4">
      <LiveNews />
      <div className="p-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">All News</h1>

        {/* News Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.map((item) => (
            <div
              key={item._id}
              className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 glass"
            >
              {/* Image and Title Link */}
              <Link to={`/news/${item._id}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-md"
                />
                <div className="flex justify-between items-center my-3">
                  <p className="text-sm text-gray-500 badge">{item.category}</p>
                  <p className="text-sm text-gray-300">
                    {new Date(item.date_time).toLocaleString()}
                  </p>
                </div>
                <h2 className="text-xl font-semibold mt-2 hover:underline">
                  {item.title}
                </h2>
              </Link>
              <hr className="my-4" />

              {/* Description with "See More" */}
              <p className="text-gray-300 mt-1">
                {item.description.length > 300 ? (
                  <>
                    {item.description.slice(0, 300)}...
                    <Link
                      to={`/news/${item._id}`}
                      className="text-blue-500 hover:text-blue-300"
                    >
                      {" "}
                      See More
                    </Link>
                  </>
                ) : (
                  item.description
                )}
              </p>

              {/* Buttons Section */}
              <div className="flex justify-between items-center text-xl md:text-2xl my-3">
                <Favorite newsId={item._id} />
                <Bookmark newsId={item._id} />
                <ShareDropdown url={`http://localhost:3001/news/${item._id}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Section */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 mr-2"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-sm text-gray-300">
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 ml-2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllNews;
