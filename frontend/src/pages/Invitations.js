import React, { useEffect, useState } from 'react'
import Header from '../components/section/Header'
import Navbar from '../components/section/Navbar'
import Footer from '../components/section/Footer'
import { FcInvite } from "react-icons/fc";
import { Link, useLocation } from 'react-router-dom';


const Invitations = () => {
    const location = useLocation();
    const [currentTab, setCurrectTab] = useState('wedding-card-designs');

    useEffect(() => {
        setCurrectTab(location.pathname.split('/').at(-1));
    },[location.pathname]);

    const scrollToDiv = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };
    
    useEffect(() => {
        document.title = "E-Invites"
        scrollToDiv("invitaions");
    }, []);
    
  return (
    <div id='invitaions' className='w-full flex flex-col'>
        <Header/>
        <Navbar/>

        <div className='w-full flex flex-col p-8 gap-4'>
            <div className='w-full flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                    <h3 className='text-xl text-gray-500 font-semibold'>Wedding Cards</h3>
                    <span className='flex items-center gap-1 text-base text-gray-400'><span>190</span> Items</span>
                </div>
                <div className='flex'>
                    <button className='border py-1 px-2 flex justify-center items-center gap-1 text-sm rounded border-gray-400 text-gray-400 hover:bg-red-100'><FcInvite className='text-lg'/> Your Cards</button>
                </div>
            </div>

            <div className='w-full flex gap-4 items-center'>
                <Link
                    to={`/wedding-invitations/wedding-card-designs`}
                    className={`text-base pb-2 font-medium border-b-[3px] ${currentTab === 'wedding-card-designs' ? 'text-[#AB1C49] border-[#AB1C49]' : 'border-transparent text-gray-500'}`}
                >Wedding Card Designs</Link>
                <Link
                    to={`/wedding-invitations/invitaion-video-templates`}
                    className={`text-base pb-2 font-medium border-b-[3px] ${currentTab === 'invitaion-video-templates' ? 'text-[#AB1C49] border-[#AB1C49]' : 'border-transparent text-gray-500'}`}
                >Video Templates</Link>
                <Link
                    to={`/wedding-invitations/save-the-date-templates`}
                    className={`text-base pb-2 font-medium border-b-[3px] ${currentTab === 'save-the-date-templates' ? 'text-[#AB1C49] border-[#AB1C49]' : 'border-transparent text-gray-500'}`}
                >Save the Date Templates</Link>
            </div>

            <div className='w-full flex border border-gray-300 shadow p-4'>We'll Update Soon</div>
        </div>

        <Footer/>
    </div>
  )
}

export default Invitations