import axios from 'axios';
import { useEffect, useState } from 'react';
import { CiBookmark } from 'react-icons/ci';
import { IoShareSocialOutline } from 'react-icons/io5';
import { MdFavoriteBorder } from 'react-icons/md';
import Swal from 'sweetalert2';
import SportCard from './SportCard';
import useAuth from '../hooks/useAuth';

const Sport = () => {
  const [sportsNews, setSportsNews] = useState([]);
  const [popularSportsNews, setPopularSportsNews] = useState([]);
  const [liveSportsNews, setLiveSportsNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false); // Track bookmark status

  // Fetch user authentication
  const auth = useAuth();
  const { user } = auth || {};

  useEffect(() => {
    const fetchSportsNews = async () => {
      try {
        const response = await axios.get('http://localhost:3001/news');
        const newsData = response.data;

        // Filter for sports news
        const filteredSportsNews = newsData.filter(news => news.category === 'Sports');
        const filteredPopularSportsNews = filteredSportsNews.filter(news => news.popular_news === true);
        const filteredLiveSportsNews = filteredSportsNews.find(news => news.isLive);

        setSportsNews(filteredSportsNews);
        setPopularSportsNews(filteredPopularSportsNews);
        setLiveSportsNews(filteredLiveSportsNews || null);
        setLoading(false);

        // Check if the live news is bookmarked
        const storedBookmarks = localStorage.getItem("bookmarkedNews");
        if (storedBookmarks) {
          const bookmarkedIds = JSON.parse(storedBookmarks);
          setIsBookmarked(bookmarkedIds.includes(filteredLiveSportsNews._id));
        }
      } catch (err) {
        setError('Failed to fetch news');
        setLoading(false);
      }
    };

    fetchSportsNews();
  }, []);

  // Bookmark or remove bookmark function
  const handleBookmark = async () => {
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Not Authenticated',
        text: 'Please login to bookmark news.',
        confirmButtonText: 'OK',
      });
      return;
    }

    const url = isBookmarked ? 'http://localhost:3001/remove-bookmark' : 'http://localhost:3001/bookmark';
    const method = isBookmarked ? 'DELETE' : 'POST';

    try {
      await axios({
        method: method,
        url: url,
        data: { email: user.email, newsId: liveSportsNews._id },
      });

      // Toggle bookmark status
      setIsBookmarked(!isBookmarked);
      const updatedBookmarks = JSON.parse(localStorage.getItem("bookmarkedNews") || "[]");
      if (isBookmarked) {
        const newBookmarks = updatedBookmarks.filter(id => id !== liveSportsNews._id);
        localStorage.setItem("bookmarkedNews", JSON.stringify(newBookmarks));
      } else {
        updatedBookmarks.push(liveSportsNews._id);
        localStorage.setItem("bookmarkedNews", JSON.stringify(updatedBookmarks));
      }

      Swal.fire({
        icon: 'success',
        title: isBookmarked ? 'Removed from bookmarks!' : 'Bookmarked!',
        text: isBookmarked ? 'This news item has been removed from your bookmarks.' : 'This news item has been added to your bookmarks.',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto min-h-screen py-20">
      <div className='lg:w-1/2 mx-auto my-3 lg:my-4 text-center text-gray-100'>
        <h2 className="font-bold text-2xl lg:text-4xl">Sports</h2>
        <p className='mt-3'>Sports bring people together...</p>
      </div>

      {/* Live Sports News */}
      {liveSportsNews && (
        <div className="flex flex-col md:flex-row border text-white border-gray-300 rounded-lg shadow-lg overflow-hidden glass my-10">
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
                <MdFavoriteBorder />
                <CiBookmark 
                  onClick={handleBookmark} 
                  className={`cursor-pointer ${isBookmarked ? 'text-green-500' : 'text-white'}`}
                />
                <IoShareSocialOutline />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Sports News */}
      <div className='flex flex-col lg:flex-row gap-5 px-4'>
        <div className="lg:w-9/12 w-full bg-neutral-950 glass p-5 rounded-xl">
          <h2 className="text-2xl font-extrabold mb-4 text-slate-50">Sports News</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
            {sportsNews.map((news) => (
              <SportCard key={news._id} news={news} />
            ))}
          </div>

          <button className="mt-6 bg-[#02AA08] text-white px-4 py-2 rounded hover:bg-[#028A06] glass">
            See More
          </button>
        </div>

        {/* Latest Sports News */}
        <div className="lg:w-3/12 w-full bg-neutral-950 glass p-5 rounded-xl">
          <h2 className="text-2xl font-extrabold mb-4 text-slate-50">Popular News</h2>
          <div className='flex flex-col gap-5'>
            {popularSportsNews.map((news) => (
              <SportCard key={news._id} news={news} />
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

export default Sport;
