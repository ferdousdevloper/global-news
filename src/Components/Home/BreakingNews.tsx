import React, { useEffect, useState } from "react";

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
    fetch("https://global-news-server-phi.vercel.app/news")
      .then((response) => response.json())
      .then((data) => {
        // Filter the breaking news
        const latestBreakingNews = data.filter(
          (item: NewsItem) => item.breaking_news
        );
        setBreakingNews(latestBreakingNews.slice(0, 9)); // Limit to 9 items
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div 
    data-aos="zoom-in"
    data-aos-duration="1000" 
    data-aos-delay="200"
    className="relative w-full bg-red-900 text-white mr-2 h-16 flex items-center overflow-hidden border-y-2 border-red-400 glass">
      <div className=" bg-gradient-to-r from-red-700 to-red-500 p-4 text-xl font-bold uppercase text-nowrap glass">
        Breaking News
      </div>
      <div className="ml-1 overflow-hidden whitespace-nowrap">
        <div className="inline-block whitespace-nowrap animate-marquee text-xl">
          {breakingNews.map((item) => (
            <span key={item.id} className="mx-4">
              <strong>|| {item.title} ||</strong>
              {/* {item.description} */}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;
