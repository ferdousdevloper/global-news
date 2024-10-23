import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import Lottie from 'lottie-react';
import loadingAnimation from "../../../loadingAnimation.json"
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

interface Bookmark {
  _id: string;
  title: string;
  image: string;
  category: string;
  description: string;
  timestamp: string;
  authorName: string;
  author: string;
}

const ManageBookmarks: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const auth = useAuth();
  const { user, loading } = auth || {};

   // Pagination state
 const [currentPage, setCurrentPage] = useState<number>(1);
 const [itemsPerPage] = useState<number>(6); // Show 6 items per page

  useEffect(() => {
    const fetchUserBookmarks = async () => {
      if (user) {
        try {
          const bookmarksResponse = await axios.get(`https://global-news-server-phi.vercel.app/bookmarks/${user.email}`);
          const bookmarks = bookmarksResponse.data;

          const articlePromises = bookmarks.map((newsId: string) =>
            axios.get(`https://global-news-server-phi.vercel.app/news/${newsId}`)
          );

          const articlesResponses = await Promise.all(articlePromises);
          const articles: Bookmark[] = articlesResponses.map((res) => res.data);

          setBookmarks(articles);
        } catch (error) {
          console.error('Error fetching favorite articles:', error);
        }
      }
    };

    if (!loading && user) {
      fetchUserBookmarks();
    }
  }, [user, loading]);

  const handleRemoveBookmark = async (newsId: string) => {
    if (user) {
      try {
        await axios.delete('https://global-news-server-phi.vercel.app/bookmarks', {
          data: { email: user.email, newsId },
        });
        setBookmarks((prevArticles) => prevArticles.filter(article => article._id !== newsId));
      } catch (error) {
        console.error('Error removing favorite article:', error);
      }
    }
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

  if (!user) {
    return <p>Please log in to view your favorite articles.</p>;
  }


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNews = bookmarks.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(bookmarks.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="bg-neutral-950 p-6 glass rounded-lg">
      <div className="md:container mx-auto">
        <h1 
        data-aos="zoom-in"
        data-aos-duration="1000"
        data-aos-delay="100"
        className="text-3xl font-bold mb-6 text-center text-slate-50">My Bookmarks</h1>
        <hr 
        data-aos="zoom-in"
        data-aos-duration="1000"
        data-aos-delay="150"
        className='my-5' />
        {bookmarks.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {currentNews.map((article) => (
              <li
              data-aos="zoom-in"
      data-aos-duration="1000"
      data-aos-delay="300"
                key={article._id}
                className="border p-4 rounded-lg shadow-lg bg-neutral-800 glass flex flex-col h-full"
              >
                <img src={article.image} alt={article.title} className="w-full h-48 object-cover mb-4 rounded-md" />
                <h2 className="text-xl font-semibold text-slate-50">{article.title}</h2>
                <p className="text-gray-300 mb-2">{article.category}</p>
                <p className="text-gray-300 mb-4 flex-grow">
                  {article.description.length > 80 ? (
                    <>
                      {article.description.slice(0, 80)}...
                      <Link to={`/news/${article._id}`} className="text-green-500 hover:text-green-300 ml-2"> See More</Link>
                    </>
                  ) : (
                    article.description
                  )}
                </p>
                <div className='flex justify-between items-center'>
                  <div>
                  <p className="text-gray-400">By {article.authorName}</p>
                  <p className="text-gray-400"> {article.author}</p>
                  <p className="text-gray-400">{new Date(article.timestamp).toLocaleDateString()}</p>
                  </div>
                  {/* Delete Icon */}
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveBookmark(article._id)}
                >
                  <MdDelete  size={24} />
                </button>
                </div>
                
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">No favorite articles yet.</p>
        )}
      </div>
      {/* Pagination Section */}
      <div className="mt-6 flex justify-center items-center text-white">
        <button
          className="px-4 py-2 mx-1 bg-colorPrimary glass rounded-lg"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FaArrowLeft />
        </button>

        {currentPage > 1 && (
          <button
            className="px-4 py-2 mx-1 rounded-lg bg-gray-800 glass"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            {currentPage - 1}
          </button>
        )}

        <span
          className="px-4 py-2 mx-1 rounded-lg bg-colorPrimary glass text-white"
        >
          {currentPage}
        </span>

        {currentPage < totalPages && (
          <button
            className="px-4 py-2 mx-1 rounded-lg bg-gray-800 glass"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            {currentPage + 1}
          </button>
        )}

        <button
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

export default ManageBookmarks;
