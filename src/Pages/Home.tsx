
import React from 'react';
import Banner from '../Components/Home/Banner';
import BreakingNews from '../Components/Home/BreakingNews';
import NewsSection from '../Components/Home/NewsSection';
import PopulerNews from '../Components/Home/PopulerNews';
import Weather from '../Components/Home/Weather';


const Home: React.FC = () => {
  return (
    <div>
      <Banner />
      <BreakingNews />
      <Weather />
      <NewsSection />
      <PopulerNews></PopulerNews>
      {/* Add more sections or components here */}
    </div>
  );
};

export default Home;
