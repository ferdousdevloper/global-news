import React, { useEffect, useState } from "react";

interface NewsItem {
  id: string;
  title: string;
  image: string;
  description: string;
  date_time: string;
}

const NewsSection: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    // Fetch the data from a local or API source
    fetch("/dammy.json")
      .then((response) => response.json())
      .then((data) => setNews(data))
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  const latestNews = news.slice(0, 7); // Get the top 7 latest news
  const allNews = news.slice(7, 17); // Show 10 more news items

  return (
    <div className="container mx-auto my-10" style={{ width: "85%" }}>
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Left side: 75% width, all news */}
        <div className="lg:w-9/12 w-full bg-slate-900 p-5 rounded-xl">
          <h2 className="text-3xl font-bold mb-4 text-slate-50">All News</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {allNews.map((item) => (
              <div key={item.id} className="border p-4 rounded-lg shadow-lg">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover mb-4 rounded-md"
                />
                <h2 className="text-xl font-bold mb-2 text-slate-50">
                  {item.title}
                </h2>
                <p className="text-sm mb-2 text-slate-100">
                  {new Date(item.date_time).toLocaleDateString()}
                </p>
                <p className="text-slate-100">
                  {item.description.slice(0, 100)}...
                </p>
              </div>
            ))}
          </div>
          <button className="mt-6 bg-[#02AA08] text-white px-4 py-2 rounded hover:bg-[#028A06]">
            See More
          </button>
        </div>

        {/* Right side: 25% width, latest news */}
        <div className="lg:w-3/12 w-full bg-slate-900 p-5 rounded-xl">
          <h2 className="text-2xl font-extrabold mb-4 text-slate-50">
            Latest News
          </h2>
          <div className="space-y-6">
            {latestNews.map((item) => (
              <div key={item.id} className="border p-4 rounded-lg shadow-lg">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-24 object-cover mb-2 rounded-md"
                />
                <h3 className="text-lg font-semibold mb-1 text-slate-50">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-100">
                  {new Date(item.date_time).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
          <button className="mt-6 bg-[#02AA08] text-white px-4 py-2 rounded hover:bg-[#028A06]">
            See More
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
