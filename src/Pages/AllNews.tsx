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
  const [newsPerPage, setNewsPerPage] = useState<number>(9); // News items per page

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

        // Estimate total pages based on the number of items returned and the current page.
        const estimatedTotalPages =
          fetchedNews.length < newsPerPage ? currentPage + 1 : currentPage + 2;
        setTotalPages(estimatedTotalPages);

        setLoading(false);
      } catch (error) {
        setError("Error fetching news");
        setLoading(false);
      }
    };

    fetchNews();
  }, [currentPage, newsPerPage]);

  const handlePrevious = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const handleNewsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNewsPerPage(Number(event.target.value));
    setCurrentPage(0); // Reset to the first page
  };

  const pages = Array.from({ length: totalPages }, (_, index) => index);

  if (loading || authLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="pt-10 container mx-auto px-4">
      {/* Live News Section */}
      <LiveNews />

      {/* All News Section */}
      <div className="p-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">All News</h1>

        {/* News Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.map((item) => (
            <div
              key={item._id}
              className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 glass"
            >
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

              <div className="flex justify-between items-center text-xl md:text-2xl my-3">
                <Favorite newsId={item._id} />
                <Bookmark newsId={item._id} />
                <ShareDropdown url={`http://localhost:3001/news/${item._id}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Section */}
        <div className="flex justify-center items-center py-4">
          {/* Previous Button */}
          <p>
            <button
              className="btn mr-1 bg-gray-800 text-white"
              onClick={handlePrevious}
              disabled={currentPage === 0} // Disable if on the first page
            >
              Previous
            </button>
          </p>

          {/* Page Numbers */}
          {pages.map((page) => (
            <button
              key={page}
              className={`${
                currentPage === page
                  ? "btn bg-red-900 text-white"
                  : "btn mr-1 bg-gray-800 text-white"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page + 1}
            </button>
          ))}

          {/* Next Button */}
          <p>
            <button
              className="btn ml-1 bg-gray-800 text-white"
              onClick={handleNext}
              disabled={currentPage === totalPages - 1} // Disable if on the last page
            >
              Next
            </button>
          </p>

          {/* News Per Page Selector */}
          <label htmlFor="" className="ml-2 flex justify-center items-center">
            <div>
              <span className="text-white px-2">News Per Page:</span>
            </div>
            <div>
              <select
                value={newsPerPage}
                onChange={handleNewsPerPage}
                className="btn bg-gray-800 text-white"
              >
                <option value="4">6</option>
                <option value="9">12</option>
                <option value="20">18</option>
                <option value="20">24</option>
              </select>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default AllNews;
