import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const CustomizableNews = ({ openFilter }) => {
  console.log(openFilter);

  // Use react-query to fetch news
  const { data = { news: [] } } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const { data } = await axios.get('http://localhost:3001/news');
      // Assuming the data has a "news" array
      return data;
    }
  });

  const news = data.news; // Access the news array properly

  console.log(news); // This should now log an array of news items

  // Extract unique regions, categories, and titles from the news array
  const region = [...new Set(news?.map((item) => item.region))];
  const category = [...new Set(news?.map((item) => item.category))];
  const title = [...new Set(news?.map((item) => item.title))];

  return (
    <div
      className={`${
        openFilter ? "block md:flex" : "hidden md:hidden"
      } gap-4 md:gap-8 justify-end mt-[88px] absolute right-0`}
    >
      <div className="dropdown dropdown-hover z-50">
        <select className="bg-transparent border-b-2 border-green-700 w-full max-w-xs p-2">
          <option className="disabled selected text-[#02AA08]">Region</option>
          {region?.map((reg) => (
            <option key={reg} className="text-[#02AA08]">
              {reg}
            </option>
          ))}
        </select>
      </div>
      <div className="dropdown dropdown-hover z-50">
        <select className="bg-transparent border-b-2 border-green-700 w-full max-w-xs p-2">
          <option className="disabled selected text-[#02AA08]">Category</option>
          {category?.map((cat) => (
            <option key={cat} className="text-[#02AA08]">
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="dropdown dropdown-hover z-50">
        <select className="bg-transparent border-b-2 border-green-700 w-full max-w-xs p-2">
          <option className="disabled selected text-[#02AA08]">Topic</option>
          {title?.map((tit) => (
            <option key={tit} className="text-[#02AA08]">
              {tit}
            </option>
          ))}
        </select>
      </div>

      <div className="z-50">
        <button className="btn btn-outline hover:text-green-600">search</button>
      </div>
      <div className="z-50">
        <button className="btn btn-outline hover:text-green-600">reset</button>
      </div>
    </div>
  );
};

export default CustomizableNews;
