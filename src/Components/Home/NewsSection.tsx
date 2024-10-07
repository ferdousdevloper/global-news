import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

interface NewsItem {
  category: string;
  _id: string;
  title: string;
  image: string;
  description: string;
  date_time: string;
}

const NewsSection: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [bookmarked, setBookmarked] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the user and loading state from the authentication hook
  const auth = useAuth();
  const { user, loading: authLoading } = auth || {};

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:3001/news");
        setNews(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load news data");
        setLoading(false);
      }
    };

    fetchNews();

    const storedBookmarks = localStorage.getItem("bookmarkedNews");
    if (storedBookmarks) {
      setBookmarked(JSON.parse(storedBookmarks));
    }
  }, []);

  const handleBookmark = async (newsId: string, e: React.MouseEvent) => {
    e.preventDefault();

    // Check if user is authenticated
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
        ? bookmarked.filter((id) => id !== newsId) // Remove bookmark
        : [...bookmarked, newsId]; // Add bookmark

      setBookmarked(updatedBookmarks);
      localStorage.setItem("bookmarkedNews", JSON.stringify(updatedBookmarks));

      // Send POST request to add/remove bookmark in the backend
      const url = alreadyBookmarked
        ? "http://localhost:3001/remove-bookmark" // For removing bookmark
        : "http://localhost:3001/bookmark"; // For adding bookmark

      await axios.post(url, {
        email: user.email,  // Use the authenticated user's email
        newsId,
      });

      Swal.fire({
        icon: "success",
        title: alreadyBookmarked ? "Bookmark Removed!" : "Bookmarked!",
        text: alreadyBookmarked
          ? "This item has been removed from your bookmarks."
          : "This item has been added to your bookmarks.",
        confirmButtonText: "OK",
        timer: 2000,
      });
    } catch (error) {
      console.error("Error bookmarking:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an error trying to bookmark this item. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };


  if (loading || authLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const latestNews = news.slice(0, 7);
  const allNews = news.slice(7, 17);

  return (
    <div className="container mx-auto my-10" style={{ width: "85%" }}>
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Left side: All news */}
        <div className="lg:w-9/12 w-full bg-neutral-950 glass p-5 rounded-xl">
          <h2 className="text-3xl font-bold mb-4 text-slate-50">All News</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {allNews.map((item) => (
              <div
                key={item._id}
                className="border p-4 rounded-lg shadow-lg glass flex flex-col h-full min-h-[400px]"
              >
                {/* Image Link */}
                <Link to={`/news/${item._id}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-40 object-cover mb-4 rounded-md"
                  />
                </Link>

                <div className="flex-grow flex flex-col">
                  <h3 className="text-base badge font-semibold mb-1 ">
                    {item.category}
                  </h3>

                  {/* Title Link */}
                  <Link to={`/news/${item._id}`}>
                    <h2 className="text-xl font-bold mb-2 text-slate-50 hover:underline">
                      {item.title}
                    </h2>
                  </Link>

                  <p className="text-sm mb-2 text-slate-100">
                    {new Date(item.date_time).toLocaleDateString()}
                  </p>

                  <p className="text-slate-100 flex-grow">
                    {item.description.length > 80 ? (
                      <>
                        {item.description.slice(0, 80)}...
                        <Link
                          to={`/news/${item._id}`}
                          className="text-green-500 hover:text-green-300"
                        >
                          {" "}
                          See More
                        </Link>
                      </>
                    ) : (
                      item.description
                    )}
                  </p>
                </div>

                {/* Buttons Section */}
                <div className="flex justify-between items-center text-xl md:text-2xl mt-auto pt-4 text-slate-100">
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
          <button className="mt-6 bg-[#02AA08] glass text-white px-4 py-2 rounded hover:bg-[#028A06]">
            See More
          </button>
        </div>

        {/* Right side: Latest news */}
        <div className="lg:w-3/12 w-full bg-neutral-950 glass p-5 rounded-xl">
          <h2 className="text-2xl font-extrabold mb-4 text-slate-50">Latest News</h2>
          <div className="space-y-6">
            {latestNews.map((item) => (
              <div
                key={item._id}
                className="border p-4 rounded-lg shadow-lg glass flex flex-col h-full min-h-[300px]"
              >
                {/* Image Link */}
                <Link to={`/news/${item._id}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-24 object-cover mb-2 rounded-md"
                  />
                </Link>

                <div className="flex-grow flex flex-col">
                  <h3 className="text-base badge font-semibold mb-1 ">
                    {item.category}
                  </h3>

                  {/* Title Link */}
                  <Link to={`/news/${item._id}`}>
                    <h3 className="text-lg font-semibold mb-1 text-slate-50 hover:underline">
                      {item.title}
                    </h3>
                  </Link>

                  <p className="text-sm text-slate-100">
                    {new Date(item.date_time).toLocaleDateString()}
                  </p>
                </div>

                {/* Buttons Section */}
                <div className="flex justify-between items-center text-xl md:text-2xl mt-auto pt-4 text-slate-100">
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
          <button className="mt-6 bg-[#02AA08] text-white px-4 py-2 rounded hover:bg-[#028A06] glass">
            See More
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
