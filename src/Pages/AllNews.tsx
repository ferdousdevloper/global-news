import React, { useEffect, useState } from "react";
import axios from "axios";
import LiveNews from "../Components/AllNews/LiveNews";

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
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>('All Dates');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('All News');

  const fetchNews = async () => {
    try {
      const response = await axios.get<NewsItem[]>(
        "https://global-news-server-five.vercel.app/news"
      );
      setNews(response.data);
      setFilteredNews(response.data);

      const uniqueCategories = Array.from(new Set<string>(response.data.map(item => item.category)));
      setCategories(uniqueCategories);
      
      const uniqueCountries = Array.from(new Set<string>(response.data.map(item => item.region)));
      setCountries(uniqueCountries);
    } catch (error) {
      setError("Error fetching news");
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterNews = () => {
    let updatedFilteredNews = news;

    // Filter by search query
    if (searchTerm) {
      updatedFilteredNews = updatedFilteredNews.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.region.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedFilter !== 'All News') {
      if (selectedFilter === 'Breaking News') {
        updatedFilteredNews = updatedFilteredNews.filter(item => item.breaking_news);
      } else if (selectedFilter === 'Popular News') {
        updatedFilteredNews = updatedFilteredNews.filter(item => item.popular_news);
      } else if (selectedFilter === 'Live News') {
        updatedFilteredNews = updatedFilteredNews.filter(item => item.isLive);
      } else {
        updatedFilteredNews = updatedFilteredNews.filter(item => item.category === selectedFilter);
      }
    }

    // Filter by country
    if (selectedCountry !== 'All Countries') {
      updatedFilteredNews = updatedFilteredNews.filter(item => item.region === selectedCountry);
    }

    // Optionally filter by date
    if (selectedDateFilter !== 'All Dates') {
      const today = new Date();
      if (selectedDateFilter === 'Today') {
        updatedFilteredNews = updatedFilteredNews.filter(item => 
          new Date(item.date_time).toDateString() === today.toDateString()
        );
      } else if (selectedDateFilter === 'Last 7 Days') {
        const lastWeek = new Date();
        lastWeek.setDate(today.getDate() - 7);
        updatedFilteredNews = updatedFilteredNews.filter(item => 
          new Date(item.date_time) >= lastWeek
        );
      } else if (selectedDateFilter === 'Last 30 Days') {
        const lastMonth = new Date();
        lastMonth.setDate(today.getDate() - 30);
        updatedFilteredNews = updatedFilteredNews.filter(item => 
          new Date(item.date_time) >= lastMonth
        );
      }
    }

    setFilteredNews(updatedFilteredNews);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const resetFilters = () => {
    setSelectedCategory('All News');
    setSelectedCountry('All Countries');
    setSelectedDateFilter('All Dates');
    setSearchTerm('');
    setSelectedFilter('All News');
    setFilteredNews(news);
  };

  useEffect(() => {
    fetchNews(); // Initial fetch
  }, []);

  useEffect(() => {
    filterNews();
  }, [searchTerm, selectedFilter, selectedCountry, selectedDateFilter, news]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <LiveNews />
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
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>

          <input
            type="text"
            value={searchTerm}
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
