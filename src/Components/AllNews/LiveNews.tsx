import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

interface NewsArticle {
  title: string;
  description: string;
  image: string;
  timestamp: string;
  isLive: boolean;
}

const LiveNews: React.FC = () => {
  const [latestNews, setLatestNews] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestLiveNews = async () => {
      const response = await fetch('http://localhost:3001/news?isLive=true');
      const news = await response.json();
      if (news.length > 0) {
        setLatestNews(news[0]);
      } else {
        setLatestNews(null);
      }
      setLoading(false);
    };

    fetchLatestLiveNews();

    socket.on('liveNews', (news: NewsArticle[]) => {
      if (news && news.length > 0) {
        setLatestNews(news[0]);
        setLoading(false);
      }
    });

    return () => {
      socket.off('liveNews');
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-6 text-gray-700">
        <div>Loading latest live news...</div>
      </div>
    );
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
    <div className="flex bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden mt-16">
      <div className="w-1/2">
        <img
          src={latestNews.image}
          alt={latestNews.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-1/2 p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{latestNews.title}</h3>
          <p className="text-gray-600 mb-4">{latestNews.description}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm mb-2">{formattedDate}</p>
          {latestNews.isLive && (
            <span className="px-4 py-1 bg-red-600 text-white text-xs font-semibold uppercase rounded-full">
              Live
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveNews;
