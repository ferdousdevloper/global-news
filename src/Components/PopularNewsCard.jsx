import React from 'react';
import { Link } from 'react-router-dom';

const PopularNewsCard = ({ news }) => {
    console.log(news)
    const { _id, image, category, title } = news
    return (

        <Link to={`/category/${_id}`} className="card card-compact  w-52 h-64 shadow-xl glass">
            <figure className='h-52'>
                <img
                    className='w-full h-52'
                    src={image}
                    alt="popular news" />

            </figure>
            <div className="card-body">
                <h2 className="card-title">{category}</h2>
                <p>{title}</p>
            </div>
        </Link>

    );
};

export default PopularNewsCard;