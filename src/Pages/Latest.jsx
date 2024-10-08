import axios from "axios";
import { useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import LatestCard from "./LatestCard";

const Latest = () => {

  const [latestNews, letLatestNews] = useState([]);
  const [popularNews, setPopularNews] = useState([]);
  const [liveLatestNews, setLiveLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchSportsNews = async () => {
      try {
        const response = await axios.get('http://localhost:3001/news');
        const newsData = response.data;
        console.log(newsData);
        // Assuming the API returns an array of news, filter for latest news
        const filteredLatestNews = newsData.filter(news => (news.breaking_news === true && news.popular_news === true));
        const filteredLiveNews = filteredLatestNews.filter(news => news.isLive === true);
        console.log(filteredLiveNews);
        const filteredPopularNews = filteredLatestNews.filter(news => news.popular_news === true);
        console.log(filteredLiveNews);
        setLiveLatestNews(filteredLiveNews[0]);
        letLatestNews(filteredLatestNews);
        setPopularNews(filteredPopularNews);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch news');
        setLoading(false);
      }
    };

    fetchSportsNews();
  }, [liveLatestNews]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <div className="container mx-auto min-h-screen py-20">
    <div className='lg:w-1/2 mx-auto my-3 lg:my-4 text-center text-gray-100'>
      <h2 className="font-bold text-2xl lg:text-4xl">
        Latest News Here
      </h2>
      <p className='mt-3'>The Latest News section delivers up-to-date headlines, covering breaking stories from around the world, ensuring real-time information access for users.</p>
    </div>

    {/* Live Sports News */}
    {
      liveLatestNews && <div className="flex flex-col md:flex-row border text-white border-gray-300 rounded-lg shadow-lg overflow-hidden glass my-10">
        <div className="md:w-1/2 w-full">
          <img
            src={liveLatestNews?.image}
            alt={liveLatestNews?.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">{liveLatestNews?.title}</h3>
            <hr className='my-4' />
            <p className="text-gray-300 mb-4">{liveLatestNews?.description.slice(0, 1000)}...</p>
          </div>
          <div>
            <p className="text-gray-100 text-sm mb-2">{new Date(liveLatestNews?.timestamp).toLocaleString()}</p>
            {liveLatestNews?.isLive && (
              <span className="px-4 py-1 bg-red-600 text-white text-xs font-semibold uppercase rounded-full">
                Live
              </span>
            )}
            <div className="flex justify-between items-center text-xl md:text-2xl my-3 text-slate-100">
              <MdFavoriteBorder />
              <CiBookmark />
              <IoShareSocialOutline />
            </div>
          </div>
        </div>
      </div>
    }

    {/* All Sports News */}
    <div className='flex flex-col lg:flex-row gap-5 px-4'>
      <div className="lg:w-9/12 w-full bg-neutral-950 glass p-5 rounded-xl">
        <h2 className="text-2xl font-extrabold mb-4 text-slate-50">
          Latest News
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
          {latestNews.slice(0, 12).map((news) => (
            <LatestCard key={news._id} news={news} />
          ))}
        </div>

        <button className="mt-6 bg-[#02AA08] text-white px-4 py-2 rounded hover:bg-[#028A06] glass">
          See More
        </button>
      </div>

      {/* Latest Sports News */}
      <div className="lg:w-3/12 w-full bg-neutral-950 glass p-5 rounded-xl">
        <h2 className="text-2xl font-extrabold mb-4 text-slate-50">
          Popular News
        </h2>
        <div className='flex flex-col gap-5'>
          {popularNews.slice(0, 6).map((news) => (
            <LatestCard key={news._id} news={news} />
          ))}
        </div>
        <button className="mt-6 bg-[#02AA08] text-white px-4 py-2 rounded hover:bg-[#028A06] glass">
          See More
        </button>
      </div>
    </div>
  </div>
};

export default Latest;
