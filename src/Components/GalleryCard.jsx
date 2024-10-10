import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const GalleryCard = ({ frame }) => {
    // console.log(frame)
    const [image, setImage] = useState([])

    const showImage = (image) => {
        setImage(image)
    }
    // console.log(image)
    return (
        <>

            <dialog id={`modal-image-${image?._id}`} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    {
                        image?.image ? <>
                            <h3 className="font-bold text-lg">{image?.title}</h3>
                            <img className='w-full md:h-[417px]' src={image?.image} alt="" />
                            <Link to={`/news/${image._id}`} className='btn btn-outline flex justify-center mt-3 text-[#02AA08]'>Read full news</Link>
                        </> : <>
                            <span className="loading loading-ring loading-lg"></span>
                        </>
                    }

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>




            <div className=' md:grid grid-cols-2 gap-3 min-h-screen mb-3'>

                <div>
                    <div className='card h-[417px]' onClick={() => { document.getElementById(`modal-image-${image._id}`).showModal(); showImage(frame[0] || []) }}>
                        <img className='w-full md:h-[417px]' src={frame[0].image} alt="" />
                        <div className='card-body absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white'>
                            <h2>{frame[0].title}</h2>
                        </div>
                    </div>

                    <div className='grid grid-cols-3 gap-3 mb-3 mt-3 h-[400px]'>
                        <div className='card col-span-2' onClick={() => { document.getElementById(`modal-image-${image._id}`).showModal(); showImage(frame[1] || []) }}>
                            <img className='h-full' src={frame[1]?.image} alt="" />
                            <div className='card-body absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white'>
                                <h2>{frame[1].title}</h2>
                            </div>
                        </div>
                        <div className='space-y-1'>

                            <div className='card h-1/2' onClick={() => { document.getElementById(`modal-image-${image._id}`).showModal(); showImage(frame[2] || []) }}>
                                <img className='h-full' src={frame[2]?.image} alt="" />
                                <div className='card-body absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white'>
                                    <h2>{frame[2].title}</h2>
                                </div>
                            </div>

                            <div className='card h-1/2' onClick={() => { document.getElementById(`modal-image-${image._id}`).showModal(); showImage(frame[3] || []) }}>
                                <img className='h-full' src={frame[3]?.image} alt="" />
                                <div className='card-body absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white'>
                                    <h2>{frame[3].title}</h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-3 gap-3 mb-3 mt-3 h-[300px]'>
                        <div className='card col-span-2' onClick={() => { document.getElementById(`modal-image-${image._id}`).showModal(); showImage(frame[4] || []) }}>
                            <img className='h-full' src={frame[4]?.image} alt="" />
                            <div className='card-body absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white'>
                                <h2>{frame[4].title}</h2>
                            </div>
                        </div>
                        <div className='space-y-1'>
                            <div className='card h-1/2' onClick={() => { document.getElementById(`modal-image-${image._id}`).showModal(); showImage(frame[5] || []) }}>
                                <img className='h-full' src={frame[5]?.image} alt="" />
                                <div className='card-body absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white'>
                                    <h2>{frame[5].title}</h2>
                                </div>
                            </div>
                            <div className='card h-1/2' onClick={() => { document.getElementById(`modal-image-${image._id}`).showModal(); showImage(frame[6] || []) }}>
                                <img className='h-full' src={frame[6]?.image} alt="" />
                                <div className='card-body absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white'>
                                    <h2>{frame[6].title}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='card h-[430px]' onClick={() => { document.getElementById(`modal-image-${image._id}`).showModal(); showImage(frame[7] || []) }}>
                        <img className='h-full w-full md:h-[430px]' src={frame[7]?.image} alt="" />
                        <div className='card-body absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white'>
                            <h2>{frame[7].title}</h2>
                        </div>
                    </div>

                </div>


                <div>
                    <div className='grid grid-cols-3 gap-3 h-[417px]'>
                        <div className='col-span-2 space-y-3 h-[417px]'>
                            <div className='card h-1/2' onClick={() => { document.getElementById(`modal-image-${image._id}`).showModal(); showImage(frame[8] || []) }}>
                                <img className='h-full' src={frame[8]?.image} alt="" />
                                <div className='card-body absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white'>
                                    <h2>{frame[8].title}</h2>
                                </div>
                            </div>
                            <div className='card h-1/2' onClick={() => { document.getElementById(`modal-image-${image._id}`).showModal(); showImage(frame[9] || []) }}>
                                <img className='h-full' src={frame[9]?.image} alt="" />
                                <div className='card-body absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white'>
                                    <h2>{frame[9].title}</h2>
                                </div>
                            </div>
                        </div>
                        <div className='space-y-1 w-full h-[417px]'>
                            <div className='h-1/3 card' onClick={() => { document.getElementById(`modal-image-${image._id}`).showModal(); showImage(frame[10] || []) }}>
                                <img className='w-full h-full' src={frame[10]?.image} alt="" />
                                <div className='card-body absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white'>
                                    <h2>{frame[10].title}</h2>
                                </div>
                            </div>
                            <div className='h-1/3 card' onClick={() => { document.getElementById(`modal-image-${image._id}`).showModal(); showImage(frame[11] || []) }}>
                                <img className='w-full h-full' src={frame[11]?.image} alt="" />
                                <div className='card-body absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white'>
                                    <h2>{frame[11].title}</h2>
                                </div>
                            </div>
                            <div className='h-1/3 card' onClick={() => { document.getElementById(`modal-image-${image._id}`).showModal(); showImage(frame[12] || []) }}>
                                <img className='w-full h-full' src={frame[12]?.image} alt="" />
                                <div className='card-body absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white'>
                                    <h2>{frame[12].title}</h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='my-3 card h-[700px]' onClick={() => { document.getElementById(`modal-image-${image._id}`).showModal(); showImage(frame[13] || []) }}>
                        <img className='w-full h-full' src={frame[13]?.image} alt="" />
                        <div className='card-body absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white'>
                            <h2>{frame[13].title}</h2>
                        </div>
                    </div>

                    <div className='grid grid-cols-3 gap-3 h-[400px]'>
                        <div className='col-span-2 space-y-3 h-[400px]'>
                            <div className='card h-1/2' onClick={() => { document.getElementById(`modal-image-${image._id}`).showModal(); showImage(frame[14] || []) }}>
                                <img className='h-full' src={frame[14]?.image} alt="" />
                                <div className='card-body absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white'>
                                    <h2>{frame[14].title}</h2>
                                </div>
                            </div>
                            <div className='card h-1/2' onClick={() => { document.getElementById(`modal-image-${image._id}`).showModal(); showImage(frame[15] || []) }}>
                                <img className='h-full' src={frame[15]?.image} alt="" />
                                <div className='card-body absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white'>
                                    <h2>{frame[15].title}</h2>
                                </div>
                            </div>
                        </div>
                        <div className='space-y-1 h-[400px]'>
                            <div className='h-1/3 card' onClick={() => { document.getElementById(`modal-image-${image._id}`).showModal(); showImage(frame[16] || []) }}>
                                <img className='w-full h-full' src={frame[16]?.image} alt="" />
                                <div className='card-body absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white'>
                                    <h2>{frame[16]?.title}</h2>
                                </div>
                            </div>
                            <div className='h-1/3 card' onClick={() => { document.getElementById(`modal-image-${image._id}`).showModal(); showImage(frame[17] || []) }}>
                                <img className='h-full' src={frame[17]?.image} alt="" />
                                <div className='card-body absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white'>
                                    <h2>{frame[17]?.title}</h2>
                                </div>
                            </div>
                            <div className='h-1/3 card' onClick={() => { document.getElementById(`modal-image-${image._id}`).showModal(); showImage(frame[18] || []) }}>
                                <img className='h-full' src={frame[18]?.image} alt="" />
                                <div className='card-body absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white'>
                                    <h2>{frame[18]?.title}</h2>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
};

export default GalleryCard;



