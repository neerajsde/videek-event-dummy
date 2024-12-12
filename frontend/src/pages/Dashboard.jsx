import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/section/Header'
import Navbar from '../components/section/Navbar'
import banner from '../assets/dashboard_banner.jpg'
import { AppContext } from '../context/AppContext'
import { Link, useLocation } from 'react-router-dom';
import { IoMdSettings } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { MdStarBorderPurple500 } from "react-icons/md";
import UserInfo from '../components/user/UserInfo'
import UserSetting from '../components/user/UserSetting'
import SortListItems from '../components/user/SortListItems';
import Footer from '../components/section/Footer';

const Dashboard = () => {
  const {userData} = useContext(AppContext);
  const [currTab, setCurrTab] = useState('#profile');
  const location = useLocation();

  useEffect(() => {
    setCurrTab(location.hash);
  },[location.hash]);

  const scrollToDiv = (id) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
    };

    useEffect(() => {
    document.title = "Dashboard"
    scrollToDiv("dashboard");
  }, []);

  return (
    <div id='dashboard' className='w-full flex flex-col'>
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

      <div className='w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 grid-rows-1 py-8'>
        <div className='border flex flex-col max-md:flex-row max-md:justify-between bg-purple-50 max-md:border max-md:border-blue-400'>
          <Link to={'#profile'} className={`max-md:w-full max-sm:justify-center py-1 pl-4 max-sm:pl-0 border-l-2 max-md:py-2 max-md:border-l-0 max-md:border-r max-md:border-b-2 flex justify-start items-center gap-2 text-base transition duration-200 ease-in ${currTab === '#profile' ? 'bg-blue-200 border-blue-600' : 'hover:bg-blue-100 hover:border-blue-400 border-transparent max-sm:border-r-blue-400'}`}>
            <FaUser className='text-lg text-gray-500'/><span className='max-sm:hidden'>User Info</span>
          </Link>
          <Link to={'#settings'} className={`max-md:w-full max-sm:justify-center py-1 pl-4 max-sm:pl-0 border-l-2 max-md:py-2 max-md:border-l-0 max-md:border-r max-md:border-b-2 flex justify-start items-center gap-2 text-base transition duration-200 ease-in ${currTab === '#settings' ? 'bg-blue-200 border-blue-600' : 'hover:bg-blue-100 hover:border-blue-400 border-transparent max-sm:border-r-blue-400'}`}>
            <IoMdSettings className='text-lg text-gray-500'/><span className='max-sm:hidden'>Settings</span>
          </Link>
          <Link to={'#sortlist'} className={`max-md:w-full max-sm:justify-center py-1 pl-4 max-sm:pl-0 border-l-2 max-md:py-2 max-md:border-l-0 max-md:border-r max-md:border-b-2 flex justify-start items-center gap-2 text-base transition duration-200 ease-in ${currTab === '#sortlist' ? 'bg-blue-200 border-blue-600' : 'hover:bg-blue-100 hover:border-blue-400 border-transparent max-sm:border-r-blue-400'}`}>
            <MdStarBorderPurple500 className='text-xl text-gray-500'/><span className='max-sm:hidden'>SortList</span>
          </Link>
        </div>

        <div className='md:col-span-2 lg:col-span-4 border p-4 bg-purple-50'>
          {location.hash === '#profile' && (<UserInfo/>)}
          {location.hash === '#settings' && (<UserSetting/>)}
          {location.hash === '#sortlist' && (<SortListItems/>)}
        </div>
      </div>

      <Footer/>

    </div>
  )
}

export default Dashboard