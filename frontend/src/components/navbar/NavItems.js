import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext';
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";

const NavItems = () => {
  const {tab, setTab} = useContext(AppContext);

  return (
    <div className='h-full flex items-center justify-center max-md:flex-col max-md:justify-start max-md:items-start max-md:gap-3'>
      <div 
        onMouseEnter={() => setTab({isActive: true, name:'dj-event'})}
        onMouseLeave={() => setTab({isActive: false, name:''})}
        className={`h-full px-4 flex justify-center items-center gap-1 cursor-pointer text-base max-lg:text-sm max-lg:px-2 font-semibold text-zinc-100 border-b-[3px] transition duration-200 ease-in ${tab.name === 'dj-event' ? 'border-b-zinc-100': 'border-transparent hover:border-b-zinc-100'}`}
      >DJ Events {tab.name === 'dj-event' ? (<TiArrowSortedUp className='text-lg md:hidden'/>) : (<TiArrowSortedDown className='text-lg md:hidden'/>)}</div>
      <div 
        onMouseEnter={() => setTab({isActive: true, name:'decoration'})}
        onMouseLeave={() => setTab({isActive: false, name:''})}
        className={`h-full px-4 flex justify-center items-center gap-1 cursor-pointer text-base max-lg:text-sm max-lg:px-2 font-semibold text-zinc-100 border-b-[3px] transition duration-200 ease-in ${tab.name === 'decoration' ? 'border-b-zinc-100': 'border-transparent hover:border-b-zinc-100'}`}
      >Decoration {tab.name === 'decoration' ? (<TiArrowSortedUp className='text-lg md:hidden'/>) : (<TiArrowSortedDown className='text-lg md:hidden'/>)}</div>
      <div 
        onMouseEnter={() => setTab({isActive: true, name:'photos'})}
        onMouseLeave={() => setTab({isActive: false, name:''})}
        className={`h-full px-4 flex justify-center items-center gap-1 cursor-pointer text-base max-lg:text-sm max-lg:px-2 font-semibold text-zinc-100 border-b-[3px] transition duration-200 ease-in ${tab.name === 'photos' ? 'border-b-zinc-100': 'border-transparent hover:border-b-zinc-100'}`}
      >Photos {tab.name === 'photos' ? (<TiArrowSortedUp className='text-lg md:hidden'/>) : (<TiArrowSortedDown className='text-lg md:hidden'/>)}</div>
      <div 
        onMouseEnter={() => setTab({isActive: true, name:'events'})}
        onMouseLeave={() => setTab({isActive: false, name:''})}
        className={`h-full px-4 flex justify-center items-center cursor-pointer gap-1 text-base max-lg:text-sm max-lg:px-2 font-semibold text-zinc-100 border-b-[3px] transition duration-200 ease-in ${tab.name === 'events' ? 'border-b-zinc-100': 'border-transparent hover:border-b-zinc-100'}`}
      >Events {tab.name === 'events' ? (<TiArrowSortedUp className='text-lg md:hidden'/>) : (<TiArrowSortedDown className='text-lg md:hidden'/>)}</div>
      <div 
        onMouseEnter={() => setTab({isActive: true, name:'audio-visiual'})}
        onMouseLeave={() => setTab({isActive: false, name:''})}
        className={`h-full px-4 flex justify-center items-center cursor-pointer gap-1 text-base max-lg:text-sm max-lg:px-2 font-semibold text-zinc-100 border-b-[3px] transition duration-200 ease-in ${tab.name === 'audio-visiual' ? 'border-b-zinc-100': 'border-transparent hover:border-b-zinc-100'}`}
      >Audio Visiual {tab.name === 'audio-visiual' ? (<TiArrowSortedUp className='text-lg md:hidden'/>) : (<TiArrowSortedDown className='text-lg md:hidden'/>)}</div>
      <div 
        onMouseEnter={() => setTab({isActive: true, name:'blog'})}
        onMouseLeave={() => setTab({isActive: false, name:''})}
        className={`h-full px-4 flex justify-center items-center cursor-pointer gap-1 text-base max-lg:text-sm max-lg:px-2 font-semibold text-zinc-100 border-b-[3px] transition duration-200 ease-in ${tab.name === 'blog' ? 'border-b-zinc-100': 'border-transparent hover:border-b-zinc-100'}`}
      >Blog {tab.name === 'blog' ? (<TiArrowSortedUp className='text-lg md:hidden'/>) : (<TiArrowSortedDown className='text-lg md:hidden'/>)}</div>
      <div 
        onMouseEnter={() => setTab({isActive: true, name:'e-vites'})}
        onMouseLeave={() => setTab({isActive: false, name:''})}
        className={`h-full px-4 flex justify-center items-center cursor-pointer gap-1 text-base max-lg:text-sm max-lg:px-2 font-semibold text-zinc-100 border-b-[3px] transition duration-200 ease-in ${tab.name === 'e-vites' ? 'border-b-zinc-100': 'border-transparent hover:border-b-zinc-100'}`}
      >E-Invites {tab.name === 'e-vites' ? (<TiArrowSortedUp className='text-lg md:hidden'/>) : (<TiArrowSortedDown className='text-lg md:hidden'/>)}</div>
    </div>
  )
}

export default NavItems