import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Politics = () => {
  const [allNews, setAllNews] = useState([]);
  const [newsPerPage, setNewsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(0);

  const { data: news = [] } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const result = await axios.get("/news");
      return result.data;
    },
  });

  useEffect(() => {
    fetch(`http://localhost:3001/news?pages=${currentPage}&size=${newsPerPage}`)
      .then((res) => res.json())
      .then((data) => setAllNews(data));
  }, [currentPage, newsPerPage]);

  const politicsNews = allNews.filter(
    (singleNews) => singleNews.category === "Politics"
  );
  const popularPoliticsNews = news.filter(
    (singleNews) =>
      singleNews.category === "Politics" && singleNews.popular_news === true
  );

  const numberofPages = Math.ceil(politicsNews.length / 2);
  console.log(numberofPages);
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

  return (
    <div className="bg-gray-800">
      <div className="md:pt-20 text-center font-bold text-4xl  text-base-100">
        Politics
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Politics News bar section */}
        <div className="lg:w-9/12 w-full bg-neutral-950 glass p-5 rounded-xl container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {" "}
            {politicsNews.map((item) => (
              <Link to={`/news/${item._id}`} key={item._id}>
                <div className="border p-4 rounded-lg shadow-lg glass h-[500px]">
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
          {popularPoliticsNews.map((popularNews) => (
            <Link
              to={`/news/${popularNews._id}`}
              key={popularNews._id}
              className="flex flex-col divide-y glass dark:divide-gray-300 h-32"
            >
              <div className="flex px-1 py-4">
                <img
                  alt=""
                  className="flex-shrink-0 object-cover w-20 h-20 mr-4 dark:bg-gray-500"
                  src={popularNews.image}
                />
                <div className="flex flex-col flex-grow space-y-2">
                  <p>{popularNews.title}</p>

                  <p className="text-base badge font-semibold mb-1">
                    {popularNews.category}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* pagination section */}
      <div className="py-4 flex justify-center items-center">
        <p>
          <button className="btn mr-1" onClick={handlePrevious}>
            Previous
          </button>
        </p>
        {pages.map((page) => (
          <button
            className={
              (currentPage === page && "btn bg-purple-800 text-white") ||
              "btn mr-1"
            }
            onClick={() => setCurrentPage(page)}
            key={page}
          >
            {page + 1}
          </button>
        ))}

        <p>
          <button className="btn ml-1" onClick={handleNext}>
            Next
          </button>
        </p>
        <label htmlFor="" className="ml-2 ">
          <span className="text-white px-3"> News Per Page:</span>

          <select
            name=""
            value={newsPerPage}
            onChange={handleNewsPerPage}
            className="btn bg-orange-400 text-white"
          >
            <option value="8">4</option>
            <option value="20">10</option>
            <option value="40">20</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default Politics;
