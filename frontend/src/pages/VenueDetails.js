import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/section/Header'
import Navbar from '../components/section/Navbar'
import { useLocation } from 'react-router-dom';
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


const VenueDetails = () => {
    const { contactHandler } = useContext(AppContext);
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

  return (
    <div className='w-full flex flex-col'>
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
                    <div className='w-full flex flex-col bg-[#ececec] p-6 max-sm:p-2 shadow'>
                        <div className='w-full flex flex-col bg-white p-6 max-sm:p-2 gap-6 max-sm:gap-4'>
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