import React, { useEffect, useState } from 'react'
import Header from '../components/section/Header'
import Navbar from '../components/section/Navbar'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../components/spinner/Spinner';
import NotFoundImg from '../assets/empty-banner.jpg'
import axios from 'axios';
import Footer from '../components/section/Footer';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { MdOutlineStarOutline } from "react-icons/md";

const VendorCategories = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [categoryData, setCategoryData] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const scrollToDiv = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };
    
    useEffect(() => {
        document.title = `Vendor - ${location.pathname.split('/').at(-1).replaceAll('-',' ')}`
        scrollToDiv("vendor-category");
    }, []);

    const getVendorCategories = async (categoryName) => {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/vendor/category/${categoryName}`
          );
    
          if (response.data.success) {
            setCategoryData(response.data.data);
          } else {
            setCategoryData(null);
          }
        } catch (error) {
            setCategoryData(null);
        } finally{
          setIsLoading(false);
        }
    };
    
    useEffect(() => {
        const name = location.pathname.split('/').at(-1)
        getVendorCategories(name);
    }, [location.pathname]);

    if(isLoading){
        return (
            <div className="w-screen h-screen flex flex-col justify-center items-center gap-2">
                <Spinner/>
                <h2 className="text-2xl font-semibold text-gray-400">We try to get vendors data...</h2>
            </div>
        )
    }

    if(!categoryData){
        return(
            <div className="w-screen h-screen flex flex-col justify-center items-center gap-4">
                <img src={NotFoundImg} alt='Not Found Img' className='w-[300px] h-[300px] object-cover max-sm:w-[200px] max-sm:h-[200px]'/>
                <h3 className='text-xl font-semibold text-gray-500'>Not Found Vendors Data</h3>
            </div>
        )
    }

  return (
    <div id='vendor-category' className='w-full h-full flex flex-col items-center'>
        <Header/>
        <Navbar/>

        <div className='w-full flex flex-col'>
            <div className='w-full flex justify-between items-center px-4 py-2 border-b border-gray-200'>
                <button onClick={() => navigate(-1)} className='py-2 pl-1 pr-3 border rounded-md border-gray-400 flex justify-center items-center gap-1 transition duration-200 ease-in hover:text-white hover:bg-black max-sm:border-none'>
                    <MdKeyboardArrowLeft className='text-2xl'/> <span className='text-base font-semibold max-sm:hidden'>Back</span>
                </button>
                <h3 className='text-xl font-semibold text-gray-500 capitalize max-sm:text-base'>{location.pathname.split('/').at(-1).replaceAll('-',' ')}</h3>
                <div className='text-xl font-semibold text-black max-sm:text-sm'>{`Total Vendors: ${categoryData.length}`}</div>
            </div>

            <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-8 gap-6 max-sm:px-2 max-sm:py-4'>
                {
                    categoryData?.length !== 0 ? categoryData.map((item) => (
                        <Link key={item._id} to={`/vendor/${item.category.toLowerCase().replaceAll(/\s+/g, '-')}/${item.name.toLowerCase().replaceAll(/\s+/g, '-')}`} className={`w-full shadow-lg border border-gray-200 rounded-xl p-4 gap-2 flex flex-col`}>
                            <div className='w-full h-[200px] relative'>
                                <img
                                    src={`${process.env.REACT_APP_BASE_URL}${item.img}`}
                                    alt='vendor-img'
                                    className='w-full h-full object-cover rounded'
                                />
                                <div className='w-full h-full absolute top-0 left-0 bg-[#1111] rounded flex justify-start items-end'>
                                    <div className='m-1 p-1 flex gap-1 items-center justify-center rounded-sm bg-[#111111b3] text-white'>
                                        <MdOutlinePhotoSizeSelectActual/>
                                        <span className='text-xs'>{item.total_images}<span>+</span></span>
                                    </div>
                                </div>
                            </div>

                            <div className='w-full flex flex-col gap-1 max-sm:gap-1 relative'>
                                <div className='w-full flex justify-between items-center'>
                                    <span className='text-base font-normal text-[#AB1C49]'>{item.name}</span>
                                    <div className='flex items-center justify-start gap-0'>
                                        <span className='text-sm text-gray-400'>{item.avg_ratings}</span>
                                        {Array.from({ length: Math.floor(item.avg_ratings) }, (_, index) => (
                                            <FaStar
                                                key={index}
                                                className='text-base text-[#ffc107]'
                                            />
                                        ))}
                                        {
                                            item.avg_ratings.split('.').at(1) != 0 && ( <FaStarHalfAlt className='text-base text-[#ffc107]'/>)
                                        }
                                    </div>
                                </div>
                                <div className='w-full flex justify-between items-center'>
                                    <p className='text-base font-bold text-black'>{item.price_range}</p>
                                    <p className='text-base text-black'>{item.category}</p>
                                </div>
                                <p className='text-sm text-gray-500'>{item.title}</p>
                            </div>

                            <div className='w-full flex justify-between items-center gap-2'>
                                <button className='w-full border border-gray-400 text-gray-500 py-1 rounded-sm font-normal transition duration-300 ease-in hover:bg-gray-500 hover:text-white'>Send enquiry</button>
                                <button className='w-full border border-[#AB1C49] text-[#AB1C49] py-1 rounded-sm font-normal transition duration-300 ease-in hover:bg-[#AB1C49] hover:text-white flex justify-center items-center gap-2'><MdOutlineStarOutline className='text-lg'/> Shortlist</button>
                            </div>
                        </Link>
                    )): (
                        <div className='w-full text-center text-2xl font-semibold text-gray-400'>Empty Vendors</div>
                    )
                }
            </div>
        </div>

        <Footer/>
    </div>
  )
}

export default VendorCategories