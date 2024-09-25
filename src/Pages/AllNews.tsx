import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LiveNews from '../Components/AllNews/LiveNews';

// Define an interface for the news item
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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('All News');
  const [selectedCountry, setSelectedCountry] = useState<string>('All Countries');
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>('All Dates');

  const fetchNews = async () => {
    try {
      const response = await axios.get<NewsItem[]>('http://localhost:3001/news');
      setNews(response.data);
      setFilteredNews(response.data);
      const uniqueCategories = Array.from(new Set<string>(response.data.map(item => item.category)));
      setCategories(uniqueCategories);
      const uniqueCountries = Array.from(new Set<string>(response.data.map(item => item.region)));
      setCountries(uniqueCountries);
    } catch (error) {
      setError('Error fetching news');
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    const searchFilteredNews = news.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      item.region.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNews(searchFilteredNews);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedFilter('All News');
    setSelectedCountry('All Countries');
    setSelectedDateFilter('All Dates');
    setFilteredNews(news);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <LiveNews/>
 <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">All News</h1>
      <div className="flex items-center mb-4 gap-4">
        {/* Dropdowns and Search Bar */}
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="px-4 py-2 border rounded-md flex-1"
        >
          <option>All News</option>
          <option>Breaking News</option>
          <option>Popular News</option>
          <option>Live News</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="px-4 py-2 border rounded-md flex-1"
        >
          <option>All Countries</option>
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>

        <select
          value={selectedDateFilter}
          onChange={(e) => setSelectedDateFilter(e.target.value)}
          className="px-4 py-2 border rounded-md flex-1"
        >
          <option>All Dates</option>
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>

        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search news..."
          className="px-4 py-2 border rounded-md flex-1"
        />

        <button
          onClick={resetFilters}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNews.map(item => (
          <div key={item._id} className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
            <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-md" />
            <h2 className="text-xl font-semibold mt-2">{item.title}</h2>
            <p className="text-gray-700 mt-1">{item.description}</p>
            <p className="text-sm text-gray-500">{new Date(item.date_time).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
   
  );
};

export default AllNews;
