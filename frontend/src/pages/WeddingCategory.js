import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/section/Header'
import Navbar from '../components/section/Navbar'
import axios from 'axios'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoMdArrowRoundBack } from "react-icons/io";
import Spinner from '../components/spinner/Spinner'
import { AppContext } from '../context/AppContext'
import ContactForm from '../components/common/ContactForm'
import Footer from '../components/section/Footer'

const WeddingCategory = () => {
    const { setImageViewActive } = useContext(AppContext);
    const [categoryOptions, setCategoryOptions] = useState(null);
    const [currTab, setCurrTab] = useState('');
    const [weddingData, setWeddingData] = useState(null);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const getWeddingsCategory = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/wedding/unique-category`
          );
    
          if (response.data.success) {
            setCategoryOptions(response.data.data);
          } else {
            setCategoryOptions(null);
          }
        } catch (err) {
          setCategoryOptions(null);
        }
    };

    useEffect(() => {
        if(location.hash){
            setCurrTab(location.hash.replace('#',''));
        }
    },[location.hash]);

    const currWeddingCategory = async (category) => {
        try {
            setLoading(true);
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/wedding/category/${category}`
          );
    
          if (response.data.success) {
            setWeddingData(response.data.data);
          } else {
            setWeddingData(null);
          }
        } catch (err) {
            setWeddingData(null);
        } finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        currWeddingCategory(currTab);
    },[currTab]);

    useEffect(() => {
        if(!categoryOptions){
            getWeddingsCategory();
        }
    },[]);

    const scrollToDiv = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };
    
    useEffect(() => {
        document.title = "Wedding Categories"
        scrollToDiv("WeddingCategories");
    }, []);

  return (
    <div id='WeddingCategories' className='w-full flex flex-col bg-[#ececec]'>
        <Header/>
        <Navbar/>

        <div className='w-full flex flex-col p-6 max-sm:p-2 max-md:p-4'>
            <div className='w-full flex flex-col bg-white px-4 max-sm:p-2 gap-4'>
                <div className='w-full flex justify-between pt-4'>
                    <div className='flex justify-start items-center gap-4 max-sm:gap-1'>
                        <div onClick={() => navigate(-1)} className='text-2xl cursor-pointer'><IoMdArrowRoundBack/></div>
                        <h2 className='text-xl text-black font-semibold max-md:text-lg max-sm:text-base'>Wedding Categories</h2>
                    </div>
                    <div className='flex justify-end gap-1 text-base max-sm:text-sm'>
                        <span className='text-black'>{weddingData?.length}</span>
                        <span className='text-gray-400'>Results</span>
                    </div>
                </div>
                <div className='w-full flex justify-start items-center flex-wrap max-sm:justify-between gap-4 max-sm:gap-2'>
                    {
                        categoryOptions && categoryOptions.map((item) => (
                            <Link 
                                key={item}
                                to={`#${item.replaceAll(' ','-').toLowerCase()}`}
                                className={`border-b-2 pb-1 max-sm:pb-0 max-sm:text-sm ${currTab === item.replaceAll(' ','-').toLowerCase()  ?'border-red-600 text-black':'border-transparent text-gray-400'}`}
                            >{item}</Link>
                        ))
                    }
                </div>
            </div>
            <div className='w-full bg-white'>
                {
                    loading ? (<div className='w-full h-[400px] flex justify-center items-center'><Spinner/></div>) :
                    weddingData ? 
                    (
                        <div className='w-full p-4 max-sm:p-2 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2'>
                            {
                                weddingData.map((item, index) => (
                                    <img onClick={() => {
                                        setImageViewActive({
                                            isActive: true, 
                                            index: index,
                                            AllImages: weddingData, 
                                            dirName:'weddings'
                                        })
                                    }} src={`${process.env.REACT_APP_BASE_URL}/weddings${item}`} alt='' className='w-full h-[200px] cursor-pointer object-cover'/>
                                ))
                            }
                        </div>
                    )
                    :
                    (
                        <div className='w-full h-[400px] flex justify-center items-center text-lg font-semibold'>Not Found</div>
                    )
                }
            </div>
        </div>

        <div className='bg-white'><ContactForm/></div>
        <Footer/>
    </div>
  )
}

export default WeddingCategory