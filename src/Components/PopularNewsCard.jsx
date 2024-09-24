import React from 'react';
import { Link } from 'react-router-dom';

const PopularNewsCard = ({ news }) => {
    console.log(news)
    const { image, category, title } = news
    return (

        <Link className="card card-compact bg-base-100 w-52 h-64 shadow-xl">
            <figure className='h-52'>
                <img
                    className='w-full h-52'
                    src={image}
                    alt="Shoes" />

            </figure>
            <div className="card-body">
                <h2 className="card-title">{category}</h2>
                <p>{title}</p>
            </div>
        </Link>

    );
};

export default PopularNewsCard;