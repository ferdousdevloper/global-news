import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LiveNews from '../Components/AllNews/LiveNews';

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
  const [categories, setCategories] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All News');
  const [selectedCountry, setSelectedCountry] = useState<string>('All Countries');
  const [selectedDate, setSelectedDate] = useState<string>('All Dates');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedNewsType, setSelectedNewsType] = useState<string>('All News Types');

  const dateOptions = ['All Dates', 'Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days'];
  const newsTypeOptions = ['All News Types', 'Live News', 'Breaking News', 'Popular News', 'Latest News'];

  const fetchNews = async () => {
    try {
      const response = await axios.get<NewsItem[]>('http://localhost:3001/news');
      setNews(response.data);
      setFilteredNews(response.data);
      setCategories(Array.from(new Set(response.data.map(item => item.category))));
      setCountries(Array.from(new Set(response.data.map(item => item.region))));
    } catch (error) {
      setError('Error fetching news');
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterNews = () => {
    const now = new Date();
    const filtered = news.filter(item => {
      const itemDate = new Date(item.date_time || item.timestamp);
      const matchesCategory = selectedCategory === 'All News' || item.category === selectedCategory;
      const matchesCountry = selectedCountry === 'All Countries' || item.region === selectedCountry;
      const matchesDate =
        selectedDate === 'All Dates' ||
        (selectedDate === 'Today' && itemDate.toDateString() === now.toDateString()) ||
        (selectedDate === 'Yesterday' && itemDate.toDateString() === new Date(now.setDate(now.getDate() - 1)).toDateString()) ||
        (selectedDate === 'Last 7 Days' && itemDate >= new Date(now.setDate(now.getDate() - 7))) ||
        (selectedDate === 'Last 30 Days' && itemDate >= new Date(now.setDate(now.getDate() - 30)));

      const matchesSearch = searchTerm === '' || item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesNewsType =
        selectedNewsType === 'All News Types' ||
        (selectedNewsType === 'Live News' && item.isLive) ||
        (selectedNewsType === 'Breaking News' && item.breaking_news) ||
        (selectedNewsType === 'Popular News' && item.popular_news);

      return matchesCategory && matchesCountry && matchesDate && matchesSearch && matchesNewsType;
    });
    setFilteredNews(filtered);
  };

  const resetFilters = () => {
    setSelectedCategory('All News');
    setSelectedCountry('All Countries');
    setSelectedDate('All Dates');
    setSearchTerm('');
    setSelectedNewsType('All News Types');
    setFilteredNews(news);
  };

  useEffect(() => {
    fetchNews(); // Initial fetch
  }, []);

  useEffect(() => {
    filterNews(); // Filter whenever the filters change
  }, [selectedCategory, selectedCountry, selectedDate, searchTerm, selectedNewsType]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <LiveNews />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">All News</h1>

        {/* Filter and Reset Button Container */}
        <div className="flex justify-between mb-4">
          <div className="flex gap-4">
            {/* Category Dropdown */}
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-4 py-2 border rounded-md">
              <option>All News</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Country Dropdown */}
            <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="px-4 py-2 border rounded-md">
              <option>All Countries</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>

            {/* Date Dropdown */}
            <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="px-4 py-2 border rounded-md">
              {dateOptions.map(date => (
                <option key={date} value={date}>{date}</option>
              ))}
            </select>

            {/* News Type Dropdown */}
            <select value={selectedNewsType} onChange={(e) => setSelectedNewsType(e.target.value)} className="px-4 py-2 border rounded-md">
              {newsTypeOptions.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            {/* Reset Button */}
            <button onClick={resetFilters} className="px-4 py-2 bg-red-500 text-white rounded-md ml-2">Reset</button>
          </div>

          {/* Search Bar Container */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search news..."
            className="px-3 py-1 border rounded-md w-1/3"
          />
        </div>

        {/* Conditional rendering for filtered news */}
        {filteredNews.length === 0 ? (
          <p className="text-center text-gray-500 mt-4">No news available based on the selected filters. Please try different options.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNews.map(item => (
              <div key={item._id} className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-md" />
                <h2 className="text-xl font-semibold mt-2">{item.title}</h2>
                <p className="text-gray-700 mt-1">{item.description}</p>
                <p className="text-sm text-gray-500">
                  {item.date_time && item.date_time !== ''
                    ? new Date(item.date_time).toLocaleString()
                    : new Date(item.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllNews;
