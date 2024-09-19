
import React from 'react';
import Banner from '../Components/Home/Banner';
import BreakingNews from '../Components/Home/BreakingNews';
import NewsSection from '../Components/Home/NewsSection';


const Home: React.FC = () => {
  return (
    <div>
      <Banner/>
      <BreakingNews/>
      <NewsSection/>
      {/* Add more sections or components here */}
    </div>
  );
};

export default Home;
