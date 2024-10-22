import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CiBookmark } from "react-icons/ci";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import icons for pagination
import Swal from "sweetalert2";
import LiveNews from "../Components/AllNews/LiveNews";
import useAuth from "../hooks/useAuth";
import Lottie from "lottie-react";
import loadingAnimation from "../loadingAnimation.json";

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
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [bookmarked, setBookmarked] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("All News");
  const [selectedCountry, setSelectedCountry] = useState<string>("All Countries");
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>("All Dates");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(9); // Show 9 items per page

  const auth = useAuth();
  const { user, loading: authLoading } = auth || {};

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get<NewsItem[]>("http://localhost:3001/news");
        setNews(response.data);
        setFilteredNews(response.data);

        const uniqueCategories = Array.from(new Set<string>(response.data.map((item) => item.category)));
        setCategories(uniqueCategories);

        const uniqueCountries = Array.from(new Set<string>(response.data.map((item) => item.region)));
        setCountries(uniqueCountries);

        setLoading(false);
      } catch (error) {
        setError("Error fetching news");
        setLoading(false);
      }
    };

    fetchNews();

    const storedBookmarks = localStorage.getItem("bookmarkedNews");
    if (storedBookmarks) {
      setBookmarked(JSON.parse(storedBookmarks));
    }
  }, []);

  useEffect(() => {
    filterNews();
  }, [searchTerm, selectedFilter, selectedCountry, selectedDateFilter, news, bookmarked]);

  const filterNews = () => {
    let updatedFilteredNews = news;

    if (searchTerm) {
      updatedFilteredNews = updatedFilteredNews.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.region.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedFilter !== "All News") {
      if (selectedFilter === "Breaking News") {
        updatedFilteredNews = updatedFilteredNews.filter((item) => item.breaking_news);
      } else if (selectedFilter === "Popular News") {
        updatedFilteredNews = updatedFilteredNews.filter((item) => item.popular_news);
      } else if (selectedFilter === "Live News") {
        updatedFilteredNews = updatedFilteredNews.filter((item) => item.isLive);
      } else {
        updatedFilteredNews = updatedFilteredNews.filter((item) => item.category === selectedFilter);
      }
    }

    if (selectedCountry !== "All Countries") {
      updatedFilteredNews = updatedFilteredNews.filter((item) => item.region === selectedCountry);
    }

    if (selectedDateFilter !== "All Dates") {
      const today = new Date();
      if (selectedDateFilter === "Today") {
        updatedFilteredNews = updatedFilteredNews.filter(
          (item) => new Date(item.date_time).toDateString() === today.toDateString()
        );
      } else if (selectedDateFilter === "Last 7 Days") {
        const lastWeek = new Date();
        lastWeek.setDate(today.getDate() - 7);
        updatedFilteredNews = updatedFilteredNews.filter((item) => new Date(item.date_time) >= lastWeek);
      } else if (selectedDateFilter === "Last 30 Days") {
        const lastMonth = new Date();
        lastMonth.setDate(today.getDate() - 30);
        updatedFilteredNews = updatedFilteredNews.filter((item) => new Date(item.date_time) >= lastMonth);
      }
    }

    setFilteredNews(updatedFilteredNews);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const resetFilters = () => {
    setSelectedFilter("All News");
    setSelectedCountry("All Countries");
    setSelectedDateFilter("All Dates");
    setSearchTerm("");
    setFilteredNews(news);
  };

  const handleBookmark = async (newsId: string, e: React.MouseEvent) => {
    e.preventDefault();

    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Not Authenticated",
        text: "Please login to bookmark news.",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      const alreadyBookmarked = bookmarked.includes(newsId);
      const updatedBookmarks = alreadyBookmarked
        ? bookmarked.filter((id) => id !== newsId)
        : [...bookmarked, newsId];

      setBookmarked(updatedBookmarks);
      localStorage.setItem("bookmarkedNews", JSON.stringify(updatedBookmarks));

      const url = alreadyBookmarked
        ? "http://localhost:3001/remove-bookmark"
        : "http://localhost:3001/bookmark";

      await axios.post(url, {
        email: user.email,
        newsId,
      });

      Swal.fire({
        icon: "success",
        title: alreadyBookmarked ? "Bookmark Removed!" : "Bookmarked!",
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an error trying to bookmark this item. Please try again.",
      });
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading || authLoading) return (
    <div className="w-2/4 mx-auto">
      <Lottie animationData={loadingAnimation} height={100} width={100}></Lottie>
    </div>
  );
  if (error) return <p>{error}</p>;

  return (
    <div className="pt-10 container mx-auto px-4">
      <LiveNews />
      <div className="p-6 text-white">
        <h1 
        data-aos="fade-up"
     data-aos-duration="1000" 
     data-aos-delay="200" 
     className="text-2xl md:text-3xl font-bold mb-4">All News</h1>

        {/* Filters Section */}
        <div className="flex flex-wrap gap-4 mb-4">
          <select
           data-aos="fade-up"
           data-aos-duration="1000" 
           data-aos-delay="300"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-4 py-2 border rounded-md w-full md:flex-1 bg-transparent glass text-gray-700"
          >
            <option>All News</option>
            <option>Breaking News</option>
            <option>Popular News</option>
            <option>Live News</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
           data-aos="fade-up"
           data-aos-duration="1000" 
           data-aos-delay="400"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="px-4 py-2 border rounded-md w-full md:flex-1 bg-transparent glass text-gray-700"
          >
            <option>All Countries</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>

          <select
           data-aos="fade-up"
           data-aos-duration="1000" 
           data-aos-delay="500"
            value={selectedDateFilter}
            onChange={(e) => setSelectedDateFilter(e.target.value)}
            className="px-4 py-2 border rounded-md w-full md:flex-1 bg-transparent glass text-gray-700"
          >
            <option>All Dates</option>
            <option>Today</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>

          <input
           data-aos="fade-up"
           data-aos-duration="1000" 
           data-aos-delay="600"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search news..."
            className="px-4 py-2 border rounded-md w-full md:flex-1 bg-transparent glass text-gray-700"
          />

          <button
           data-aos="fade-up"
           data-aos-duration="1000" 
           data-aos-delay="700"
            onClick={resetFilters}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 w-full md:w-auto glass"
          >
            Reset Filters
          </button>
        </div>
        

        {/* News Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentNews.map((item) => (
            <div
            data-aos="zoom-in"
            data-aos-duration="1000" 
            data-aos-delay="800"
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
                <p className="text-sm text-gray-500 badge">
                  {item.category}
                </p>
                <p className="text-sm text-gray-300">
                {new Date(item.timestamp).toLocaleDateString()}
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
                    className="text-colorPrimary hover:text-green-300"
                  >
                    {" "}
                    See More
                  </Link>
                </>
              ) : (
                item.description
              )}
            </p>
            <hr />

            {/* Buttons Section */}
            <div className="flex justify-between items-center text-xl md:text-2xl my-3">
              <MdFavoriteBorder />
              <CiBookmark
                className={`cursor-pointer ${bookmarked.includes(item._id) ? "text-green-500" : ""
                  }`}
                onClick={(e) => handleBookmark(item._id, e)}
              />
              <IoShareSocialOutline />
            </div>
          </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-6 flex justify-center items-center">
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
          className="px-4 py-2 mx-1 rounded-lg bg-colorPrimary glass text-white">
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
    </div>
  );
};

export default AllNews;
