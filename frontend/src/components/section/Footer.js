import React, { useContext } from "react";
import Logo from "../navbar/Logo";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AppContext } from "../../context/AppContext";
import { GrInstagram } from "react-icons/gr";

const Footer = () => {
  const { setTab, webData } = useContext(AppContext);

  return (
    <div className="w-full flex flex-col p-8 max-sm:p-4 gap-4 bg-[#AB1C49]">
      <div className="w-full flex justify-between items-start max-md:flex-col max-md:gap-8">
        <div className="w-[500px] flex flex-col items-start gap-6 max-sm:w-full max-sm:gap-4">
          <Logo />
          <div className="flex flex-col justify-start gap-4">
            <div className="flex items-center gap-2">
              <FaPhone className="text-xl text-white" />
              <Link to={`tel:+91${webData?.phone}`} className="text-lg text-white">
                {`+91 ${webData?.phone}`}
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <IoIosMail className="text-2xl text-white" />
              <Link
                to={`mailto:${webData?.email}`}
                className="text-lg text-white"
              >
                {webData?.email}
              </Link>
            </div>
            <div className="flex justify-start items-center gap-2">
              <FaMapMarkerAlt className="text-3xl text-white" />
              <span className="pl-2 text-base text-white">
                {webData?.address}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to={webData?.fb_url} className="text-3xl font-normal text-gray-200 transition duration-200 ease-in">
              <FaFacebook />
            </Link>
            <Link to={webData?.ins_url} className="text-3xl font-normal text-gray-200 transition duration-200 ease-in ">
              <GrInstagram/>
            </Link>
            <Link to={webData?.twi_url} className="text-3xl font-normal text-gray-200 transition duration-200 ease-in">
              <FaTwitter />
            </Link>
            <Link to={webData?.yt_url} className="text-3xl font-normal text-gray-200 transition duration-200 ease-in">
              <FaYoutube />
            </Link>
          </div>
        </div>
        <div className="flex justify-center items-start gap-44 max-md:w-full max-md:justify-between max-md:gap-0 max-md:px-8 max-sm:px-0">
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-base font-bold text-[#411530]">Our Services</h3>
            <div className="flex flex-col gap-2">
              <Link to={'/vendor-category/all'} className="text-sm font-normal text-gray-200 transition duration-200 ease-in hover:text-white">Vendor</Link>
              <Link to={'/venues#all'} className="text-sm font-normal text-gray-200 transition duration-200 ease-in hover:text-white">Venue</Link>
              <div onClick={() => {setTab({isActive: true, name:'dj-event'})}} className="text-sm cursor-pointer font-normal text-gray-200 transition duration-200 ease-in hover:text-white">
                DJs
              </div>
              <div onClick={() => {setTab({isActive: true, name:'decoration'})}} className="text-sm font-normal text-gray-200 cursor-pointer transition duration-200 ease-in hover:text-white">
                Decoration
              </div>
              <div onClick={() => {setTab({isActive: true, name:'photos'})}} className="text-sm font-normal text-gray-200 cursor-pointer transition duration-200 ease-in hover:text-white">
                Photos
              </div>
              <div onClick={() => {setTab({isActive: true, name:'events'})}} className="text-sm font-normal text-gray-200 cursor-pointer transition duration-200 ease-in hover:text-white">
                Events
              </div>
              <div onClick={() => {setTab({isActive: true, name:'audio-visiual'})}} className="text-sm font-normal text-gray-200 cursor-pointer transition duration-200 ease-in hover:text-white">
                Audio Visiual
              </div>
              <div onClick={() => {setTab({isActive: true, name:'blog'})}} className="text-sm font-normal text-gray-200 cursor-pointer transition duration-200 ease-in hover:text-white">
                Blogs
              </div>
              <div onClick={() => {setTab({isActive: true, name:'e-vites'})}} className="text-sm font-normal text-gray-200 cursor-pointer transition duration-200 ease-in hover:text-white">
                E-Invites
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-6">
            <div className="flex flex-col items-start gap-2">
              <h3 className="text-base font-bold text-[#411530]">Contact US</h3>
              <div className="flex flex-col gap-2">
                <Link
                  to={"/contact-us"}
                  className="text-sm font-normal text-gray-200 transition duration-200 ease-in hover:text-white"
                >
                  Contact
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2">
              <h3 className="text-base font-bold text-[#411530]">
                You need to know
              </h3>
              <div className="flex flex-col gap-2">
                <Link
                  to={"/about-us"}
                  className="text-sm font-normal text-gray-200 cursor-pointer transition duration-200 ease-in hover:text-white"
                >
                  About Us
                </Link>
                <Link to={'/terms-conditions'} className="text-sm font-normal text-gray-200 transition duration-200 ease-in hover:text-white">
                  Terms & Conditions
                </Link>
                <Link to={'/privacy'} className="text-sm font-normal text-gray-200 transition duration-200 ease-in hover:text-white">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center items-center gap-2 text-center border-t border-gray-400 pt-4 text-base font-normal text-gray-100">
        © Copyright 2024 {webData?.title} - All Rights Reserved.
        <span>Developed by <Link to={'https://www.neerajprajapati.in/'} target="_blank" className="text-[#333]">Neeraj Prajapati</Link></span>
      </div>
    </div>
  );
};

export default Footer;
