import React, { useEffect, useState } from 'react';
import { CiBookmark } from 'react-icons/ci';
import { IoShareSocialOutline } from 'react-icons/io5';
import { MdFavoriteBorder } from 'react-icons/md';

interface NewsArticle {
  title: string;
  description: string;
  image: string;
  timestamp: string;
  isLive: boolean;
}

const LiveNews: React.FC = () => {
  const [latestNews, setLatestNews] = useState<NewsArticle | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the latest live news from the server
    const fetchLatestNews = async () => {
      try {
        const response = await fetch('http://localhost:3001/news?isLive=true'); // Adjust your API endpoint if needed
        if (!response.ok) {
          throw new Error('Failed to fetch live news');
        }
        const news: NewsArticle[] = await response.json();
        if (news.length > 0) {
          setLatestNews(news[0]); // Set the latest news
        } else {
          setError('No live news available');
        }
      } catch (err) {
        // Check if err is an instance of Error
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        console.error('Error fetching live news:', err);
      }
    };

    fetchLatestNews();
  }, []);

  if (error) {
    return <div className="p-6 text-red-600 text-center">{error}</div>;
  }

  if (!latestNews) {
    return (
      <div className="flex items-center justify-center h-full p-6 text-gray-700">
        <div>No live news available.</div>
      </div>
    );
  }

  const formattedDate = new Date(latestNews.timestamp).toLocaleString();

  return (
    <>
    <h1 className="text-4xl mt-16 font-black btn cursor-auto glass text-red-600">LIVE ...</h1>
    <div className="flex flex-col md:flex-row border text-white border-gray-300 rounded-lg shadow-lg overflow-hidden  glass">
      <div className="md:w-1/2 w-full">
        <img
          src={latestNews.image}
          alt={latestNews.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-2">{latestNews.title}</h3>
          <hr  className='my-4'/> 
          <p className="text-gray-300 mb-4">{latestNews.description.slice(0, 1000)}...</p>
        </div>
        <div>
          <p className="text-gray-100 text-sm mb-2">{formattedDate}</p>
          {latestNews.isLive && (
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
    </>
  );
};

export default LiveNews;
