import axios from 'axios';
import { useEffect, useState } from 'react';
import { CiBookmark } from 'react-icons/ci';
import { IoShareSocialOutline } from 'react-icons/io5';
import { MdFavoriteBorder } from 'react-icons/md';
import { Link } from 'react-router-dom';
import LatestCard from './LatestCard';
import Favorite from '../Components/Favorite';
import Bookmark from '../Components/Bookmark';
import ShareDropdown from '../Components/Home/ShareDropdown';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Lottie from 'lottie-react';
import loadingAnimation from "../loadingAnimation.json"

const Entertainment = () => {
    const [entertainmentNews, setEntertainmentNews] = useState([]);
    const [popularEntertainmentNews, setPopularEntertainmentNews] = useState([]);
    const [liveEntertainmentNews, setLiveEntertainmentNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Show 4 news items per page

    // Fetch data from the API
    useEffect(() => {
        const fetchEntertainmentNews = async () => {
            try {
                const response = await axios.get('https://global-news-server-phi.vercel.app/news');
                const newsData = response.data;
                // Filter for Entertainment news
                const filteredEntertainmentNews = newsData.filter(news => news.category === 'Entertainment');
                const filteredPopularEntertainmentNews = filteredEntertainmentNews.filter(news => news.popular_news === true);
                const liveEntertainmentNews = filteredEntertainmentNews.find(news => news.isLive);
                setEntertainmentNews(filteredEntertainmentNews);
                setPopularEntertainmentNews(filteredPopularEntertainmentNews);
                setLiveEntertainmentNews(liveEntertainmentNews || null);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch news');
                setLoading(false);
            }
        };

        fetchEntertainmentNews();
    }, []);

    // Pagination logic
  const totalItems = entertainmentNews.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNews = entertainmentNews.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto min-h-screen py-20">
            <div className='lg:w-1/2 mx-auto my-3 lg:my-4 text-center text-gray-100'>
                <h2 className="font-bold text-2xl lg:text-4xl">
                    Entertainment News Here
                </h2>
                <p className='mt-3'>Catch up on the latest entertainment news, from movies and TV shows to celebrity updates, music trends, and exclusive interviews, bringing you closer to the stars.</p>
            </div>

            {/* Live Entertainment News */}
            {
                liveEntertainmentNews && (
                    <div className="flex flex-col md:flex-row border text-white border-gray-300 rounded-lg shadow-lg overflow-hidden glass my-10">
                        <div className="md:w-1/2 w-[500px] h-[500px]">
                            <img
                                src={liveEntertainmentNews?.image}
                                alt={liveEntertainmentNews?.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">
                                    {liveEntertainmentNews?.title}
                                </h3>
                                <hr className="my-4" />
                                <p className="text-gray-300 mb-4">
                                    {liveEntertainmentNews?.description.length > 1000 ? (
                                        <>
                                            {liveEntertainmentNews?.description.slice(0, 1000)}...
                                            <Link
                                                to={`/news/${liveEntertainmentNews?._id}`}
                                                className="text-blue-500 hover:text-blue-300"
                                            >
                                                {" "}See More
                                            </Link>
                                        </>
                                    ) : (
                                        liveEntertainmentNews?.description
                                    )}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-100 text-sm mb-2">
                                    {new Date(liveEntertainmentNews?.timestamp).toLocaleString()}
                                </p>
                                {liveEntertainmentNews?.isLive && (
                                    <span className="px-4 py-1 bg-red-600 text-white text-xs font-semibold uppercase rounded-full">
                                        Live
                                    </span>
                                )}
                                <div className="flex justify-between items-center text-xl md:text-2xl my-3 text-slate-100 relative z-10">
                                    <Favorite newsId={liveEntertainmentNews._id} />
                                    <Bookmark newsId={liveEntertainmentNews._id} />

                                    <div className="relative">
                                        <ShareDropdown url={`https://global-news-server-phi.vercel.app/news/${liveEntertainmentNews._id}`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* All Entertainment News */}
            <div className='flex flex-col lg:flex-row gap-5 px-4'>
                <div className="lg:w-9/12 w-full bg-neutral-950 glass p-5 rounded-xl">
                    <h2 className="text-2xl font-extrabold mb-4 text-slate-50">
                        Entertainment
                    </h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                        {currentNews.map((news) => (
                            <LatestCard key={news._id} news={news} />
                        ))}
                    </div>
                </div>

                {/* Latest Entertainment News */}
                <div className="lg:w-3/12 w-full bg-neutral-950 glass p-5 rounded-xl">
                    <h2 className="text-2xl font-extrabold mb-4 text-slate-50">
                        Popular News
                    </h2>
                    <div className='flex flex-col gap-5'>
                        {popularEntertainmentNews.slice(0, 6).map((news) => (
                            <LatestCard key={news._id} news={news} />
                        ))}
                    </div>
                </div>
            </div>
            {/* Pagination Section */}
      <div className="mt-6 flex justify-center items-center">
          <button
           data-aos="fade-up"
           data-aos-duration="1000" 
           data-aos-delay="200"
            className="px-4 py-2 mx-1 bg-colorPrimary glass rounded-lg"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaArrowLeft />
          </button>

          {currentPage > 1 && (
            <button
            data-aos="fade-up"
            data-aos-duration="1000" 
            data-aos-delay="250"
              className="px-4 py-2 mx-1 rounded-lg bg-gray-800 glass"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              {currentPage - 1}
            </button>
          )}

          <span 
           data-aos="fade-up"
           data-aos-duration="1000" 
           data-aos-delay="300"
          className="px-4 py-2 mx-1 rounded-lg bg-colorPrimary glass text-white">
            {currentPage}
          </span>

          {currentPage < totalPages && (
            <button
            data-aos="fade-up"
            data-aos-duration="1000" 
            data-aos-delay="350"
              className="px-4 py-2 mx-1 rounded-lg bg-gray-800 glass"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              {currentPage + 1}
            </button>
          )}

          <button
           data-aos="fade-up"
           data-aos-duration="1000" 
           data-aos-delay="400"
            className="px-4 py-2 mx-1 bg-colorPrimary glass rounded-lg"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FaArrowRight />
          </button>
        </div>
        </div>
    );
};

export default Entertainment;
