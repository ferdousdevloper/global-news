import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

interface NewsItem {
  category: string;
  _id: string;
  title: string;
  image: string;
  description: string;
  date_time: string;
}

const NewsSection: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the data from the backend API
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:3001p/news");
        setNews(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load news data");
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const latestNews = news.slice(0, 7); // Get the top 7 latest news
  const allNews = news.slice(7, 17); // Show 10 more news items

  console.log(latestNews);

  return (
    <div className="container mx-auto my-10" style={{ width: "85%" }}>
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Left side: 75% width, all news */}
        <div className="lg:w-9/12 w-full bg-neutral-950 glass p-5 rounded-xl">
          <h2 className="text-3xl font-bold mb-4 text-slate-50">All News</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {allNews.map((item) => (
              <Link to={`/news/${item._id}`} key={item._id}>
                <div className="border p-4 rounded-lg shadow-lg glass">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-40 object-cover mb-4 rounded-md"
                  />
                  <h3 className="text-base badge font-semibold mb-1 ">
                  {item.category}
                </h3>
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
              </Link>
            ))}
          </div>
          <button className="mt-6 bg-[#02AA08] glass text-white px-4 py-2 rounded hover:bg-[#028A06]">
            See More
          </button>
        </div>

        {/* Right side: 25% width, latest news */}
        <div className="lg:w-3/12 w-full bg-neutral-950 glass p-5 rounded-xl">
          <h2 className="text-2xl font-extrabold mb-4 text-slate-50">
            Latest News
          </h2>
          <div className="space-y-6">
            {latestNews.map((item) => (
              <Link to={`/news/${item._id}`} key={item._id}>
              <div key={item._id} className="border p-4 my-6 rounded-lg shadow-lg glass">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-24 object-cover mb-2 rounded-md"
                />
                <h3 className="text-base badge font-semibold mb-1 ">
                  {item.category}
                </h3>
                <h3 className="text-lg font-semibold mb-1 text-slate-50">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-100">
                  {new Date(item.date_time).toLocaleDateString()}
                </p>
              </div>
              </Link>
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

export default NewsSection;
