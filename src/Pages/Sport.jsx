import axios from 'axios';
import { useEffect, useState } from 'react';
import SportCard from './SportCard';

const Sport = () => {
  const [sportsNews, setSportsNews] = useState([]);
  const [latestSportsNews, setLatestSportsNews] = useState([]);
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
        const filteredLatestSportsNews = filteredSportsNews.filter(news => news.popular_news === true);
        console.log(filteredLatestSportsNews);
        setSportsNews(filteredSportsNews);
        setLatestSportsNews(filteredLatestSportsNews);
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
      <h2 className="my-3 lg:my-4 text-center font-bold text-2xl lg:text-4xl text-orange-600">
        Sports
      </h2>

      <div className='flex flex-col lg:flex-row gap-5'>
        <div className="lg:w-9/12 w-full bg-neutral-950 glass p-5 rounded-xl">
          <h2 className="text-2xl font-extrabold mb-4 text-slate-50">
            Sports News
          </h2>
          {/* All Sports News */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
            {sportsNews.map((news) => (
              <SportCard key={news._id} news={news} />
            ))}
          </div>

          <button className="mt-6 bg-[#02AA08] text-white px-4 py-2 rounded hover:bg-[#028A06] glass">
            See More
          </button>
        </div>

        {/* Latest Sports News */}
        <div className="lg:w-3/12 w-full bg-neutral-950 glass p-5 rounded-xl">
          <h2 className="text-2xl font-extrabold mb-4 text-slate-50">
            Latest News
          </h2>
          <div className='flex flex-col gap-5'>
            {sportsNews.map((news) => (
              <SportCard key={news._id} news={news} />
            ))}
          </div>

          <button className="mt-6 bg-[#02AA08] text-white px-4 py-2 rounded hover:bg-[#028A06] glass">
            See More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sport;
