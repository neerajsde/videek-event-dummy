import React from 'react'
import Logo from '../navbar/Logo'
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import InstargramImg from '../../assets/social-icons/instagram.png';
import { FaPhone } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='w-full flex flex-col p-8 max-sm:p-4 gap-4 bg-[#feeded]'>
        <div className='w-full flex justify-around items-start max-md:flex-col max-md:gap-8'>
            <div className='flex flex-col items-start gap-6 max-sm:w-full max-sm:gap-4'>
                <Logo/>
                <div className='flex flex-col justify-start gap-4'>
                    <div className='flex items-center gap-2'>
                        <FaPhone className='text-xl text-[#AB1C49]'/>
                        <Link to={'tel:+91234567890'} className='text-lg text-gray-600'>+91 234567890</Link>
                    </div>
                    <div className='flex items-center gap-2'>
                        <IoIosMail className='text-2xl text-[#AB1C49]'/>
                        <Link to='mailto:abcxyz@gmail.com' className='text-lg text-gray-600'>abcxyz12@gmail.com</Link>
                    </div>
                    <div className='flex items-center gap-2'>
                        <FaMapMarkerAlt className='text-2xl text-[#AB1C49]'/>
                        <span className='text-lg text-gray-600'>abc plot, Gurugram, Haryana</span>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <Link className='text-3xl font-normal text-[#316FF6] transition duration-200 ease-in'><FaFacebook/></Link>
                    <Link className='w-[30px] h-[30px] transition duration-200 ease-in '><img src={InstargramImg} className='w-full h-full'/></Link>
                    <Link className='text-3xl font-normal text-[#1DA1F2] transition duration-200 ease-in'><FaTwitter/></Link>
                    <Link className='text-3xl font-normal text-[#FF0000] transition duration-200 ease-in'><FaYoutube/></Link>
                </div>
            </div>
            <div className='flex justify-center items-start gap-44 max-md:w-full max-md:justify-between max-md:gap-0 max-md:px-8 max-sm:px-0'>
                <div className='flex flex-col items-start gap-4'>
                    <h3 className='text-base font-bold text-black'>Know About Us</h3>
                    <div className='flex flex-col gap-2'>
                        <Link to={'/about-us'} className='text-sm font-normal text-gray-400 transition duration-200 ease-in hover:text-[#AB1C49]'>About Us</Link>
                        <Link className='text-sm font-normal text-gray-400 transition duration-200 ease-in hover:text-[#AB1C49]'>DJs</Link>
                        <Link className='text-sm font-normal text-gray-400 transition duration-200 ease-in hover:text-[#AB1C49]'>Decoration</Link>
                        <Link className='text-sm font-normal text-gray-400 transition duration-200 ease-in hover:text-[#AB1C49]'>Photos</Link>
                        <Link className='text-sm font-normal text-gray-400 transition duration-200 ease-in hover:text-[#AB1C49]'>Events</Link>
                        <Link className='text-sm font-normal text-gray-400 transition duration-200 ease-in hover:text-[#AB1C49]'>Audio Visiual</Link>
                        <Link className='text-sm font-normal text-gray-400 transition duration-200 ease-in hover:text-[#AB1C49]'>Blogs</Link>
                        <Link className='text-sm font-normal text-gray-400 transition duration-200 ease-in hover:text-[#AB1C49]'>E-Invites</Link>
                    </div>
                </div>

                <div className='flex flex-col items-start gap-6'>
                    <div className='flex flex-col items-start gap-2'>
                        <h3 className='text-base font-bold text-black'>Contact US</h3>
                        <div className='flex flex-col gap-2'>
                            <Link className='text-sm font-normal text-gray-400 transition duration-200 ease-in hover:text-[#AB1C49]'>Contact form</Link>
                            <Link className='text-sm font-normal text-gray-400 transition duration-200 ease-in hover:text-[#AB1C49]'>Book an apoiment</Link>
                        </div>
                    </div>
                    <div className='flex flex-col items-start gap-2'>
                        <h3 className='text-base font-bold text-black'>You need to know</h3>
                        <div className='flex flex-col gap-2'>
                            <Link className='text-sm font-normal text-gray-400 transition duration-200 ease-in hover:text-[#AB1C49]'>Terms & Conditions</Link>
                            <Link className='text-sm font-normal text-gray-400 transition duration-200 ease-in hover:text-[#AB1C49]'>Privacy Policy</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className='w-full flex justify-center items-center text-center border-t border-gray-400 pt-4 text-base font-normal text-gray-500'>
            © Copyright 2024 Videek Events - All Rights Reserved
        </div>
    </div>
  )
}

export default Footer