import React, { useContext } from 'react';
import { IoClose } from "react-icons/io5";
import NavItems from '../navbar/NavItems';
import { AppContext } from '../../context/AppContext';

const MenuBar = () => {
    const {setIsMenuBarActive} = useContext(AppContext);

  return (
    <div className='w-full flex flex-col px-4 pt-[110px]'>
        <div onClick={() => setIsMenuBarActive(false)} className='w-full flex justify-end py-4'><IoClose className='text-2xl text-white'/></div>
        <div className='w-full'><NavItems/></div>
    </div>
  )
}

export default MenuBar