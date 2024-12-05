import React, { useEffect, useState } from 'react';
import { FaUsers } from "react-icons/fa";
import { IoImage } from "react-icons/io5";
import { FaQuoteRight } from "react-icons/fa";
import toast from 'react-hot-toast';
import MdLoader from '../spinner/MdLoader';
import { HiUsers } from "react-icons/hi2";
import { FaChromecast } from "react-icons/fa";
import { RiHotelFill } from "react-icons/ri";
import { FaSitemap } from "react-icons/fa";
import { GiLovers } from "react-icons/gi";
import { MdOutlineContactPage } from "react-icons/md";
import { MdOutlineHelp } from "react-icons/md";


const MainPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchVendorDataInsight = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('VideekAdmin');
      if (!token) {
        toast.error('Authentication token not found');
        return;
      }
  
      // Make the API call using fetch
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/realtime/data`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const result = await response.json();
  
      if (result.success) {
        setData(result.data);
      } else {
        setData(null);
        console.error('Error fetching vendor data:', result.message);
      }
    } catch (error) {
      setData(null)
      console.error('Error while fetching vendor data insight:', error.message);
    } finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendorDataInsight();
  },[]);

  if(loading){
    return (
      <div className='w-full h-[450px] flex justify-center items-center'><MdLoader/></div>
    )
  }

  if(!data){
    return (
      <div className='w-full h-[450px] flex justify-center items-center'>Something went wrong</div>
    )
  }
  
  return (
    <div className='w-full flex flex-col p-4 gap-6'>
      <div className='w-full grid grid-cols-5 gap-8'>
        <div className='w-full flex justify-center items-center flex-col gap-1 bg-[#222] rounded-lg p-4 relative'>
          <span className='bg-[#2af92a19] p-2 rounded-md absolute top-0 right-0'><FaUsers className='text-lg text-green-600'/></span>
          <span className='text-xl font-semibold'>{data?.users}</span>
          <span className='text-base font-normal text-gray-400 text-center'>Users</span>
        </div>

        <div className='w-full flex justify-center items-center flex-col gap-1 bg-[#222] rounded-lg p-4 relative'>
          <span className='bg-[#2a3bf930] p-2 rounded-md absolute top-0 right-0'><HiUsers className='text-lg text-blue-600'/></span>
          <span className='text-xl font-semibold'>{data?.vendors}</span>
          <span className='text-base font-normal text-gray-400 text-center'>Vendors</span>
        </div>

        <div className='w-full flex justify-center items-center flex-col gap-1 bg-[#222] rounded-lg p-4 relative'>
          <span className='bg-[#2af9c530] p-2 rounded-md absolute top-0 right-0'><RiHotelFill className='text-lg text-teal-600'/></span>
          <span className='text-xl font-semibold'>{data?.venues}</span>
          <span className='text-base font-normal text-gray-400 text-center'>Venues</span>
        </div>

        <div className='w-full flex justify-center items-center flex-col gap-1 bg-[#222] rounded-lg p-4 relative'>
          <span className='bg-[#f9e82a30] p-2 rounded-md absolute top-0 right-0'><FaSitemap className='text-lg text-yellow-600'/></span>
          <span className='text-xl font-semibold'>{data?.services}</span>
          <span className='text-base font-normal text-gray-400 text-center'>Services</span>
        </div>

        <div className='w-full flex justify-center items-center flex-col gap-1 bg-[#222] rounded-lg p-4 relative'>
          <span className='bg-[#f9872a30] p-2 rounded-md absolute top-0 right-0'><FaQuoteRight className='text-lg text-orange-600'/></span>
          <span className='text-xl font-semibold'>{data?.testimonals}</span>
          <span className='text-base font-normal text-gray-400 text-center'>Testimonals</span>
        </div>

        <div className='w-full flex justify-center items-center flex-col gap-1 bg-[#222] rounded-lg p-4 relative'>
          <span className='bg-[#f92af930] p-2 rounded-md absolute top-0 right-0'><GiLovers className='text-lg text-pink-600'/></span>
          <span className='text-xl font-semibold'>{data?.weddings}</span>
          <span className='text-base font-normal text-gray-400 text-center'>Weddings</span>
        </div>

        <div className='w-full flex justify-center items-center flex-col gap-1 bg-[#222] rounded-lg p-4 relative'>
          <span className='bg-[#f92a2a30] p-2 rounded-md absolute top-0 right-0'><FaChromecast className='text-lg text-red-600'/></span>
          <span className='text-xl font-semibold'>{data?.blogs}</span>
          <span className='text-base font-normal text-gray-400 text-center'>Blogs</span>
        </div>

        <div className='w-full flex justify-center items-center flex-col gap-1 bg-[#222] rounded-lg p-4 relative'>
          <span className='bg-[#9f2af930] p-2 rounded-md absolute top-0 right-0'><IoImage className='text-lg text-violet-600'/></span>
          <span className='text-xl font-semibold'>{data?.gallery}</span>
          <span className='text-base font-normal text-gray-400 text-center'>Gallery</span>
        </div>

        <div className='w-full flex justify-center items-center flex-col gap-1 bg-[#222] rounded-lg p-4 relative'>
          <span className='bg-[#f92af230] p-2 rounded-md absolute top-0 right-0'><MdOutlineContactPage className='text-lg text-fuchsia-500'/></span>
          <span className='text-xl font-semibold'>{data?.contacts}</span>
          <span className='text-base font-normal text-gray-400 text-center'>Contacts</span>
        </div>

        <div className='w-full flex justify-center items-center flex-col gap-1 bg-[#222] rounded-lg p-4 relative'>
          <span className='bg-[#2ab4f930] p-2 rounded-md absolute top-0 right-0'><MdOutlineHelp className='text-lg text-cyan-600'/></span>
          <span className='text-xl font-semibold'>{data?.contactForVendors}</span>
          <span className='text-base font-normal text-gray-400 text-center'>Vendor Contacts</span>
        </div>
      </div>
    </div>
  )
}

export default MainPage