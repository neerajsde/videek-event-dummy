import React, { useContext } from 'react'
import { MdEditDocument } from "react-icons/md";
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const Header = () => {
  const {setIsOpenRate} = useContext(AppContext);
  return (
    <div className='w-full h-[50px] z-50 items-center flex justify-between px-4 bg-[#AB1C49]'>
      <span className='text-sm max-md:text-xs font-normal text-zinc-100'>India's Favourite Wedding Planning Platform</span>

      <button 
        onClick={() => setIsOpenRate(true)}
        className='flex max-sm:hidden items-center justify-center gap-1 text-base max-md:text-sm text-zinc-100 font-normal'
      >
        <MdEditDocument className='text-lg max-md:text-base'/>
        <span>Write A Review</span>
      </button>
    </div>
  )
}

export default Header