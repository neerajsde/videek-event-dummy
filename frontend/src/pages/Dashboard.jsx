import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/section/Header'
import Navbar from '../components/section/Navbar'
import banner from '../assets/dashboard_banner.jpg'
import { AppContext } from '../context/AppContext'
import { Link, useLocation } from 'react-router-dom';
import { IoMdSettings } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { MdStarBorderPurple500 } from "react-icons/md";

const Dashboard = () => {
  const {userData} = useContext(AppContext);
  const [currTab, setCurrTab] = useState('#profile');
  const location = useLocation();

  useEffect(() => {
    setCurrTab(location.hash);
  },[location.hash]);

  return (
    <div className='w-full flex flex-col'>
      <Header/>
      <Navbar/>

      <div className='w-full h-[250px] relative'>
        <img
            src={banner}
            alt="banner_img"
            className="w-full h-full max-sm:object-top object-cover"
        />
        <div className='w-full h-full absolute top-0 left-0 bg-[#0000008c] flex justify-center items-center gap-2'>
            <span className='text-xl font-semibold text-white'>Welcome,</span>
            <span className='text-xl font-semibold text-gray-300'>{userData.name}</span>
        </div>
      </div>

      <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 grid-rows-1 py-8'>
        <div className='border flex flex-col bg-purple-50'>
          <Link to={'#profile'} className={`py-1 pl-4 border-l-2 flex justify-start items-center gap-2 text-base transition duration-200 ease-in ${currTab === '#profile' ? 'bg-blue-200 border-blue-600' : 'hover:bg-blue-100 hover:border-blue-400 border-transparent'}`}>
            <FaUser className='text-lg text-gray-500'/>User-Info
          </Link>
          <Link to={'#settings'} className={`py-1 pl-4 border-l-2 flex justify-start items-center gap-2 text-base transition duration-200 ease-in ${currTab === '#settings' ? 'bg-blue-200 border-blue-600' : 'hover:bg-blue-100 hover:border-blue-400 border-transparent'}`}>
            <IoMdSettings className='text-lg text-gray-500'/>Settings
          </Link>
          <Link to={'#sortlist'} className={`py-1 pl-4 border-l-2 flex justify-start items-center gap-2 text-base transition duration-200 ease-in ${currTab === '#sortlist' ? 'bg-blue-200 border-blue-600' : 'hover:bg-blue-100 hover:border-blue-400 border-transparent'}`}>
            <MdStarBorderPurple500 className='text-xl text-gray-500'/>SortList
          </Link>
        </div>

        <div className='md:col-span-2 lg:col-span-4 border'>Guys</div>
      </div>

    </div>
  )
}

export default Dashboard