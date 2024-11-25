import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext';
import { FaEdit } from "react-icons/fa";

const Header = () => {
  const {setIsOpenRate} = useContext(AppContext);
  return (
    <div className='w-full h-[50px] z-50 items-center flex justify-between px-4 bg-[#AB1C49]'>
      <span className='text-sm max-md:text-xs font-normal text-zinc-100'>India's Favourite Wedding Planning Platform</span>

      <button 
        onClick={() => setIsOpenRate(true)}
        className='flex items-center justify-center gap-1 text-base max-md:text-sm text-zinc-100 font-normal'
      >
        <FaEdit className='text-lg'/>
        <span className='max-sm:hidden'>Write A Review</span>
      </button>
    </div>
  )
}

export default Header