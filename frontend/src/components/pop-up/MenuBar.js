import React, { useContext, useEffect, useState } from 'react';
import { IoClose } from "react-icons/io5";
import NavItems from '../navbar/NavItems';
import { AppContext } from '../../context/AppContext';

const MenuBar = () => {
    const {setIsMenuBarActive} = useContext(AppContext);

    const [updateMenu, setUpdateMenu] = useState(false);

  // Use useEffect to add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setUpdateMenu(true);
      } else {
        setUpdateMenu(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`w-full relative px-4 ${updateMenu ? 'pt-[70px]' : 'pt-[120px]'}`}>
        <div onClick={() => setIsMenuBarActive(false)} className={`absolute right-3 ${updateMenu ? 't-[60px]' : 't-[110px]'}`}><IoClose className='text-3xl text-white'/></div>
        <div className='w-full'><NavItems/></div>
    </div>
  )
}

export default MenuBar