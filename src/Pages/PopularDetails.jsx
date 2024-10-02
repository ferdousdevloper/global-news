import React from 'react';
import { useLoaderData } from 'react-router-dom';

const PopularDetails = () => {
    const popularData = useLoaderData()
    console.log(popularData)
    const { title, image, description, category, author, authorName, region, timestamp } = popularData;

    return (
        <div className='mt-28 md:grid grid-cols-9'>

            <div className='col-span-6'>
                <h2 className='text-2xl font-bold py-6 text-white'>{title}</h2>
                <img src={image} alt="" />
                <div className='flex gap-3 text-center text-gray-400 italic'>
                    <h2>Author:{authorName}</h2>
                    <h2>Category:{category}</h2>
                    <h2>Date:{new Date(timestamp).toLocaleDateString()}</h2>
                    <h2>Post on:{new Date(timestamp).toLocaleTimeString()}</h2>
                </div>

                <hr className='border-[#02AA08] pb-5' />
                <p className='text-[#d8cece]'>{description}</p>
            </div>

            <div className='col-span-3'>
                sideber
            </div>

        </div>
    );
};

export default PopularDetails;