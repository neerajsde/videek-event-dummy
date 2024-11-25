import React, { useEffect, useState } from 'react'
import Logo from '../navbar/Logo';
import NavItems from '../navbar/NavItems';
import NavBtns from '../navbar/NavBtns';

const Navbar = () => {
  const [isActiveNav, setIsActiveNav] = useState(false);
  // Use useEffect to add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsActiveNav(true);
      } else {
        setIsActiveNav(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`w-full h-[60px] z-50 flex justify-between items-center px-4 max-sm:px-2 bg-[#411530] ${isActiveNav && 'new-menu'}`}>
      <Logo/>
      <div className='h-full max-md:hidden'>
        <NavItems/>
      </div>
      <NavBtns/>
    </div>
  )
}

export default Navbar