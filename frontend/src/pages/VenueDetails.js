import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/section/Header'
import Navbar from '../components/section/Navbar'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/spinner/Spinner';
import Footer from '../components/section/Footer';
import { AppContext } from '../context/AppContext';
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { RiHotelFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdShare } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdVerified } from "react-icons/md";
import { IoStar } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import VenueReviews from '../components/common/VenueReviews';

const VenueDetails = () => {
    const { contactHandler, setImageViewActive } = useContext(AppContext);
    const [venueData, setVenueData] = useState(null);
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    const fetchVenuesWithCategory = async (name) => {
        try {
          setLoading(true);
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/venue/${name}`);
          if (response.data.success) {
              setVenueData(response.data.data);
          }
          else{
            setVenueData(null);
          }
        } catch (err) {
            console.log('Failed to fetch venues.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(location.pathname){
            fetchVenuesWithCategory(location.pathname.split('/').at(-1));
        }
    },[location.pathname]);

    const scrollToDiv = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };
    
    useEffect(() => {
        document.title = "Venue"
        scrollToDiv("venueinfo");
    }, []);

    console.log(venueData);

  return (
    <div id='venueinfo' className='w-full flex flex-col'>
        <Header/>
        <Navbar/>

        {
            loading ? 
            (
                <div className='w-full h-[500px] flex justify-center items-center'>
                    <Spinner/>
                </div>
            ) 
            : 
            (
                venueData ? 
                (
                    <div className='w-full flex flex-col bg-[#ececec] p-6 gap-6 max-sm:p-2'>
                        <div className='w-full flex flex-col shadow-sm bg-white p-6 max-sm:p-2 gap-6 max-sm:gap-4'>
                            <div className='w-full flex justify-start items-center gap-6 max-sm:flex-col max-sm:gap-4'>
                                <div className='w-[800px] max-sm:w-full'>
                                    <img src={`${process.env.REACT_APP_BASE_URL}/venue${venueData.img}`} alt='banner' className='w-full h-[300px] max-sm:h-[200px] object-cover rounded'/>
                                </div>
                                <div className='w-full flex flex-col gap-4 max-sm:gap-2'>
                                    <span className='text-xl font-semibold text-black'>{venueData.name}</span>
                                    <div className='w-full flex justify-between items-center'>
                                        <p className='text-base text-gray-400'>{venueData.type}</p>
                                        <div className='flex items-center justify-start gap-1'>
                                            <span className='text-sm text-gray-400'>{venueData.avg_ratings}</span>
                                            <div className='flex justify-start items-center'>
                                                {Array.from({ length: Math.floor(venueData.avg_ratings) }, (_, index) => (
                                                    <FaStar
                                                        key={index}
                                                        className='text-base text-[#ffc107]'
                                                    />
                                                ))}
                                                {
                                                    venueData.avg_ratings.split('.').at(1) != 0 && ( <FaStarHalfAlt className='text-base text-[#ffc107]'/>)
                                                }
                                            </div>                        
                                        </div>
                                    </div>
                                    <div className='w-full flex justify-between items-center'>
                                        <p className='text-base font-bold text-black'>{venueData.price_range}</p>
                                        <span className='text-sm text-gray-400'>{`(${venueData.total_reviews}) ratings & reviews`}</span>
                                    </div>
                                    <div className='w-full flex justify-start items-center gap-4'>
                                        <div className='p-1 flex justify-center items-center gap-1 text-sm bg-gray-200'>
                                            <FaImage/>
                                            <span>{venueData.albums.length}+</span>
                                            <span>images</span>
                                        </div>
                                        <div className='p-1 flex justify-center items-center gap-1 text-sm bg-gray-200'>
                                            <RiHotelFill/>
                                            <span>{venueData.rooms}</span>
                                            <span>Rooms</span>
                                        </div>
                                    </div>
                                    <p className='text-sm text-gray-500 flex justify-start items-center gap-1'><FaLocationDot/>{venueData.location}</p>
                                    <p className='text-base cursor-pointer text-gray-500 flex justify-start items-center gap-1'><IoMdShare/>Share</p>

                                    <div className='w-full flex justify-between items-center gap-2'>
                                        <button className='w-full border border-[#AB1C49] text-[#AB1C49] py-1 rounded-sm font-normal transition duration-300 ease-in hover:bg-[#AB1C49] hover:text-white flex justify-center items-center gap-2'>Write Review</button>
                                        <button onClick={() => contactHandler(venueData.id, venueData.email, venueData.phone)} className='w-full border border-[#AB1C49] text-[#AB1C49] py-1 rounded-sm font-normal transition duration-300 ease-in hover:bg-[#AB1C49] hover:text-white flex justify-center items-center gap-2'>Send Message</button>
                                    </div>
                                </div>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: venueData.description }}></div>
                        </div>

                        {venueData.albums.length > 0 && (
                            <div className="w-full">
                                <div className="w-full flex flex-col bg-white shadow-sm shadow-gray-400 p-4 gap-4">
                                <div className="w-full flex justify-between items-center">
                                    <h2 className="text-xl font-semibold text-black max-md:text-base">{`Albums (${venueData.albums.length})`}</h2>
                                    <Link className="text-base max-sm:text-sm text-[#AB1C49] flex items-center gap-1">
                                        View All <MdKeyboardArrowRight className="text-xl max-sm:text-base" />
                                    </Link>
                                </div>
                                <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 grid-rows-5 md:grid-rows-2 sm:grid-rows-3 gap-4">
                                    {venueData.albums &&
                                        venueData.albums.map((img, index) => (
                                        <img
                                            key={index}
                                            src={`${process.env.REACT_APP_BASE_URL}/venue${img}`}
                                            alt={`Venue image ${index + 1}`}
                                            className="w-full h-[150px] max-sm:h-[120px] object-cover cursor-pointer"
                                            onClick={() => {
                                                setImageViewActive({
                                                    isActive: true, 
                                                    index: index,
                                                    AllImages: venueData.albums, 
                                                    dirName:'venue'
                                                })
                                            }}
                                        />
                                    ))}
                                </div>
                                </div>
                            </div>
                        )}

                        {venueData.reviews && (
                            <div className="w-full flex gap-4 max-sm:gap-2 max-md:flex-col-reverse">
                                <div className="w-full flex flex-col bg-white shadow-sm shadow-gray-400 p-4 gap-4">
                                <div className="w-full flex justify-between items-center ">
                                    <h2 className="text-xl font-semibold text-black max-md:text-lg max-sm:text-base">
                                    <span>{`(${venueData.total_reviews})`} </span> Reviews & Ratings
                                    </h2>
                                    <Link className="text-base text-[#AB1C49] flex items-center gap-1 max-sm:text-sm">
                                        View All <MdKeyboardArrowRight className="text-xl max-md:text-lg max-sm:text-base" />
                                    </Link>
                                </div>
                                <div className="w-full flex flex-col">
                                    {venueData.reviews &&
                                        venueData.reviews.map((item, vId) => (
                                        <div
                                        key={vId}
                                        className="w-full flex flex-col border-y py-4 gap-2"
                                        >
                                        <div className="w-full flex justify-between">
                                            <div className="flex justify-start items-center gap-2">
                                            <div className="w-[45px] h-[45px] rounded-full border-2 border-gray-300">
                                                <img
                                                src={item.user_img}
                                                alt=""
                                                className="w-full h-full object-cover rounded-full"
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="flex items-center justify-start gap-1">
                                                <span className="text-base font-semibold max-sm:text-sm">
                                                    {item.user_name}
                                                </span>
                                                {item.user_Verified && (
                                                    <span className="text-blue-500 max-sm:text-sm">
                                                    <MdVerified />
                                                    </span>
                                                )}
                                                </div>
                                                <div className="flex items-center justify-start gap-1">
                                                <span className="text-xs text-gray-400">{`Reviewed ${item.date}`}</span>
                                                <div className="flex justify-center items-center rounded-sm gap-1 bg-green-500 px-1 text-white text-sm max-sm:text-xs">
                                                    <IoStar className="text-sm max-sm:text-xs" />
                                                    <span>{item.stars}</span>
                                                </div>
                                                </div>
                                            </div>
                                            </div>

                                            <div className="w-[40px] h-[40px] flex justify-center items-center rounded-full cursor-pointer transition duration-200 ease-in hover:bg-gray-200">
                                                <BsThreeDotsVertical className="text-xl" />
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-700 max-sm:text-xs">{item.comment}</div>
                                        <div className="w-full grid grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-4 max-sm:gap-2">
                                            {item.images &&
                                            item.images.map((img, index) => (
                                                <img
                                                key={index}
                                                src={`${process.env.REACT_APP_BASE_URL}/venue${img}`}
                                                alt={`Review image ${index + 1}`}
                                                className="w-full h-[50px] object-cover cursor-pointer"
                                                onClick={() => {
                                                    setImageViewActive({
                                                        isActive: true, 
                                                        index: index,
                                                        AllImages: item.images, 
                                                        dirName:'venue'
                                                    })
                                                }}
                                                />
                                            ))}
                                        </div>
                                        </div>
                                    ))}
                                </div>
                                </div>
                                <div className="w-[800px] max-lg:w-[600px] max-md:w-full gap-4">
                                {/* Review  */}
                                <VenueReviews data={venueData} />
                                </div>
                            </div>
                        )}

                        {venueData.FAQs && (
                            <div className="w-full flex flex-col">
                                <div className="w-full flex flex-col bg-white shadow-sm shadow-gray-400 p-4 gap-4">
                                <h2 className="text-xl text-gray-700 font-semibold max-md:text-lg max-sm:text-base">
                                    FAQ about <span className="text-black">{venueData.name}</span>
                                </h2>
                                <div className="w-full flex flex-col gap-2">
                                    {venueData.FAQs &&
                                        venueData.FAQs.map((item, index) => (
                                        <div className="w-full flex flex-col bg-gray-100 rounded p-2">
                                        <h2 className="text-lg text-gray-700 font-semibold max-md:text-base max-sm:text-sm">
                                            {item.question}
                                        </h2>
                                        <p
                                            className="text-base text-gray-600 max-md:text-sm max-sm:text-xs"
                                            dangerouslySetInnerHTML={{ __html: item.answere }}
                                        ></p>
                                        </div>
                                    ))}
                                </div>
                                </div>
                            </div>
                        )}
                    </div>
                )
                :
                (
                    <div className='w-full h-[500px] flex justify-center items-center text-xl font-semibold text-gray-400'>Not Found</div>
                )
            )
        }

        <Footer/>
    </div>
  )
}

export default VenueDetails