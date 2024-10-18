import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

interface FavoriteProps {
  newsId: string;
}

const Favorite: React.FC<FavoriteProps> = ({ newsId }) => {
  const [isFavorited, setIsFavorited] = useState(false); 
  const auth = useAuth();
  const { user } = auth || {};

  useEffect(() => {
    if (user) {
      const fetchFavorites = async () => {
        try {
          const response = await axios.get(`https://global-news-server-phi.vercel.app/favorites/${user.email}`);
          const userFavorites = response.data;
          setIsFavorited(userFavorites.includes(newsId));
        } catch (err) {
          console.error("Error fetching favorites:", err);
        }
      };

      fetchFavorites();
    }
  }, [user, newsId]);

  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Not Authenticated",
        text: "Please login to favorite news.",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      const url = isFavorited
        ? "https://global-news-server-phi.vercel.app/favorites"
        : "https://global-news-server-phi.vercel.app/favorites";

      // Perform the appropriate request to add/remove from favorites
      if (isFavorited) {
        await axios.delete(url, { data: { email: user.email, newsId } });
      } else {
        await axios.post(url, { email: user.email, newsId });
      }

      // Toggle the favorite status after successful response
      setIsFavorited(!isFavorited);

      Swal.fire({
        icon: "success",
        title: isFavorited ? "Favorite Removed!" : "Favorited!",
        text: isFavorited
          ? "This item has been removed from your favorites."
          : "This item has been added to your favorites.",
        confirmButtonText: "OK",
        timer: 2000,
      });
    } catch (error) {
      console.error("Error favoriting:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "There was an error trying to favorite this item. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div onClick={handleFavorite} className="cursor-pointer">
      {isFavorited ? (
        <MdFavorite className="text-red-500" size={24} /> 
      ) : (
        <MdFavoriteBorder className="text-slate-100 hover:text-black" size={24} />
      )}
    </div>
  );
};

export default Favorite;
