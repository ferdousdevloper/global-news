import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Favorite from "../Components/Favorite";
import ShareDropdown from "../Components/Home/ShareDropdown";
import Bookmark from "../Components/Bookmark";

const Technology = () => {
  const [allNews, setAllNews] = useState([]);
  const [popularNews, setPopularNews] = useState([]);
  const [newsPerPage, setNewsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(0);
  const [liveTechNews, setLiveTechNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const numberofPages = Math.ceil(allNews.length / 2);
  const pages = [...Array(numberofPages).keys()];

  const handleNewsPerPage = (e) => {
    const value = parseInt(e.target.value);
    setNewsPerPage(value);
    setCurrentPage(0);
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    const fetchTechNews = async () => {
      try {
        const response = await axios.get("https://global-news-server-phi.vercel.app/news");
        const newsData = response.data;
        const techNews = newsData.filter(
          (singleNews) => singleNews.category === "Technology"
        );
        const popularTechNews = newsData.filter(
          (singleNews) =>
            singleNews.category === "Technology" &&
            singleNews.popular_news === true
        );
        const liveNews = newsData.filter(
          (singleNews) =>
            singleNews.category === "Technology" && singleNews.isLive === true
        );
        setLiveTechNews(liveNews[0]);
        setAllNews(techNews);
        setPopularNews(popularTechNews);

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch news");
        setLoading(false);
      }
    };

    fetchTechNews();
  }, [currentPage, newsPerPage, allNews]);

  if (loading) {
    return (
      <div>
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-gray-800 container mx-auto min-h-screen pt-20">
      <div className="lg:w-1/2 mx-auto my-3 lg:my-4 text-center text-gray-100">
        <h2 className="font-bold text-2xl lg:text-4xl">Technology</h2>
        <p className="mt-3">
          Discover the latest advancements and innovations in the world of
          technology, covering everything from groundbreaking gadgets to
          emerging trends. Stay informed with in-depth analysis and news on how
          technology is shaping the future.
        </p>
      </div>

      {/* Live Technology News */}
      {liveTechNews && (
        <div className="flex flex-col md:flex-row border text-white border-gray-300 rounded-lg shadow-lg overflow-hidden glass my-10">
          <div className="md:w-1/2 w-full">
            <img
              src={liveTechNews?.image}
              alt={liveTechNews?.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">{liveTechNews?.title}</h3>
              <hr className="my-4" />
              <p className="text-gray-300 mb-4">
                {liveTechNews?.description.slice(0, 1000)}...
              </p>
            </div>
            <div>
              <p className="text-gray-100 text-sm mb-2">
                {new Date(liveTechNews?.timestamp).toLocaleString()}
              </p>
              {liveTechNews?.isLive && (
                <span className="px-4 py-1 bg-red-600 text-white text-xs font-semibold uppercase rounded-full">
                  Live
                </span>
              )}
              <div className="flex justify-between items-center text-xl md:text-2xl my-3 text-slate-100">
                <Favorite newsId={liveTechNews._id} />
                <Bookmark newsId={liveTechNews._id} />
                <ShareDropdown url={`https://global-news-server-phi.vercel.app/news/${liveTechNews._id}`} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Technology News */}
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="lg:w-9/12 w-full bg-neutral-950 glass p-5 rounded-xl container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {allNews.map((item) => (
              <div
                key={item._id}
                className="border p-4 rounded-lg shadow-lg glass flex flex-col h-full min-h-[400px]"
              >
                <Link to={`/news/${item._id}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-40 object-cover mb-4 rounded-md"
                  />
                </Link>
                <div className="flex-grow flex flex-col">
                  <h3 className="text-base badge font-semibold mb-1">
                    {item.category}
                  </h3>
                  <Link to={`/news/${item._id}`}>
                    <h2 className="text-xl font-bold mb-2 text-slate-50 hover:underline">
                      {item.title}
                    </h2>
                  </Link>
                  <p className="text-sm mb-2 text-slate-100">
                    {new Date(item.date_time).toLocaleDateString()}
                  </p>
                  <p className="text-slate-100 flex-grow">
                    {item.description.length > 80 ? (
                      <>
                        {item.description.slice(0, 80)}...
                        <Link
                          to={`/news/${item._id}`}
                          className="text-green-500 hover:text-green-300"
                        >
                          {" "}
                          See More
                        </Link>
                      </>
                    ) : (
                      item.description
                    )}
                  </p>
                </div>
                <div className="flex justify-between items-center text-xl md:text-2xl mt-auto pt-4 text-slate-100">
                  <Favorite newsId={item._id} />
                  <Bookmark newsId={item._id} />
                  <ShareDropdown url={`https://global-news-server-phi.vercel.app/news/${item._id}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular News Section */}
        <div className="lg:w-3/12 w-full bg-neutral-950 glass p-5 rounded-xl text-white">
          <div className="mb-8 space-x-5 border-b-2 border-opacity-10 dark:border-violet-600">
            <button
              type="button"
              className="pb-5 text-xl font-bold uppercase border-b-2 dark:border- dark:text-gray-600"
            >
              Popular
            </button>
          </div>
          {popularNews.map((popularSingleNews) => (
            <Link
              to={`/news/${popularSingleNews._id}`}
              key={popularSingleNews._id}
              className="flex flex-col divide-y my-2 glass dark:divide-gray-300 h-40"
            >
              <div className="flex px-1 py-4">
                <img
                  alt=""
                  className="flex-shrink-0 object-cover w-20 h-full mr-4 dark:bg-gray-500"
                  src={popularSingleNews.image}
                />
                <div className="flex flex-col flex-grow space-y-2">
                  <p>{popularSingleNews.title}</p>
                  <p className="text-base badge font-semibold mb-1">
                    {popularSingleNews.category}
                  </p>
                  <hr className="my-2" />
                  <div className="flex justify-around items-center text-lg md:text-xl my-1 text-slate-100">
                    <Favorite newsId={popularSingleNews._id} />
                    <Bookmark newsId={popularSingleNews._id} />
                    <ShareDropdown url={`https://global-news-server-phi.vercel.app/news/${popularSingleNews._id}`} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Pagination Section */}
      <div className="flex justify-center items-center py-4">
        <button
          className="btn mr-1 bg-gray-800 text-white"
          onClick={handlePrevious}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <select
          value={newsPerPage}
          onChange={handleNewsPerPage}
          className="bg-gray-800 text-white px-3 py-2 rounded-lg"
        >
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="10">10</option>
        </select>
        <button
          className="btn ml-1 bg-gray-800 text-white"
          onClick={handleNext}
          disabled={currentPage === pages.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Technology;
