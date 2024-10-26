import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { HiMenuAlt3 } from "react-icons/hi";

const NavBtns = () => {
  const {setIsActiveLoginPage,isMenuBarActive, setIsMenuBarActive} = useContext(AppContext);
  
  return (
    <div className='flex items-center justify-center gap-4 max-sm:gap-2'>
      <div onClick={() => setIsMenuBarActive(!isMenuBarActive)} className='md:hidden text-white text-3xl'>
        <HiMenuAlt3/>
      </div>
      <button onClick={() => setIsActiveLoginPage(true)} className='w-[150px] max-lg:w-[100px] max-sm:w-[70px] py-2 bg-[#AB1C49] text-zinc-100 rounded-full text-base max-md:text-sm font-semibold'>Log In</button>
    </div>
  )
}

export default NavBtns