import React, { useEffect, useState } from 'react'
import Header from '../components/section/Header'
import Navbar from '../components/section/Navbar'
import Footer from '../components/section/Footer'
import { FcInvite } from "react-icons/fc";
import { Link, useLocation } from 'react-router-dom';
import DisplayAllEInvites from '../components/e-invites/DisplayAllEInvites';
import DisplaySavedInvites from '../components/e-invites/DisplaySavedInvites'

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

        <div className='w-full flex flex-col p-8 gap-4 max-md:p-6 max-sm:p-4'>
            <div className='w-full flex justify-between items-centerl'>
                <div className='flex items-center gap-2'>
                    <h3 className='text-xl text-gray-500 font-semibold max-md:text-lg max-sm:text-base'>Choose Wedding E-Invites Template</h3>
                </div>
                <div className='flex max-sm:hidden'>
                    <button className='border py-1 px-2 flex justify-center items-center gap-1 text-sm rounded border-gray-400 text-gray-400 hover:bg-red-100 max-sm:text-sm'><FcInvite className='text-lg max-sm:text-base'/> Your Cards</button>
                </div>
            </div>

            <div className='w-full flex gap-4 items-center max-sm:gap-2 max-sm:justify-between'>
                <Link
                    to={`/wedding-invitations/wedding-card-designs`}
                    className={`text-base max-sm:text-sm pb-2 font-medium border-b-[3px] ${currentTab === 'wedding-card-designs' ? 'text-[#AB1C49] border-[#AB1C49]' : 'border-transparent text-gray-500'}`}
                >Wedding Card Designs</Link>
                <Link
                    to={`/wedding-invitations/save-the-templates`}
                    className={`text-base max-sm:text-sm pb-2 font-medium border-b-[3px] ${currentTab === 'save-the-templates' ? 'text-[#AB1C49] border-[#AB1C49]' : 'border-transparent text-gray-500'}`}
                >Save the templates</Link>
            </div>

            <div className='w-full'>
                {currentTab === 'wedding-card-designs' && (<DisplayAllEInvites/>)}
                {currentTab === 'save-the-templates' && (<DisplaySavedInvites/>)}
            </div>
        </div>

        <Footer/>
    </div>
  )
}

export default Invitations