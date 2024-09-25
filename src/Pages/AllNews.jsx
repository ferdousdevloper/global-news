import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const AllNews = () => {
  const { data: news = [], loading } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const result = await axios.get("http://localhost:3001/news");
      return result.data;
    },
  });
  if (loading) {
    return (
      <div className="w-16 h-16 mx-auto my-4 md:my-10 lg:my-20 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl text-black font-bold mt-20 mb-4 text-center">
        All News
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 bg-slate-900 p-5 rounded-xl">
        {news.map((item) => (
          <Link to={`/news/${item._id}`} key={item._id}>
            <div className="border p-4 rounded-lg shadow-lg h-full">
              <img
                src={item.image}
                alt={item.title}
                className="w-full object-cover mb-4 rounded-md h-40"
              />
              <h2 className="text-xl font-bold mb-2 text-slate-50">
                {item.title}
              </h2>
              <p className="text-sm mb-2 text-slate-100">
                {new Date(item.date_time).toLocaleDateString()}
              </p>
              <p className="text-sm mb-2 font-bold text-slate-100">
                Category : {item.category}
              </p>
              <p className="text-slate-100">
                {item.description.slice(0, 100)}...
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center">
        <button className="mt-6 bg-[#02AA08] max-w-96 text-white  px-4 py-2 rounded hover:bg-[#028A06]">
          See More
        </button>
      </div>
    </div>
  );
};

export default AllNews;
