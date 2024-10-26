import React from 'react'
import Logo from '../navbar/Logo';
import NavItems from '../navbar/NavItems';
import NavBtns from '../navbar/NavBtns';

const Navbar = () => {
  return (
    <div className='w-full h-[60px] z-50 flex justify-between items-center px-4 max-sm:px-2 bg-[#411530]'>
      <Logo/>
      <div className='h-full max-md:hidden'>
        <NavItems/>
      </div>
      <NavBtns/>
    </div>
  )
}

export default Navbar