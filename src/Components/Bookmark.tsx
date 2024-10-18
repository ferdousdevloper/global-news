import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

interface BookmarkProps {
  newsId: string;
}

const Bookmark: React.FC<BookmarkProps> = ({ newsId }) => {
  const [bookmarked, setBookmarked] = useState(false);
  const auth = useAuth();
  const { user } = auth || {};

  useEffect(() => {
    if (user) {
      const fetchBookmarkedNews = async () => {
        try {
          const response = await axios.get(`https://global-news-server-phi.vercel.app/bookmarks/${user.email}`);
          const userBookmarks = response.data;
          setBookmarked(userBookmarks.includes(newsId));
        } catch (err) {
          console.error("Error fetching bookmarks:", err);
        }
      };

      fetchBookmarkedNews();
    }
  }, [user, newsId]);

  const handleBookmark = async (e: React.MouseEvent) => {
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
      const url = bookmarked
        ? "https://global-news-server-phi.vercel.app/bookmarks"  // DELETE route for removing bookmark
        : "https://global-news-server-phi.vercel.app/bookmark";  // POST route for adding bookmark

      const method = bookmarked ? 'delete' : 'post';

      await axios({
        method,
        url,
        data: { email: user.email, newsId },
      });

      setBookmarked(!bookmarked);

      Swal.fire({
        icon: "success",
        title: bookmarked ? "Bookmark Removed!" : "Bookmarked!",
        text: bookmarked
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

  return (
    <CiBookmark
      className={`cursor-pointer hover:text-black ${bookmarked ? "text-green-500" : "text-slate-100"}`}
      onClick={handleBookmark}
    />
  );
};

export default Bookmark;
