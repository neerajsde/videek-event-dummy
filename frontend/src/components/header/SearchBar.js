import React, { useState } from 'react'
import { IoCaretDown } from "react-icons/io5";
import { IoCaretUp } from "react-icons/io5";

const SearchBar = () => {
  const [isActiveOptionMenu, setIsActiveMenu] = useState(false);

  return (
    <div className='relative'>
      <input
        type='text'
        name='search'
        placeholder='search here...'
        className='w-[300px] py-1 px-3 pr-7 bg-zinc-200 text-black font-normal text-base rounded-sm outline-none border-2 border-transparent transition duration-300 ease-in focus:border-pink-500'
      />
      <div className='text-lg absolute top-3 right-2'>
        {isActiveOptionMenu ? (<IoCaretUp/>) : (<IoCaretDown/>)}
      </div>
    </div>
  )
}

export default SearchBar