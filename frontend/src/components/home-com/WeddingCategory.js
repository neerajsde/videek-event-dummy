import React from 'react'
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";
import venueImg from '../../assets/curise.jpg';
import beachImg from '../../assets/Moving-Pictures1.jpg';
import vinyardImg from '../../assets/vineyard.jpeg'
import ImtiImg from '../../assets/DSC_6826_grande.webp'
import nimImg from '../../assets/Neemarana-Fort-Palace.avif'
import mounWedImg from '../../assets/mountin-wedding.jpg';

const WeddingCategory = () => {
  return (
    <div className='w-full flex flex-col items-center py-8 max-md:px-4 gap-8 max-sm:gap-6'>
        <div className='flex flex-col items-center gap-2 max-sm:gap-1'>
            <h2 className='text-2xl font-bold max-sm:text-lg'>Wedding Categories</h2>
            <div className='w-[70%] h-[1.5px] bg-[#AB1C49]'></div>
        </div>

        <div className='w-full flex justify-center gap-4 max-md:flex-col'>
            <div className='w-[45%] max-lg:w-[47%] flex flex-col gap-4 max-md:w-full'>
                <div className='w-full h-[200px] relative flex justify-between items-center rounded-2xl'>
                    <img src={venueImg} alt='couple-img' className='w-full h-full object-cover rounded-2xl'/>
                    <div className='w-full h-full px-6 max-md:px-4 flex flex-col justify-center items-start gap-4 absolute top-0 left-0 rounded-2xl bg-[#00000067]'>
                        <div className='flex flex-col'>
                            <h4 className='text-lg max-sm:text-base font-bold text-white'>Cruise Weddings</h4>
                            <p className='text-sm max-sm:text-xs font-normal text-gray-300'>Amidst the ocean, celebrate your<br/> day of love in the grand cruise</p>
                        </div>
                        <Link to={'/wedding_category#cruise-weddings'} className='w-[100px] max-sm:w-[80px] max-sm:text-sm flex justify-center items-center gap-2 py-2 px-3 text-base font-bold border bg-[#AB1C49] text-gray-100 rounded border-none'>Visit <FaArrowRightLong/></Link>
                    </div>
                </div>
                <div className='w-full h-[200px] flex justify-between max-sm:flex-col items-center gap-4'>
                    <div className='w-full h-full rounded-2xl relative'>
                        <img src={beachImg} alt='couple-img' className='w-full h-full object-cover rounded-2xl'/>
                        <div className='w-full h-full px-6 max-md:px-4 max-lg:px-2 flex flex-col justify-center items-start gap-4 absolute top-0 left-0 rounded-2xl bg-[#00000067]'>
                            <div className='flex flex-col'>
                                <h4 className='text-lg max-sm:text-base font-bold text-white'>Beach Weddings</h4>
                                <p className='text-sm max-sm:text-xs font-normal text-gray-300'>Beautiful off shores, blue skies, all you desire to tie your note amidts beachy waves</p>
                            </div>
                            <Link to={'/wedding_category#beach-weddings'} className='w-[100px] max-sm:w-[80px] max-sm:text-sm flex justify-center items-center gap-2 py-2 px-3 text-base font-bold border bg-[#AB1C49] text-gray-100 rounded border-none'>Visit <FaArrowRightLong/></Link>
                        </div>
                    </div>
                    <div className='w-full h-full rounded-2xl relative'>
                        <img src={vinyardImg} alt='couple-img' className='w-full h-full object-cover rounded-2xl'/>
                        <div className='w-full h-full px-6 max-md:px-4 max-lg:px-2 flex flex-col justify-center items-start gap-4 absolute top-0 left-0 rounded-2xl bg-[#00000067]'>
                            <div className='flex flex-col'>
                                <h4 className='text-lg max-sm:text-base font-bold text-white'>Vineyard Weddings</h4>
                                <p className='text-sm max-sm:text-xs font-normal text-gray-300'>Lush green wineries, to provide you a clique vibe to tie your knot with your soul mate</p>
                            </div>
                            <Link to={'/wedding_category#vineyard-weddings'} className='w-[100px] max-sm:w-[80px] max-sm:text-sm flex justify-center items-center gap-2 py-2 px-3 text-base font-bold border bg-[#AB1C49] text-gray-100 rounded border-none'>Visit <FaArrowRightLong/></Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-[45%] max-lg:w-[47%] max-md:w-full flex flex-col gap-4'>
                <div className='w-full h-[200px] max-sm:flex-col flex justify-between items-center gap-4'>
                    <div className='w-full h-full rounded-2xl relative'>
                        <img src={ImtiImg} alt='couple-img' className='w-full h-full object-cover rounded-2xl'/>
                        <div className='w-full h-full px-6 max-md:px-4 max-lg:px-2 flex flex-col justify-center items-start gap-4 absolute top-0 left-0 rounded-2xl bg-[#00000067]'>
                            <div className='flex flex-col'>
                                <h4 className='text-lg max-sm:text-base font-bold text-white'>Intimate Weddings</h4>
                                <p className='text-sm max-sm:text-xs font-normal text-gray-300'>Tie the Knot with the love of your life in a cozy intimate setting</p>
                            </div>
                            <Link to={'/wedding_category#intimate-weddings'} className='w-[100px] max-sm:w-[80px] max-sm:text-sm flex justify-center items-center gap-2 py-2 px-3 text-base font-bold border bg-[#AB1C49] text-gray-100 rounded border-none'>Visit <FaArrowRightLong/></Link>
                        </div>
                    </div>
                    <div className='w-full h-full rounded-2xl relative'>
                        <img src={nimImg} alt='couple-img' className='w-full h-full object-cover rounded-2xl'/>
                        <div className='w-full h-full px-6 max-md:px-4 max-lg:px-2 flex flex-col justify-center items-start gap-4 absolute top-0 left-0 rounded-2xl bg-[#00000067]'>
                            <div className='flex flex-col'>
                                <h4 className='text-lg max-sm:text-base font-bold text-white'>Fort Weddings</h4>
                                <p className='text-sm max-sm:text-xs font-normal text-gray-300'>Royalty & Aesthetic grandeur to make your wedding a historic memories</p>
                            </div>
                            <Link to={'/wedding_category#fort-weddings'} className='w-[100px] max-sm:w-[80px] max-sm:text-sm flex justify-center items-center gap-2 py-2 px-3 text-base font-bold border bg-[#AB1C49] text-gray-100 rounded border-none'>Visit <FaArrowRightLong/></Link>
                        </div>
                    </div>
                </div>
                <div className='w-full h-[200px] relative flex justify-between items-center rounded-2xl'>
                    <img src={mounWedImg} alt='couple-img' className='w-full h-full object-cover rounded-2xl'/>
                    <div className='w-full h-full px-6 max-md:px-4 flex flex-col justify-center items-start gap-4 absolute top-0 left-0 rounded-2xl bg-[#00000067]'>
                        <div className='flex flex-col'>
                            <h4 className='text-lg max-sm:text-base font-bold text-white'>Mountain Weddings</h4>
                            <p className='text-sm max-sm:text-xs font-normal text-gray-300'>High hill top chilly weather, special aston</p>
                        </div>
                        <Link to={'/wedding_category#mountain-weddings'} className='w-[100px] max-sm:w-[80px] max-sm:text-sm flex justify-center items-center gap-2 py-2 px-3 text-base font-bold border bg-[#AB1C49] text-gray-100 rounded border-none'>Visit <FaArrowRightLong/></Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WeddingCategory