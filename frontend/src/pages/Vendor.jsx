import React, { useEffect, useState } from 'react'
import Navbar from '../components/section/Navbar'
import Header from '../components/section/Header'
import Footer from '../components/section/Footer'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/spinner/Spinner';
import NotFoundImg from '../assets/empty-banner.jpg'
import VendorPage from '../components/common/VendorPage'

const Vendor = () => {
    const [vendorData, setVendorData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();

    const getVendor = async (Name) => {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/vendor/${Name}`
          );
    
          if (response.data.success) {
            setVendorData(response.data.data);
          } else {
            setVendorData(null);
          }
        } catch (error) {
            setVendorData(null);
        } finally{
          setIsLoading(false);
        }
    };
    
    useEffect(() => {
        const name = location.pathname.split('/').at(-1)
        getVendor(name);
    }, [location.pathname]);

  return (
    <div className='w-full h-full flex flex-col items-center'>
        <Header/>
        <Navbar/>

        {
            isLoading ? 
            (<div className="w-screen h-screen flex flex-col justify-center items-center gap-2">
                <Spinner/>
                <h2 className="text-2xl font-semibold text-gray-400">We try to get vendor data...</h2>
            </div>) :
            (
                !vendorData ? 
                (
                    <div className="w-screen h-screen flex flex-col justify-center items-center gap-4">
                        <img src={NotFoundImg} alt='Not Found Img' className='w-[300px] h-[300px] object-cover max-sm:w-[200px] max-sm:h-[200px]'/>
                        <h3 className='text-xl font-semibold text-gray-500'>Not Found Vendor Data</h3>
                    </div>
                ) : 
                (
                    <VendorPage data={vendorData}/>
                )
            )
        }

        <Footer/>
    </div>
  )
}

export default Vendor