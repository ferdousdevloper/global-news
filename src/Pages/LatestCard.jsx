import { CiBookmark } from "react-icons/ci";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";
import Favorite from "../Components/Favorite";
import Bookmark from "../Components/Bookmark";
import ShareDropdown from "../Components/Home/ShareDropdown";

const LatestCard = ({ news }) => {
    const {
        _id,
        title,
        image,
        category,
        region,
        description,
        timestamp,
    } = news;

    return (
        <div
            key={_id}
            className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 glass text-gray-300"
        >
            <Link to={`/news/${_id}`}>
                <img
                    src={image}
                    alt={title}
                    className="w-full h-48 object-cover rounded-md"
                />
                <div className="flex justify-between items-center my-3">
                    <p className="text-sm text-gray-500 badge">{category}</p>
                    <p className="text-sm">
                        {new Date(timestamp).toLocaleString()}
                    </p>
                </div>
                <h2 className="text-xl font-semibold mt-2 hover:underline line-clamp-2 min-h-14">
                    {title}
                </h2>
            </Link>
            <hr className="my-4" />

            {/* Description with See More functionality */}
            <p className="text-gray-300 mt-1 line-clamp-4 min-h-24">
                {description.length > 150 ? (
                    <>
                        {description.slice(0, 150)}...
                        <Link
                            to={`/news/${_id}`}
                            className="text-blue-500 hover:text-blue-300"
                        >
                            {" "}
                            See More
                        </Link>
                    </>
                ) : (
                    description
                )}
            </p>

            <p className="mt-1 text-gray-100">Region: {region}</p>

            <div className="flex justify-around items-center text-xl md:text-2xl my-3 text-slate-100">
                <Favorite newsId={_id} />
                <Bookmark newsId={_id} />
                <ShareDropdown url={`https://global-news-server-phi.vercel.app/news/${_id}`} />
            </div>
        </div>
    );
};

export default LatestCard;
