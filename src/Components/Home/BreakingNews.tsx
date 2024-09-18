import React, { useEffect, useState } from 'react';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  breaking_news: boolean;
}

const BreakingNews: React.FC = () => {
  const [breakingNews, setBreakingNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    // Fetch the breaking news from dammy.json
    fetch('/dammy.json')
      .then((response) => response.json())
      .then((data) => {
        // Filter the breaking news
        const latestBreakingNews = data.filter((item: NewsItem) => item.breaking_news);
        setBreakingNews(latestBreakingNews.slice(0, 5)); // Limit to 5 items
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="relative w-full bg-red-600 text-white h-12 flex items-center overflow-hidden">
      <div className="bg-red-700 px-4 py-1 text-white font-bold uppercase">
        Breaking News
      </div>
      <div className="ml-4 overflow-hidden whitespace-nowrap">
        <div className="inline-block whitespace-nowrap animate-marquee">
          {breakingNews.map((item) => (
            <span key={item.id} className="mx-4">
              <strong>{item.title}:</strong> {item.description}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;
