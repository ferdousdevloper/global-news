import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center text-white">
      
      {/* Error Icon */}
      <div className="text-[#02AA08] text-9xl font-extrabold">404</div>

      {/* Error Message */}
      <h1 className="text-4xl font-bold mt-4">Oops! Page not found.</h1>
      <p className="text-gray-400 mt-2 text-center">
        The page you’re looking for might have been removed or is temporarily unavailable.
      </p>

      {/* Return Home Button */}
      <Link
        to="/"
        className="mt-6 px-8 py-3 bg-[#02AA08] text-white rounded-full hover:bg-green-500 transition flex items-center space-x-2 z-10"
      >
        <FaHome />
        <span>Back to Homepage</span>
      </Link>

      {/* Background Shapes */}
      <div className="absolute inset-0 z-0">
        <div className="bg-rectangle"></div>
        <div className="bg-ellipse"></div>
        <div className="bg-polygon"></div>
        <div className="bg-circle-small"></div>
        <div className="bg-circle-large"></div>
        <div className="bg-triangle"></div>
        <div className="bg-diamond"></div>
        <div className="bg-parallelogram"></div>
        <div className="bg-oval"></div>
      </div>
    </div>
  );
};

export default ErrorPage;
