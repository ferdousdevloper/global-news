import React from 'react';

const GalleryCard = () => {
    return (
        <>
            <h2 className='h-full mt-20 text-center text-3xl font-semibold text-white py-6'>Our Gallery</h2>
            <div className=' flex justify-between gap-3'>

                <div>
                    <img className='w-full' src="https://i.ibb.co/j3ktw5Z/breaking-news-screen-banner-template-260nw-2181698391.webp" alt="" />

                    <div className='grid grid-cols-3 gap-3 mb-3 mt-3'>
                        <img className='col-span-2' src="https://i.ibb.co/qjmxGtm/istockphoto-1183338499-612x612.jpg" alt="" />
                        <div className='space-y-1'>
                            <div className=''>
                                <img src="https://www.newsbangla24.com/assets/news_images/2024/09/25/Lieutenant_Tanjim_image.jpg" alt="" />
                            </div>
                            <div>
                                <img src="https://i.ibb.co/qjmxGtm/istockphoto-1183338499-612x612.jpg" alt="" />
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-3 gap-3 mb-3 mt-3'>
                        <img className='col-span-2' src="https://www.newsbangla24.com/assets/news_images/2024/09/25/Lieutenant_Tanjim_image.jpg" alt="" />
                        <div className='space-y-1'>
                            <div>
                                <img src="https://i.ibb.co/qjmxGtm/istockphoto-1183338499-612x612.jpg" alt="" />
                            </div>
                            <div>
                                <img src="https://www.newsbangla24.com/assets/news_images/2024/09/25/Lieutenant_Tanjim_image.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                    <img className='w-full' src="https://www.newsbangla24.com/assets/news_images/2024/09/25/Lieutenant_Tanjim_image.jpg" alt="" />

                </div>


                <div>
                    <div className='grid grid-cols-3 gap-3'>
                        {/* <img src="https://i.ibb.co/qjmxGtm/istockphoto-1183338499-612x612.jpg" alt="" /> */}
                        <div className='col-span-2 space-y-3 h-full'>
                            <div>
                                <img src="https://www.newsbangla24.com/assets/news_images/2024/09/25/Lieutenant_Tanjim_image.jpg" alt="" />
                            </div>
                            <div>
                                <img src="https://i.ibb.co/qjmxGtm/istockphoto-1183338499-612x612.jpg" alt="" />
                            </div>
                        </div>
                        <div className='space-y-1 w-full h-full'>
                            <div className='h-1/3'>
                                <img className='w-full h-full' src="https://www.newsbangla24.com/assets/news_images/2024/09/25/Lieutenant_Tanjim_image.jpg" alt="" />
                            </div>
                            <div className='h-1/3'>
                                <img className='w-full h-full' src="https://i.ibb.co/qjmxGtm/istockphoto-1183338499-612x612.jpg" alt="" />
                            </div>
                            <div className='h-1/3'>
                                <img className='w-full h-full' src="https://i.ibb.co/qjmxGtm/istockphoto-1183338499-612x612.jpg" alt="" />
                            </div>
                        </div>
                    </div>

                    <div className='my-3'>
                        <img className='w-full' src="https://i.ibb.co/j3ktw5Z/breaking-news-screen-banner-template-260nw-2181698391.webp" alt="" />
                    </div>

                    <div className='grid grid-cols-3 gap-3'>
                        <div className='col-span-2 space-y-3 h-full'>
                            <div>
                                <img src="https://www.newsbangla24.com/assets/news_images/2024/09/25/Lieutenant_Tanjim_image.jpg" alt="" />
                            </div>
                            <div>
                                <img src="https://i.ibb.co/j3ktw5Z/breaking-news-screen-banner-template-260nw-2181698391.webp" alt="" />
                            </div>
                        </div>
                        <div className='space-y-1'>
                            <div className='h-1/3'>
                                <img className='w-full h-full' src="https://www.newsbangla24.com/assets/news_images/2024/09/25/Lieutenant_Tanjim_image.jpg" alt="" />
                            </div>
                            <div className='h-1/3'>
                                <img className='h-full' src="https://i.ibb.co/qjmxGtm/istockphoto-1183338499-612x612.jpg" alt="" />
                            </div>
                            <div className='h-1/3'>
                                <img className='h-full' src="https://i.ibb.co/qjmxGtm/istockphoto-1183338499-612x612.jpg" alt="" />
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
};

export default GalleryCard;