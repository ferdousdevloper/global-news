import axios from 'axios';
import { useEffect, useState } from 'react';
import SportCard from './SportCard';

const Sport = () => {
  const [sportsNews, setSportsNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchSportsNews = async () => {
      try {
        const response = await axios.get('http://localhost:3001/news');
        const newsData = response.data;
        console.log(newsData);
        // Assuming the API returns an array of news, filter for sports news
        const filteredSportsNews = newsData.filter(news => news.category === 'Sports');
        console.log(filteredSportsNews);
        setSportsNews(filteredSportsNews);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch news');
        setLoading(false);
      }
    };

    fetchSportsNews();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen py-20 px-3">
      <div className="my-3 lg:my-4 text-center font-bold text-2xl lg:text-4xl text-orange-600">
        Sports News
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* All Sports News */}
        {sportsNews.map((news) => (
          <SportCard key={news._id} news={news} />
        ))}
      </div>
    </div>
  );
};

export default Sport;
