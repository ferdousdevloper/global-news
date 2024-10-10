import { CiBookmark } from "react-icons/ci";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";

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
        <Link to={`/news/${_id}`} key={_id}>
            <div className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 glass text-gray-300">
                <img src={image} alt={title} className="w-full h-48 object-cover rounded-md" />
                <div className="flex justify-between items-center my-3">
                    <p className="text-sm text-gray-500 badge">{category}</p>
                    <p className="text-sm ">{new Date(timestamp).toLocaleString()}</p>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mt-2 line-clamp-2 min-h-14">{title}</h2>
                    <hr className="my-4" />
                    <p className="mt-1 line-clamp-4 min-h-24">{description}</p>
                    <p className=" mt-1 text-gray-100">Region: {region}</p>
                </div>
                <div className="flex justify-around items-center text-xl md:text-2xl my-3 text-slate-100">
                    <MdFavoriteBorder />
                    <CiBookmark />
                    <IoShareSocialOutline />
                </div>
            </div>
        </Link>
    );
};

export default LatestCard;
