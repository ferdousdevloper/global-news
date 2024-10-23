import axios from "axios";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { useParams, Link } from "react-router-dom";
import ShareDropdown from "../Components/Home/ShareDropdown";
import Bookmark from "../Components/Bookmark";
import Favorite from "../Components/Favorite";
import Lottie from "lottie-react";
import loadingAnimation from "../loadingAnimation.json"

const NewsDetail = () => {
  const { id } = useParams(); // Get the id from the URL
  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the current news details based on the id
  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/news/${id}`);
        setNews(response.data);
        setLoading(false);

        // Fetch related news after getting the current news category
        if (response.data.category) {
          fetchRelatedNews(response.data.category);
        }
      } catch (err) {
        setError("Failed to load news details");
        setLoading(false);
      }
    };

    const fetchRelatedNews = async (category) => {
      try {
        const response = await axios.get(
          `http://localhost:3001/news?category=${category}`
        );
        const filteredNews = response.data.filter((n) => n._id !== id); // Exclude the current news item
        setRelatedNews(filteredNews);
      } catch (err) {
        console.error("Failed to fetch related news");
      }
    };

    fetchNewsDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="w-2/4 mx-auto">
        <Lottie
          animationData={loadingAnimation}
          height={100}
          width={100}
        ></Lottie>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="md:container mx-2 py-40 md:mx-auto  justify-center items-center min-h-screen ">
      <h1 
      data-aos="zoom-in"
      data-aos-duration="1000" 
      data-aos-delay="200"
      className="text-center text-3xl font-black py-4 text-gray-100">News Details</h1>
      <hr 
      data-aos="zoom-in"
      data-aos-duration="1000" 
      data-aos-delay="300"
      className="py-8" />
      <div className="w-full md:p-8 bg-neutral-950 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out glass">
        {news ? (
          <>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-[60%] glass bg-neutral-900 p-4 rounded-lg">
                <img
                data-aos="zoom-in"
                data-aos-duration="1000" 
                data-aos-delay="400"
                  src={news.image}
                  alt={news.title}
                  className="w-full object-cover mb-6 rounded-lg"
                />
                <div className="flex-1">
                  <div 
                  data-aos="zoom-in"
                  data-aos-duration="1000" 
                  data-aos-delay="450"
                  className="flex justify-between text-gray-200 text-sm mb-6">
                    <span>Category: {news.category}</span>
                    <div className="flex gap-2 items-center">
                      <FaLocationDot className="text-red-700" />
                      <span>Region: {news.region}</span>
                    </div>
                  </div>
                  <p 
                  data-aos="zoom-in"
                  data-aos-duration="1000" 
                  data-aos-delay="500"
                  className="text-gray-200 text-sm mb-6">
                    Published on:{" "}
                    {new Date(news.timestamp).toLocaleDateString()}
                  </p>
                  <div
                  data-aos="zoom-in"
                  data-aos-duration="1000" 
                  data-aos-delay="550"
                  className="flex justify-between">
                    <span
                      className={`text-sm font-semibold ${
                        news.breaking_news ? "text-red-500" : "text-gray-700"
                      } badge`}
                    >
                      {news.breaking_news ? "Breaking News" : "Regular News"}
                    </span>
                    <span
                      className={`text-sm font-semibold ${
                        news.popular_news
                          ? "text-colorPrimary"
                          : "text-gray-400"
                      } badge`}
                    >
                      {news.popular_news ? "Popular News" : "Less Popular"}
                    </span>
                  </div>
                  <hr
                  data-aos="zoom-in"
                  data-aos-duration="1000" 
                  data-aos-delay="600"
                  className="my-2" />
                  <div 
                  data-aos="zoom-in"
                  data-aos-duration="1000" 
                  data-aos-delay="700"
                  className="text-gray-300">
                    <h3 className="font-bold underline mb-4">News:</h3>
                    <p className="text-lg leading-relaxed mb-6 text-justify">
                      {news.description}
                    </p>
                    <div className="flex justify-between items-center text-xl md:text-2xl my-3">
                      <Favorite newsId={news._id} />
                      <Bookmark newsId={news._id} />
                      <ShareDropdown
                        url={`http://localhost:3001/news/${news._id}`}
                      />
                    </div>
                  </div>
                </div>
                
              </div>
              {/* Related News Section */}
            <div className="md:w-[40%]">
              <h3 className="text-2xl font-bold mb-4 text-white">Related News</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedNews.slice(0,6).map((related) => (
                  <div 
                  data-aos="zoom-in"
           data-aos-duration="1000" 
           data-aos-delay="400"
                  key={related._id} className="bg-neutral-900 rounded-lg p-4 glass">
                    <Link to={`/news/${related._id}`}>
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-full h-40 object-cover mb-3 rounded-lg"
                      />
                      <h4 className="text-xl font-semibold text-white mb-2">{related.title}</h4>
                      <p className="text-gray-400 text-sm">{related.description.slice(0, 100)}...</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            </div>
            {/* <div className='flex flex-col lg:flex-row items-center text-left gap-2'>
              <h1 className="text-4xl font-bold mb-4 text-center text-white">{news.title}</h1>
            </div>
            <hr className='py-4' />
            <img
              src={news.image}
              alt={news.title}
              className="w-full object-cover mb-6 rounded-lg"
            />

            <div className="flex justify-between text-gray-200 text-sm mb-6">
              <span>Category: {news.category}</span>
              <div className='flex gap-2 items-center'>
                <FaLocationDot className='text-red-700' />
                <span>Region: {news.region}</span>
              </div>
            </div>
            <p className="text-gray-200 text-sm mb-6">
              Published on: {new Date(news.timestamp).toLocaleDateString()}
            </p>
            <div className="flex justify-between">
              <span
                className={`text-sm font-semibold ${news.breaking_news ? "text-red-500" : "text-gray-700"} badge`}
              >
                {news.breaking_news ? "Breaking News" : "Regular News"}
              </span>
              <span
                className={`text-sm font-semibold ${news.popular_news ? "text-colorPrimary" : "text-gray-400"} badge`}
              >
                {news.popular_news ? "Popular News" : "Less Popular"}
              </span>
            </div>
            <hr className="my-2" />
            <div className='text-gray-300'>
              <h3 className='font-bold underline mb-4'>News:</h3>
              <p className="text-lg leading-relaxed mb-6 text-justify">{news.description}</p>
              <div className="flex justify-between items-center text-xl md:text-2xl my-3">
                <Favorite newsId={news._id} />
                <Bookmark newsId={news._id} />
                <ShareDropdown url={`http://localhost:3001/news/${news._id}`} />
              </div>
            </div> */}
          </>
        ) : (
          <p>No news found</p>
        )}
      </div>
    </div>
  );
};

export default NewsDetail;
