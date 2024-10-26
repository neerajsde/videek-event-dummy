import React from 'react'
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";
import PopularVenueData from '../../data/PopularVenue';

const PopularVenue = () => {
  return (
    <div className='w-full flex flex-col items-center p-8 max-md:py-8 max-sm:p-4 gap-4 venue-bg'>
        <h1 className='text-2xl font-semibold text-[rgb(171,28,73)] max-md:text-lg'>Popular Venue Searches</h1>
        <div className='w-full flex justify-center items-center flex-wrap gap-x-4 gap-y-4'>
            {
                PopularVenueData && PopularVenueData.map((venue) => (
                    <div key={venue.id} className='w-[380px] max-sm:w-full h-[120px] max-sm:h-[100px] bg-white flex justify-end items-center relative shadow shadow-[#00000039]'>
                        <div className='w-full h-full absolute top-0 left-0  flex flex-col items-start justify-center gap-2 px-6 max-sm:px-3'>
                            <h4 className='text-base max-sm:text-sm font-bold text-black'>{venue.name}</h4>
                            <Link to={venue.link} className='w-[100px] max-sm:w-[70px] flex justify-center items-center gap-2 py-2 px-3 text-base max-sm:text-sm font-bold border bg-[#AB1C49] text-gray-100 rounded'>Visit <FaArrowRightLong/></Link>
                        </div>
                        <div className='w-[60%] h-full venue-bg-clip-path relative'>
                            <img src={venue.img} alt='' className='w-full h-full object-cover'/>
                            <div className='w-full h-full absolute bottom-[-10px] left-[-138px] flex gap-2 rotate-[127deg]'>
                                <div className='w-[60px] h-[4px] bg-[#411530]'></div>
                                <div className='w-[40px] h-[4px] bg-white'></div>
                            </div>
                        </div>
                    </div>
                ))
            }

        </div>
    </div>
  )
}

export default PopularVenue