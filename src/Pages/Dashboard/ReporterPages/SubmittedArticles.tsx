import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';

interface User {
  email: string;
}

const SubmittedArticles: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const { user, loading } = useAuth() || {}; // Provide a fallback to avoid null errors

  useEffect(() => {
    const fetchArticles = async () => {
      if (user?.email) {
        try {
          const response = await axios.get(`http://localhost:3001/news/my-articles/${user.email}`);
          setArticles(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
          console.error('Error fetching articles:', error);
        }
      }
    };
    if (!loading) {
      fetchArticles();
    }
  }, [user?.email, loading]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>No user found. Please log in.</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Submitted Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.length > 0 ? (
          articles.map((article) => (
            <div key={article._id} className="bg-white shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105 duration-300">
              <img
                src={article.image || 'https://via.placeholder.com/400x200'} // Placeholder if no image is available
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2 text-gray-800">{article.title}</h2>
                <p className="text-gray-600 text-sm">
                  {article.description.slice(0, 100)}...
                </p>
                <div className="mt-4">
                  <p className="text-xs text-gray-500">
                    <strong>Category:</strong> {article.category}
                  </p>
                  <p className="text-xs text-gray-500">
                    <strong>Region:</strong> {article.region}
                  </p>
                  <p className="text-xs text-gray-500">
                    <strong>Date:</strong> {new Date(article.timestamp).toLocaleString()}
                  </p>
                  {/* Conditionally render breaking and popular news */}
                  {article.breaking_news && (
                    <p className="text-xs text-red-500">
                      <strong>Breaking News</strong>
                    </p>
                  )}
                  {article.popular_news && (
                    <p className="text-xs text-blue-500">
                      <strong>Popular News</strong>
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    <strong>Status:</strong> {article.isLive ? 'Live' : 'Normal'}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">No articles found</p>
        )}
      </div>
    </div>
  );
};

export default SubmittedArticles;
