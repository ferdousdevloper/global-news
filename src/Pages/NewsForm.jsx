import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:3001'); // Your server URL here

const NewsComponent = () => {
  const [liveNews, setLiveNews] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    category: '',
    region: '',
    description: '',
    date_time: '',
    breaking_news: false,
    popular_news: false,
    isLive: false,
  });

  useEffect(() => {
    socket.on('liveNews', (newsArticles) => {
      setLiveNews(newsArticles);
    });

    socket.on('newsPosted', (newArticle) => {
      setLiveNews((prev) => [newArticle, ...prev]);
    });

    return () => {
      socket.off('liveNews');
      socket.off('newsPosted');
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newsArticle = {
      ...formData,
      timestamp: new Date(),
    };

    try {
      await axios.post('http://localhost:3001/news', newsArticle);
      setFormData({
        title: '',
        image: '',
        category: '',
        region: '',
        description: '',
        date_time: '',
        breaking_news: false,
        popular_news: false,
        isLive: false,
      });
    } catch (error) {
      console.error('Error posting news:', error);
      alert('Failed to post news. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-16">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">News Article</h1>
        
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="region"
              placeholder="Region"
              value={formData.region}
              onChange={handleChange}
              required
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
         
          <div className="flex items-center space-x-4 mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="breaking_news"
                checked={formData.breaking_news}
                onChange={handleChange}
                className="form-checkbox"
              />
              <span>Breaking News</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="popular_news"
                checked={formData.popular_news}
                onChange={handleChange}
                className="form-checkbox"
              />
              <span>Popular News</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isLive"
                checked={formData.isLive}
                onChange={handleChange}
                className="form-checkbox"
              />
              <span>Live News</span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          >
            Post News
          </button>
        </form>

        <ul className="space-y-6">
          {liveNews.map((article, index) => (
            <li key={index} className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold">{article.title}</h3>
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover mt-4 rounded-lg"
              />
              <p className="mt-4">{article.description}</p>
              <small className="block mt-2 text-gray-500">
                {new Date(article.timestamp).toLocaleString()}
              </small>
              <strong className="block mt-1 text-red-600">
                {article.isLive ? ' (Live)' : ' (Normal)'}
              </strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewsComponent;
