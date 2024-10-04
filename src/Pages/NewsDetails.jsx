import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GiMicrophone } from "react-icons/gi";
import { FaLocationDot } from 'react-icons/fa6';
import { MdFavoriteBorder } from 'react-icons/md';
import { CiBookmark } from 'react-icons/ci';
import { IoShareSocialOutline } from 'react-icons/io5';
import Swal from 'sweetalert2';

const NewsDetail = () => {
  const { id } = useParams(); // Get the id from the URL
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false); // Manage bookmark state

  useEffect(() => {
    // Fetch the news details based on the id
    const fetchNewsDetail = async () => {
      try {
        const response = await axios.get(`global-news-server-phi.vercel.app/news/${id}`);
        setNews(response.data);
        setLoading(false);

        // Check if the news is already bookmarked
        const storedBookmarks = localStorage.getItem("bookmarkedNews");
        if (storedBookmarks && response.data) {
          const bookmarks = JSON.parse(storedBookmarks);
          setIsBookmarked(bookmarks.includes(response.data._id));
        }
      } catch (err) {
        setError("Failed to load news details");
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id]);

  const handleBookmarkToggle = async (newsId, e) => {
    e.preventDefault();

    const storedBookmarks = localStorage.getItem("bookmarkedNews");
    let bookmarks = storedBookmarks ? JSON.parse(storedBookmarks) : [];

    try {
      if (isBookmarked) {
        // Remove from bookmarks
        bookmarks = bookmarks.filter((id) => id !== newsId);
        Swal.fire({
          title: "Bookmark Removed!",
          text: "You have removed this news from your bookmarks.",
          icon: "info",
          confirmButtonText: "Okay",
        });
      } else {
        // Add to bookmarks
        bookmarks.push(newsId);
        Swal.fire({
          title: "Bookmarked!",
          text: "You have added this news to your bookmarks.",
          icon: "success",
          confirmButtonText: "Okay",
        });
      }

      // Update bookmarks in localStorage and state
      localStorage.setItem("bookmarkedNews", JSON.stringify(bookmarks));
      setIsBookmarked(!isBookmarked);

      // Send POST request to add/remove bookmark in the backend
      const url = isBookmarked
        ? "global-news-server-phi.vercel.app/remove-bookmark" // For removing bookmark
        : "global-news-server-phi.vercel.app/bookmark"; // For adding bookmark

      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newsId,
        }),
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="max-w-6xl w-full my-40 p-8 bg-neutral-950 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out glass">
        {news ? (
          <>
            <div className='flex flex-col lg:flex-row items-center text-left gap-2'>
              <GiMicrophone className='text-3xl text-[#02AA08]' />
              <h1 className="text-4xl font-bold mb-4 text-center text-white">{news.title}</h1>
            </div>
            <hr className='py-4' />
            <img
              src={news.image}
              alt={news.title}
              className="w-full object-cover mb-6 rounded-lg"
            />

            <div className="flex justify-between text-gray-200 text-sm mb-6">
              <span>Category: {news.category}</span>
              <div className='flex gap-2 items-center'>
                <FaLocationDot className='text-red-700' />
                <span>Region: {news.region}</span>
              </div>
            </div>
            <p className="text-gray-200 text-sm mb-6">
              Published on: {new Date(news.date_time).toLocaleDateString()}
            </p>
            <div className="flex justify-between">
              <span
                className={`text-sm font-semibold ${news.breaking_news ? "text-red-500" : "text-gray-700"} badge`}
              >
                {news.breaking_news ? "Breaking News" : "Regular News"}
              </span>
              <span
                className={`text-sm font-semibold ${news.popular_news ? "text-colorPrimary" : "text-gray-400"} badge`}
              >
                {news.popular_news ? "Popular News" : "Less Popular"}
              </span>
            </div>
            <hr className="my-2" />
            <div className='text-gray-300'>
              <h3 className='font-bold underline mb-4'>News:</h3>
              <p className="text-lg leading-relaxed mb-6 text-justify">{news.description}</p>
              <div className="flex justify-between items-center text-xl md:text-2xl my-3">
                <MdFavoriteBorder />
                <CiBookmark
                  onClick={(e) => handleBookmarkToggle(news._id, e)} // Click to toggle bookmark
                  className={`cursor-pointer ${isBookmarked ? "text-green-500" : ''}`} // Change color if bookmarked
                />
                <IoShareSocialOutline />
              </div>
            </div>
          </>
        ) : (
          <p>No news found</p>
        )}
      </div>
    </div>
  );
};

export default NewsDetail;
