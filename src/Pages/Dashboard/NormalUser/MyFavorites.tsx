import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';  // Updated delete icon
import useAuth from '../../../hooks/useAuth';

interface Article {
  _id: string;
  title: string;
  image: string;
  category: string;
  description: string;
  date_time: string;
  authorName: string;
}

const MyFavorites: React.FC = () => {
  const [favoriteArticles, setFavoriteArticles] = useState<Article[]>([]);
  const auth = useAuth();
  const { user, loading } = auth || {};

  useEffect(() => {
    const fetchUserFavorites = async () => {
      if (user) {
        try {
          const favoritesResponse = await axios.get(`http://localhost:3001/favorites/${user.email}`);
          const favorites = favoritesResponse.data;

          const articlePromises = favorites.map((newsId: string) =>
            axios.get(`http://localhost:3001/news/${newsId}`)
          );

          const articlesResponses = await Promise.all(articlePromises);
          const articles: Article[] = articlesResponses.map((res) => res.data);

          setFavoriteArticles(articles);
        } catch (error) {
          console.error('Error fetching favorite articles:', error);
        }
      }
    };

    if (!loading && user) {
      fetchUserFavorites();
    }
  }, [user, loading]);

  const handleRemoveFavorite = async (newsId: string) => {
    if (user) {
      try {
        await axios.delete('http://localhost:3001/favorites', {
          data: { email: user.email, newsId },
        });
        setFavoriteArticles((prevArticles) => prevArticles.filter(article => article._id !== newsId));
      } catch (error) {
        console.error('Error removing favorite article:', error);
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Please log in to view your favorite articles.</p>;
  }

  return (
    <div className="bg-neutral-950 p-6 glass rounded-lg">
      <div className="md:container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-slate-50">My Favorites</h1>
        <hr className='py-4' />
        {favoriteArticles.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {favoriteArticles.map((article) => (
              <li
                key={article._id}
                className="border p-4 rounded-lg shadow-lg bg-neutral-800 glass flex flex-col h-full relative"
              >
                <img src={article.image} alt={article.title} className="w-full h-48 object-cover mb-4 rounded-md" />
                <h2 className="text-xl font-semibold text-slate-50">{article.title}</h2>
                <p className="text-gray-300 mb-2">{article.category}</p>
                <p className="text-gray-300 mb-4 flex-grow">
                  {article.description.length > 80 ? (
                    <>
                      {article.description.slice(0, 80)}...
                      <Link to={`/news/${article._id}`} className="text-green-500 hover:text-green-300 ml-2"> See More</Link>
                    </>
                  ) : (
                    article.description
                  )}
                </p>
                <p className="text-gray-400">By {article.authorName}</p>
                <p className="text-gray-400">{new Date(article.date_time).toLocaleDateString()}</p>

                {/* Delete Icon - Positioned at bottom right */}
                <button
                  className="absolute bottom-2 right-2 text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveFavorite(article._id)}
                >
                  <MdDelete size={24} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">No favorite articles yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyFavorites;
