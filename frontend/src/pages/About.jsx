import React, { useEffect } from 'react'
import Navbar from '../components/section/Navbar'
import Header from '../components/section/Header'
import Footer from '../components/section/Footer'
import { Link } from 'react-router-dom';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import AboutUsImg from '../assets/About-us/banner.jpeg'
import WhyVideek from '../components/common/WhyVideek';
import SuperHeading from '../components/common/SuperHeading';


const About = () => {
    const scrollToDiv = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        };

        useEffect(() => {
        document.title = "About Us"
        scrollToDiv("about");
    }, []);


  return (
    <div id="about" className='w-full h-full flex flex-col items-center'>
        <Header/>
        <Navbar/>

        <SuperHeading title={'About Us'}/>

        <div className='w-full flex justify-start items-center gap-2 px-8 py-6'>
            <Link to={'/'} className='text-base font-medium text-gray-600 transition duration-200 ease-in hover:text-[#AB1C49] hover:underline'>Home</Link>
            <span><MdKeyboardDoubleArrowRight className='text-lg'/></span>
            <Link className='text-base font-medium text-gray-600 transition duration-200 ease-in hover:text-[#AB1C49] hover:underline'>About Us</Link>
        </div>

        <div className='w-full flex justify-center items-start p-8 gap-8 max-md:flex-col max-md:p-4 max-sm:gap-2'>
            <div className='w-[700px] max-lg:w-[500px] h-[400px] max-lg:h-[300px] max-md:w-full'>
                <img src={AboutUsImg} alt='about-img' className='w-full h-full object-cover rounded-xl'/>
            </div>
            <div className='w-full flex flex-col gap-4 max-sm:gap-2'>
                <p className='text-base max-sm:text-sm font-normal text-gray-500  select-none'>Welcome to Videek Events – where your celebrations come to life! We are a full-service event planning company dedicated to making your special occasions unforgettable. Whether you're planning a high-energy DJ party or a magical wedding celebration, our experienced team is here to bring your vision to reality. At Videek, we believe that every event deserves a personal touch, and we’re passionate about delivering an experience that’s tailored to your needs.</p>
                <p className='text-base max-sm:text-sm font-normal text-gray-500  select-none'>We understand the importance of music in setting the tone for any event. Whether it’s an energetic dance floor for a party or a more relaxed vibe for a reception, our experienced DJs know how to create the perfect atmosphere. We work closely with you to curate a playlist that reflects your tastes and keeps your guests entertained from start to finish.</p>
                <p className='text-base max-sm:text-sm font-normal text-gray-500 select-none'>When it comes to weddings, we know that every couple has a vision for their big day. Whether it’s a small intimate ceremony or a grand celebration, our team takes care of everything—from the decorations to the coordination—so that you can enjoy every moment without worrying about the details. We customize our services to fit your style, personality, and budget.</p>
            </div>
        </div>

        <div className='w-full flex flex-col items-center p-8 gap-6 max-md:p-4 max-md:gap-2'>
            <h2 className='text-2xl text-[#AB1C49] font-bold max-md:text-xl max-sm:text-lg'>What We Do</h2>
            <div className='w-full flex flex-col justify-start gap-4'>
                <p className='text-base max-sm:text-sm max-sm:text-justify text-black'>From DJ events to wedding ceremonies, we provide a wide range of services to make your day truly special. Our DJ services are perfect for adding energy to any event, from corporate gatherings to personal celebrations. We work with you to curate the perfect playlist, ensuring that the music enhances the atmosphere and keeps your guests engaged throughout.</p>
                <p className='text-base max-sm:text-sm max-sm:text-justify text-black'>When it comes to weddings, we know that every couple has a vision for their big day. Whether it’s a small intimate ceremony or a grand celebration, our team takes care of everything—from the decorations to the coordination—so that you can enjoy every moment without worrying about the details. We customize our services to fit your style, personality, and budget.</p>
            </div>
        </div>

        <div className='w-full flex justify-between p-8 gap-8 max-md:flex-col max-sm:p-4 max-sm:gap-4'>
            <div className='w-full flex flex-col items-center border-2 border-gray-500 rounded-xl p-4 gap-4 max-sm:p-2'>
                <h2 className='text-2xl max-sm:text-lg font-semibold text-[#AB1C49]'>Our Vision</h2>
                <p className='text-base max-sm:text-sm font-normal text-black'>At Videek Events, our vision is to be the leading event planning company known for creating unforgettable and personalized experiences. We aspire to craft events that not only reflect the uniqueness of our clients but also inspire joy, connection, and lasting memories. By blending creativity with meticulous planning, we aim to set new standards in the event industry, making every occasion—whether a DJ event, wedding, or celebration—a remarkable experience.</p>
            </div>
            <div className='w-full flex flex-col items-center border-2 border-gray-500 rounded-xl p-4 gap-4 max-sm:p-2'>
                <h2 className='text-2xl max-sm:text-lg font-semibold text-[#AB1C49]'>Our Mission</h2>
                <p className='text-base max-sm:text-sm font-normal text-black'>At Videek Events, our mission is simple: to create exceptional events that leave a lasting impression. We understand the importance of celebrating life's milestones, and we strive to make every event as unique as the people behind them. With our professional approach and attention to detail, we handle every aspect of the event, ensuring that the planning process is stress-free and enjoyable for you.</p>
            </div>
        </div>

        <WhyVideek/>
        <div className='w-full flex flex-col items-start p-8 gap-4 max-sm:p-4'>
            <h2 className='text-2xl text-[#AB1C49] font-bold max-sm:text-xl'>Why Choose Us?</h2>
            <div className='w-full flex flex-col justify-start gap-1'>
                <p className='text-base max-sm:text-sm text-black'><span className='font-bold'>Personalized Service:</span> We take the time to understand your needs and tailor every aspect of the event to your preferences.</p>
                <p className='text-base max-sm:text-sm text-black'><span className='font-bold'>Professional Team:</span> Our team of event experts works diligently to ensure your event runs smoothly and exceeds your expectations.</p>
                <p className='text-base max-sm:text-sm text-black'><span className='font-bold'>Attention to Detail:</span> From the smallest details to the big picture, we manage every part of the event planning process with precision and care.</p>
                <p className='text-base max-sm:text-sm text-black'><span className='font-bold'>Memorable Experiences:</span> Our goal is to create lasting memories for you and your guests, making every celebration truly special.</p>
            </div>
        </div>

        <Footer/>
    </div>
  )
}

export default About