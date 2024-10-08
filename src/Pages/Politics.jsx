import axios from "axios";
import { useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";

const Politics = () => {
  const [allNews, setAllNews] = useState([]);
  const [popularNews, setPopularNews] = useState([]);
  const [newsPerPage, setNewsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(0);
  const [livePoliticsNews, setLivePoliticsNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   fetch(`http://localhost:3001/news?pages=${currentPage}&size=${newsPerPage}`)
  //     .then((res) => res.json())
  //     .then((data) => setNewsPerPage(data));
  // }, [currentPage, newsPerPage]);

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
    const fetchPoliticsNews = async () => {
      try {
        const response = await axios.get("http://localhost:3001/news");
        const newsData = response.data;
        const politicsNews = newsData.filter(
          (singleNews) => singleNews.category === "Politics"
        );
        const popularPoliticsNews = allNews.filter(
          (singleNews) =>
            singleNews.category === "Politics" &&
            singleNews.popular_news === true
        );
        const liveNews = allNews.filter(
          (singleNews) =>
            singleNews.category === "Politics" && singleNews.isLive === true
        );
        setLivePoliticsNews(liveNews[0]);
        setAllNews(politicsNews);
        setPopularNews(popularPoliticsNews);

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch news");
        setLoading(false);
      }
    };

    fetchPoliticsNews();
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
        <h2 className="font-bold text-2xl lg:text-4xl">Politics</h2>
        <p className="mt-3">
          Stay informed with the latest political news from around the world.
          Explore in-depth coverage, analysis, and updates on global political
          events, government policies, elections, and more.
        </p>
      </div>

      {/* Live Politics News */}
      {livePoliticsNews && (
        <div className="flex flex-col md:flex-row border text-white border-gray-300 rounded-lg shadow-lg overflow-hidden glass my-10">
          <div className="md:w-1/2 w-full">
            <img
              src={livePoliticsNews?.image}
              alt={livePoliticsNews?.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                {livePoliticsNews?.title}
              </h3>
              <hr className="my-4" />
              <p className="text-gray-300 mb-4">
                {livePoliticsNews?.description.slice(0, 1000)}...
              </p>
            </div>
            <div>
              <p className="text-gray-100 text-sm mb-2">
                {new Date(livePoliticsNews?.timestamp).toLocaleString()}
              </p>
              {livePoliticsNews?.isLive && (
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
      )}

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Politics News bar section */}
        <div className="lg:w-9/12 w-full bg-neutral-950 glass p-5 rounded-xl container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {" "}
            {allNews.map((item) => (
              <Link to={`/news/${item._id}`} key={item._id}>
                <div className="border p-4 rounded-lg shadow-lg glass h-[520px]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-60 object-cover mb-4 rounded-md"
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
                  <div>
                    <p className="text-gray-100 text-sm mb-2">
                      {new Date(livePoliticsNews?.timestamp).toLocaleString()}
                    </p>
                    <div className="flex justify-around items-center text-xl md:text-2xl my-5 text-slate-100">
                      <MdFavoriteBorder />
                      <CiBookmark />
                      <IoShareSocialOutline />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* popular politics news section */}
        <div className="lg:w-3/12 w-full bg-neutral-950 glass p-5 rounded-xl text-white">
          <div className="mb-8 space-x-5 border-b-2 border-opacity-10 dark:border-violet-600">
            <button
              type="button"
              className="pb-5 text-xl font-bold uppercase border-b-2 dark:border- dark:text-gray-600"
            >
              Popular
            </button>
          </div>
          {/* popular news card */}
          {popularNews.map((popularSingleNews) => (
            <Link
              to={`/news/${popularNews._id}`}
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
                    <MdFavoriteBorder />
                    <CiBookmark />
                    <IoShareSocialOutline />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* pagination section */}
      <div className=" flex justify-center items-center py-4">
        <p>
          <button
            className="btn mr-1 bg-gray-800 text-white"
            onClick={handlePrevious}
          >
            Previous
          </button>
        </p>
        {pages.map((page) => (
          <button
            className={
              (currentPage === page && "btn bg-red-900 text-white") ||
              "btn mr-1 bg-gray-800 text-white"
            }
            onClick={() => setCurrentPage(page)}
            key={page}
          >
            {page + 1}
          </button>
        ))}

        <p>
          <button
            className="btn ml-1 bg-gray-800 text-white"
            onClick={handleNext}
          >
            Next
          </button>
        </p>
        <label htmlFor="" className="ml-2 flex justify-center items-center">
          <div>
            <span className="text-white px-2"> News Per Page:</span>
          </div>

          <div>
            {" "}
            <select
              name=""
              value={newsPerPage}
              onChange={handleNewsPerPage}
              className="btn bg-gray-800 text-white"
            >
              <option value="8">4</option>
              <option value="20">10</option>
              <option value="40">20</option>
            </select>
          </div>
        </label>
      </div>
    </div>
  );
};

export default Politics;
