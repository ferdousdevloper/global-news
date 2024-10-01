import { Link } from "react-router-dom";

const SportCard = ({ news }) => {
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
                <h2 className="text-xl font-semibold mt-2 h-14">{title.slice(0, 70)}...</h2>
                <hr className="my-4" />
                <p className=" mt-1">{description.slice(0, 70)}...</p>
                <p className=" mt-1">Region: {region}</p>
            </div>
        </Link>
    );
};

export default SportCard;
