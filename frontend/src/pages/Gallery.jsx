import React, { useEffect, useState } from 'react'
import axios from "axios"
import Header from '../components/section/Header'
import Navbar from '../components/section/Navbar'
import { useLocation, useNavigate } from 'react-router-dom';
import { MdKeyboardArrowLeft } from "react-icons/md";
import Footer from '../components/section/Footer';
import ContactForm from '../components/common/ContactForm';
import Spinner from '../components/spinner/Spinner';
import NotFoundImg from '../assets/empty-banner.jpg'
import CategoryImages from '../components/gallery/CategoryImages';

const Gallery = () => {
    const [categoryData, setCategoryData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const getGalleryCategory = async (category) => {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/gallery/category/${category}`
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
        getGalleryCategory(name);
    }, [location.pathname]);

    const scrollToDiv = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        };
    
        useEffect(() => {
        document.title = "Gallery"
        scrollToDiv("gallery");
    }, []);

    if(isLoading){
        return (
            <div className="w-screen h-screen flex flex-col justify-center items-center gap-2">
                <Spinner/>
                <h2 className="text-2xl font-semibold text-gray-400">We try to get gallery data...</h2>
            </div>
        )
    }

    if(!categoryData){
        return(
            <div className="w-screen h-screen flex flex-col justify-center items-center gap-4">
                <img src={NotFoundImg} alt='Not Found Img' className='w-[300px] h-[300px] object-cover max-sm:w-[200px] max-sm:h-[200px]'/>
                <h3 className='text-xl font-semibold text-gray-500'>Not Found Album Data</h3>
            </div>
        )
    }

  return (
    <div id='gallery' className='w-full h-full flex flex-col items-center'>
        <Header/>
        <Navbar/>

        <div className='w-full flex flex-col'>
            <div className='w-full flex justify-between items-center px-4 py-2 border-b border-gray-200'>
                <button onClick={() => navigate(-1)} className='py-2 pl-1 pr-3 border max-sm:border-none rounded-md border-gray-400 flex justify-center items-center gap-1 transition duration-200 ease-in hover:text-white hover:bg-black'>
                    <MdKeyboardArrowLeft className='text-2xl'/> <span className='text-base font-semibold max-sm:hidden'>Back</span>
                </button>
                <div className='text-xl font-semibold text-black max-sm:text-sm max-md:text-base'>{categoryData.category}</div>
            </div>
            
            <div className='w-full flex flex-col p-8 gap-4 max-sm:p-4'>
                <h3 className='text-2xl font-semibold text-black'>{categoryData.title}</h3>
                <div className='w-full flex flex-col gap-2'>
                    <h3 className='text-xl font-semibold text-black'>About</h3>
                    <div
                        dangerouslySetInnerHTML={{ __html: categoryData.desc }}
                    ></div>
                </div>
                <CategoryImages weddingData={categoryData}/>
            </div>
        </div>

        <ContactForm/>
        <Footer/>
    </div>
  )
}

export default Gallery