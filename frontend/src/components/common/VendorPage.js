import React, { useState } from 'react'
import MContactUs2 from './MContactUs2';
import { MdVerified } from "react-icons/md";
import { IoStar } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { HiPhoto } from "react-icons/hi2";
import { BsShare } from "react-icons/bs";
import { LiaPenNibSolid } from "react-icons/lia";
import { SlHeart } from "react-icons/sl";
import { MdKeyboardArrowRight } from "react-icons/md";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";


const VendorPage = ({data}) => {
    // will remove this line of code
    console.log(data);


    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Map images to lightbox-compatible format
    const slides = data.albums.map(img => ({
        src: `${process.env.REACT_APP_BASE_URL}/vendor${img}`
    }));


  return (
    <div className='w-full flex flex-col bg-[#ececec]'>
        <div className='w-full flex justify-start items-start gap-8 p-8'>
            <div className='w-full flex flex-col gap-4'>
                <div className='w-full h-[500px] flex flex-col relative'>
                    <div className='w-full h-[400px] shadow-lg'>
                        <img
                            src={`${process.env.REACT_APP_BASE_URL}${data.img}`}
                            alt='vendor-img'
                            className='w-full h-full object-cover rounded-lg'
                        />
                    </div>

                    <div className='w-full absolute bottom-[0px] left-0 px-8'>
                        <div className='w-full flex flex-col bg-white shadow-sm shadow-gray-500'>
                            <div className='w-full flex justify-between p-4'>
                                <div className='flex flex-col gap-2'>
                                    <h2 className='flex justify-start items-center gap-2'><span className='text-2xl text-black font-semibold'>{data.name}</span> <MdVerified className='text-blue-500 text-xl'/></h2>

                                    <Link className='flex gap-2 items-center'>
                                        <FaPhone className='text-teal-600'/>
                                        <span className='text-base font-semibold text-teal-600'>Contact</span>
                                    </Link>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <div className='flex justify-center items-center rounded-sm gap-2 bg-green-500 p-2 text-white'><IoStar/><span>{data.avg_ratings}</span></div>
                                    <div className='flex justify-start items-center gap-2'><span>{data.reviews.length}</span>reviews</div>
                                </div>
                            </div>
                            <div className='w-full flex justify-between items-center bg-[#ececec]'>
                                <button className='w-full py-2 flex justify-center items-center text-gray-500 text-base gap-1'>
                                    <HiPhoto className='text-lg'/>
                                    <span>{data.albums.length}</span>
                                    <span>Photos</span>
                                </button>
                                <div className='w-[4px] h-[30px] bg-gray-300'></div>
                                <button className='w-full py-2 flex justify-center items-center text-gray-500 text-base gap-1'>
                                    <SlHeart className='text-lg'/>
                                    <span>{data.albums.length}</span> {/* need to change */}
                                    <span>Shortlist</span>
                                </button>
                                <div className='w-[4px] h-[30px] bg-gray-300'></div>
                                <button className='w-full py-2 flex justify-center items-center text-gray-500 text-base gap-1'>
                                    <LiaPenNibSolid className='text-lg'/>
                                    <span>Write a Review</span>
                                </button>
                                <div className='w-[4px] h-[30px] bg-gray-300'></div>
                                <button className='w-full py-2 flex justify-center items-center text-gray-500 text-base gap-1'>
                                    <BsShare className='text-lg'/>
                                    <span>Share</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-full flex flex-col bg-white shadow-sm shadow-gray-400 p-4 gap-4'>
                    <div className='w-full flex justify-between items-center'>
                        <h2 className='text-xl font-semibold text-black'>{`Albums (${data.albums.length})`}</h2>
                        <Link className='text-base text-[#AB1C49] flex items-center gap-1'>View All <MdKeyboardArrowRight className='text-xl'/></Link>
                    </div>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        { data.albums && data.albums.map((img, index) => (
                            <img
                                key={index}
                                src={`${process.env.REACT_APP_BASE_URL}/vendor${img}`}
                                alt={`Wedding image ${index + 1}`}
                                className="w-full h-[150px] object-cover cursor-pointer"
                                onClick={() => {
                                    setCurrentIndex(index);
                                    setIsOpen(true);
                                }}
                            />
                        ))}
                    </div>

                    {isOpen && (
                        <Lightbox
                            open={isOpen}
                            close={() => setIsOpen(false)}
                            slides={slides}
                            index={currentIndex}
                            onIndexChange={setCurrentIndex}
                        />
                    )}
                </div>
            </div>

            <div className='w-[800px]'>
                <div className='bg-white p-2'><MContactUs2/></div>
            </div>
        </div>
        {/* FAQs  */}
        <div className='w-full flex flex-col px-8 py-8'>
            <div className='w-full flex flex-col bg-white shadow-sm shadow-gray-400 p-4 gap-4'>
                <h2 className='text-xl text-gray-700 font-semibold'>FAQ about <span className='text-black'>{data.name}</span></h2>
                <div className='w-full flex flex-col gap-2'>
                    {data.FAQs && data.FAQs.map((item, index) => (
                        <div className='w-full flex flex-col bg-gray-100 rounded p-2'>
                            <h2 className='text-lg text-gray-700 font-semibold'>{item.question}</h2>
                            <p
                                className='text-base text-gray-600'
                                dangerouslySetInnerHTML={{ __html: item.answere }}
                            ></p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default VendorPage