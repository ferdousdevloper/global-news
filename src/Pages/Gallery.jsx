import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const Gallery = () => {

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Show 6 news items per page

  const { data: images = [] } = useQuery({
    queryKey: ['image'],
    queryFn: async () => {
      const { data } = await axios.get('http://localhost:3001/news');
      return data;
    }
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
    setTimeout(() => setAnimateIn(true), 50); // Delay to start slide-in animation
  };

  const closeModal = () => {
    setAnimateIn(false);
    setTimeout(() => {
      setShowModal(false);
      setSelectedImage(null);
    }, 300); // Delay to finish the animation before closing
  };

   // Pagination logic
   const totalItems = images.length;
   const totalPages = Math.ceil(totalItems / itemsPerPage);
   const startIndex = (currentPage - 1) * itemsPerPage;
   const allImage = images.slice(startIndex, startIndex + itemsPerPage);
 
   const handlePageChange = (pageNumber) => {
     setCurrentPage(pageNumber);
   };

  return (
    <div className="md:container md:mx-auto py-10 mb-20">
      <h2 className="h-full mt-20 text-center text-3xl font-semibold text-white py-6">
        Our News Gallery
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {allImage.map((image, index) => (
          <div
            key={index}
            className="relative cursor-pointer overflow-hidden"
            onClick={() => handleImageClick(image)}
          >
            <img
              src={image.image}
              alt={image.title}
              className="w-full h-auto transition-transform duration-300 transform hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
              <h3 className="text-white text-lg">{image.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex p-6 md:p-20 justify-center z-50 bg-black bg-opacity-90 transition-opacity duration-300">
          <div
            className={`relative rounded-lg shadow-lg  w-full transition-transform duration-500 transform ${
              animateIn ? "translate-y-0 scale-100" : "translate-y-full scale-90"
            }`}
          >
            <FaTimes
              className="absolute top-3 right-3 text-2xl text-colorPrimary cursor-pointer"
              onClick={closeModal}
            />
            {selectedImage && (
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-auto rounded-lg max-h-[80vh] object-contain"
              />
            )}
            <h2 className=" text-gray-100  mt-4 text-center text-xl font-semibold">{selectedImage?.title}</h2>
          </div>
        </div>
      )}
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

export default Gallery;
