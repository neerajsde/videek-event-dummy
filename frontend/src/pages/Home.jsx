import React, { useContext, useEffect } from 'react'
import Header from '../components/section/Header';
import Navbar from '../components/section/Navbar';
import BannerImg from '../assets/home-banner.jpg';
import PopularVenue from '../components/common/PopularVenue';
import Gallery from '../components/common/Gallery';
import WeddingCategory from '../components/home-com/WeddingCategory';
import RealWeddings from '../components/home-com/RealWeddings';
import BasicContactForm from '../components/common/BasicContactForm';
import BlogSection from '../components/home-com/BlogSection';
import TestimonialSection from '../components/home-com/TestimonialSection';
import Footer from '../components/section/Footer';
import WhyVideek from '../components/common/WhyVideek'; 
import VendorCategory from '../components/home-com/VendorCategory';
import { AppContext } from '../context/AppContext';

// #411530
// #D1512D
// #F5C7A9
// #AB1C49

const Home = () => {
  const {webData} = useContext(AppContext);

  const scrollToDiv = (id) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
    };

  useEffect(() => {
    document.title = webData?.title
    scrollToDiv("home");
  }, [webData]);

  return (
    <div id='home' className='w-full h-full flex flex-col items-center'>
        <Header/>
        <Navbar/>

        
        <div className='w-full h-[90vh] relative'>
          <img src={BannerImg} alt='home-banner' className='w-full h-full object-cover'/>

          <div className='absolute top-0 left-0 w-full h-full home-banner flex justify-center items-center'>
            <div className='flex flex-col items-center gap-4 mt-16'>
              <h2 className='text-4xl text-white font-bold max-md:text-xl'>Plan With a DJ Event</h2>
              <button className='w-[150px] py-2 bg-[#AB1C49] text-zinc-100 rounded-full text-base max-sm:text-sm font-semibold transition duration-300 ease-in hover:bg-[#88173b]'>Explore Here</button>
            </div>
          </div>
        </div>

        <VendorCategory/>
        <WhyVideek/>
        <PopularVenue/>
        <Gallery/>
        <WeddingCategory/>
        <RealWeddings/>
        <BasicContactForm/>
        <BlogSection/>
        <TestimonialSection/>
        <Footer/>
    </div>
  )
}

export default Home