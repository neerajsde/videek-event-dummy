import React, { useEffect, useState } from 'react'
import axios from "axios"
import Header from '../components/section/Header'
import Navbar from '../components/section/Navbar'
import { Link, useLocation } from 'react-router-dom';
import Footer from '../components/section/Footer';
import ContactForm from '../components/common/ContactForm';
import Spinner from '../components/spinner/Spinner';
import NotFoundImg from '../assets/empty-banner.jpg'
import { MdLocationOn } from "react-icons/md";
import { GoHeartFill } from "react-icons/go";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import PhotoGallery from '../components/gallery/PhotoGallery';

const RealWeddings = () => {
    const [weddingData, setWeddingData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();

    const getWeddingData = async (coupleName) => {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/wedding/${coupleName}`
          );
    
          if (response.data.success) {
            setWeddingData(response.data.data);
          } else {
            setWeddingData(null);
          }
        } catch (error) {
            setWeddingData(null);
        } finally{
          setIsLoading(false);
        }
    };
    
    useEffect(() => {
        const name = location.pathname.split('/').at(-1)
        getWeddingData(name);
    }, [location.pathname]);

    const scrollToDiv = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };
    
    useEffect(() => {
        document.title = "Real-Weddings"
        scrollToDiv("realweddings");
    }, []);

    if(isLoading){
        return (
            <div className="w-screen h-screen flex flex-col justify-center items-center gap-2">
                <Spinner/>
                <h2 className="text-2xl font-semibold text-gray-400">We try to get wedding data...</h2>
            </div>
        )
    }

    if(!weddingData){
        return(
            <div className="w-screen h-screen flex flex-col justify-center items-center gap-4">
                <img src={NotFoundImg} alt='Not Found Img' className='w-[300px] h-[300px] object-cover max-sm:w-[200px] max-sm:h-[200px]'/>
                <h3 className='text-xl font-semibold text-gray-500'>Not Found Wedding Data</h3>
            </div>
        )
    }

  return (
    <div id='realweddings' className='w-full h-full flex flex-col items-center'>
        <Header/>
        <Navbar/>

        <div className='w-full h-[250px] relative'>
            <img
                src={`${process.env.REACT_APP_BASE_URL}/weddings${weddingData.images[0]}`}
                alt="realweddings_img"
                className="w-full h-full max-sm:object-top object-cover"
            />
            <div className='w-full h-full absolute top-0 left-0 bg-[#0009] flex flex-col justify-center items-center gap-2'>
                <div className='flex items-center gap-2'>
                    <span className='text-xl font-semibold text-white'>{weddingData.couple_name.split(' ').at(0).trim()}</span>
                    <GoHeartFill className='text-[#e31b23] text-2xl'/>
                    <span className='text-xl font-semibold text-white'>{weddingData.couple_name.split(' ').at(-1).trim()}</span>
                </div>
                <div className='flex justify-start items-center gap-2'>
                    <Link to={'/'} className='text-base font-medium text-gray-300 hover:underline'>Home</Link>
                    <div className='text-lg font-medium text-gray-400'>||</div>
                    <Link to={'/real_weddings'} className='text-base font-medium text-gray-300 hover:underline'>Real Weddings</Link>
                    <div className='text-lg font-medium text-gray-400'>||</div>
                    <div className='text-base font-medium text-gray-300'>{weddingData.couple_name}</div>
                </div>
            </div>
        </div>

        <div className='w-full flex justify-start max-sm:flex-col-reverse items-start p-8 max-md:px-6 max-sm:px-4 max-sm:gap-4'>
            <h4 className='w-full text-2xl font-bold text-black'>{weddingData.title}</h4>
            <div className='w-[300px] max-sm:w-full shadow-xl flex flex-col items-center border p-4 gap-1'>
                <span className='text-base text-gray-400'>Wedding Date</span>
                <span className='text-lg text-black'>{weddingData.date}</span>
                <div className='w-full h-[1px] bg-gray-300'></div>
                <span className='text-center flex items-start justify-center gap-1 text-base text-gray-400'><MdLocationOn className='text-xl'/> {weddingData.location}</span>
            </div>
        </div>

        <div
            className='text-black text-base w-full max-sm:text-sm flex flex-col px-8 max-md:px-6 max-sm:px-4'
            dangerouslySetInnerHTML={{ __html: weddingData.description }}
        ></div>

        <PhotoGallery weddingData={weddingData}/>

        <div className='w-full px-8 py-8 max-md:p-6 max-sm:px-4 flex flex-col gap-4'>
            <h3 className='text-2xl font-bold text-black'>Worked Vendor <span>{`(${weddingData.taggedVendor.length})`}</span></h3>
            <div className='w-full flex flex-wrap gap-4'>
                {
                    weddingData?.taggedVendor && weddingData?.taggedVendor.map((item) => (
                        <Link key={item._id} className='w-[300px] max-sm:w-full border p-4 shadow-lg'>
                            <div className='w-full flex flex-col gap-0'>
                                <h4 className='text-lg text-black'>{item.name}</h4>
                                <span className='text text-gray-400'>{item.category}</span>
                            </div>
                            <div className='w-full flex flex-col'>
                                <div className='w-full flex items-center justify-start gap-0'>
                                    <span>{item.avg_ratings}</span>
                                    {Array.from({ length: Math.floor(item.avg_ratings) }, (_, index) => (
                                        <FaStar
                                            key={index}
                                            className='text-base text-[#ffc107]'
                                        />
                                    ))}
                                    {
                                        item.avg_ratings.split('.').at(1) !== 0 && ( <FaStarHalfAlt className='text-base text-[#ffc107]'/>)
                                    }
                                </div>
                                <p className='text-sm text-gray-500 font-semibold'>{item.intro}</p>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>

        <ContactForm/>
        <Footer/>
    </div>
  )
}

export default RealWeddings