import axios from 'axios';
import { useEffect, useState } from 'react';
import { CiBookmark } from 'react-icons/ci';
import { IoShareSocialOutline } from 'react-icons/io5';
import { MdFavoriteBorder } from 'react-icons/md';
import Swal from 'sweetalert2';
//import SportCard from './SportCard';
import useAuth from '../hooks/useAuth';
import Bookmark from '../Components/Bookmark';
import ShareDropdown from '../Components/Home/ShareDropdown';
import Favorite from '../Components/Favorite';
import Lottie from 'lottie-react';
import loadingAnimation from "../loadingAnimation.json"
import LatestCard from './LatestCard';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Sport = () => {
  const [sportsNews, setSportsNews] = useState([]);
  const [popularSportsNews, setPopularSportsNews] = useState([]);
  const [liveSportsNews, setLiveSportsNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination states
 const [currentPage, setCurrentPage] = useState(1);
 const itemsPerPage = 6; // Show 6 news items per page

  // Fetch user authentication
  const auth = useAuth();

  useEffect(() => {
    const fetchSportsNews = async () => {
      try {
        const response = await axios.get('https://global-news-server-phi.vercel.app/news');
        const newsData = response.data;

        // Filter for sports news
        const filteredSportsNews = newsData.filter(news => news.category === 'Sports');
        const filteredPopularSportsNews = filteredSportsNews.filter(news => news.popular_news === true);
        const filteredLiveSportsNews = filteredSportsNews.find(news => news.isLive);

        setSportsNews(filteredSportsNews);
        setPopularSportsNews(filteredPopularSportsNews);
        setLiveSportsNews(filteredLiveSportsNews || null);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch news');
        setLoading(false);
      }
    };

    fetchSportsNews();
  }, []);



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

   // Pagination logic
   const totalItems = sportsNews.length;
   const totalPages = Math.ceil(totalItems / itemsPerPage);
   const startIndex = (currentPage - 1) * itemsPerPage;
   const currentNews = sportsNews.slice(startIndex, startIndex + itemsPerPage);
 
   const handlePageChange = (pageNumber) => {
     setCurrentPage(pageNumber);
   };


  return (
    <div className="container mx-auto min-h-screen py-20">
      <div className='lg:w-1/2 mx-auto my-3 lg:my-4 text-center text-gray-100 px-3'>
        <h2
        data-aos="zoom-in"
        data-aos-duration="1000"
        data-aos-delay="100"
        className="font-bold text-2xl lg:text-4xl">Sports</h2>
        <p 
        data-aos="zoom-in"
        data-aos-duration="1000"
        data-aos-delay="150"
        className='mt-3'>Sports bring people together...</p>
      </div>

            {/* Live Sports News */}
            {liveSportsNews && (
        <div 
        data-aos="zoom-in"
         data-aos-duration="1000"
         data-aos-delay="200"
        className="flex flex-col md:flex-row border text-white border-gray-300 rounded-lg shadow-lg overflow-hidden glass my-10">
          <div className="md:w-1/2 w-full">
            <img
              src={liveSportsNews.image}
              alt={liveSportsNews.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">{liveSportsNews.title}</h3>
              <hr className='my-4' />
              <p className="text-gray-300 mb-4">{liveSportsNews.description.slice(0, 1000)}...</p>
            </div>
            <div>
              <p className="text-gray-100 text-sm mb-2">{new Date(liveSportsNews.timestamp).toLocaleString()}</p>
              {liveSportsNews.isLive && (
                <span className="px-4 py-1 bg-red-600 text-white text-xs font-semibold uppercase rounded-full">
                  Live
                </span>
              )}
              <div className="flex justify-between items-center text-xl md:text-2xl my-3 text-slate-100">
              <Favorite newsId={liveSportsNews._id} />
                <Bookmark newsId={liveSportsNews._id} />
                <ShareDropdown url={`https://global-news-server-phi.vercel.app/news/${liveSportsNews._id}`} />
                
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Sports News */}
      <div className='flex flex-col lg:flex-row gap-5 px-4'>
        <div className="lg:w-9/12 w-full bg-neutral-950 glass p-5 rounded-xl">
          <h2 
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="300"
          className="text-2xl font-extrabold mb-4 text-slate-50">Sports News</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
            {currentNews.map((news) => (
              <LatestCard key={news._id} news={news} />
            ))}
          </div>
        </div>

        {/* Latest Sports News */}
        <div className="lg:w-3/12 w-full bg-neutral-950 glass p-5 rounded-xl">
          <h2 
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="300"
          className="text-2xl font-extrabold mb-4 text-slate-50">Popular News</h2>
          <div className='flex flex-col gap-5'>
            {popularSportsNews.slice(0,3).map((news) => (
              <LatestCard key={news._id} news={news} />
            ))}
          </div>
        </div>
      </div>
       {/* Pagination Section */}
       <div className="mt-6 flex justify-center items-center text-white">
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
          className="px-4 py-2 mx-1 rounded-lg bg-colorPrimary glass text-white"
        >
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

export default Sport;
