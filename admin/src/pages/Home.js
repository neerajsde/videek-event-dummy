import React, { useContext, useEffect, useState } from "react";
import { RiContactsBook3Line } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSitemap } from "react-icons/fa6";
import MainPage from "../components/common-com/MainPage";
import Services from "../components/services/Services";
import Contact from "../components/contact/Contact";
import Blog from "../components/blog/Blog";
import Vendor from "../components/vendor/Vendor";
import { MdChromeReaderMode } from "react-icons/md";
import { RiAlignItemHorizontalCenterFill } from "react-icons/ri";
import { TbTimelineEventMinus } from "react-icons/tb";
import { GrGallery } from "react-icons/gr";
import Weddings from "../components/weddings/Weddings";
import Testimonal from "../components/testimonials/Testimonal";
import { GoPeople } from "react-icons/go";
import { RiHotelFill } from "react-icons/ri";
import Venue from "../components/venue/Venue";
import GeneralSettings from "../components/GeneralSettings";
import { IoMdSettings } from "react-icons/io";
import EInvitesCard from "../components/e-invites/EInvitesCard";
import { TbGiftCardFilled } from "react-icons/tb";
import { MdDashboard } from "react-icons/md";
import Navbar from "../components/Navbar";
import AskConformation from "../components/AskConformation";
import UploadGallery from "../components/gallery/UploadGallery";
import ViewContacts from "../components/contact/ViewContacts";
import User from "../components/users/User";
import { FaUsers } from "react-icons/fa";

const Home = () => {
  const { setIsLoggedIn, isActiveConformation, viewContactUs } = useContext(AppContext);
  const [currentSection, setCurrentSection] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.document.title = "Admin-Dashboard";
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("VideekAdmin");
    setIsLoggedIn(false);
    navigate("/");
    toast.error("Log Out Successfully");
  };

  useEffect(() => {
    if(location.hash){
      setCurrentSection(location.hash.replace('#',''));
    }
  },[location.hash])

  return (
    <div className="w-full h-full flex flex-col bg-black relative">
      <Navbar/>

      {isActiveConformation.isActive && (
        <div className="w-full min-h-screen fixed top-0 left-0 bg-[#00000038] backdrop-blur z-[10] flex justify-center items-center"><AskConformation/></div>
      )}

      {viewContactUs.isActive && (
        <div className="w-full min-h-screen fixed top-0 left-0 bg-[#00000038] backdrop-blur z-[10] flex justify-center items-center"><ViewContacts/></div>
      )}

      <div className="w-full flex justify-start items-start">
        <div className="w-[300px] h-screen sticky top-0 flex flex-col items-center justify-start bg-[#111] border-r border-t border-[#222]">
          <Link 
            to='#home'
            onClick={() => setCurrentSection("home")}
            className={`w-full py-2 flex justify-start px-4 items-center gap-4 text-gray-400 text-lg font-semibold transition duration-300 ease-in-out ${currentSection === 'home' ? 'bg-[#222] text-white': 'hover:bg-[#000] hover:text-white'}`}
          >
            <MdDashboard className="text-xl" /> Dashboard
          </Link>
          <Link 
            to='#users'
            onClick={() => setCurrentSection("users")}
            className={`w-full py-2 flex justify-start px-4 items-center gap-4 text-gray-400 text-lg font-semibold transition duration-300 ease-in-out ${currentSection === 'users' ? 'bg-[#222] text-white': 'hover:bg-[#000] hover:text-white'}`}
          >
            <FaUsers className="text-xl" /> Users
          </Link>
          <Link 
            to='#settings'
            onClick={() => setCurrentSection("settings")}
            className={`w-full py-2 flex justify-start px-4 items-center gap-4 text-gray-400 text-lg font-semibold transition duration-300 ease-in-out ${currentSection === 'settings' ? 'bg-[#222] text-white': 'hover:bg-[#000] hover:text-white'}`}
          >
            <IoMdSettings className="text-xl" /> General Settings
          </Link>
          <Link 
            to='#services'
            onClick={() => setCurrentSection("services")}
            className={`w-full py-2 flex justify-start px-4 items-center gap-4 text-gray-400 text-lg font-semibold transition duration-300 ease-in-out ${currentSection === 'services' ? 'bg-[#222] text-white': 'hover:bg-[#000] hover:text-white'}`}
          >
            <FaSitemap className="text-xl" /> Services
          </Link>
          <Link
            to='#blog'
            onClick={() => setCurrentSection("blog")}
            className={`w-full py-2 flex justify-start px-4 items-center gap-4 text-gray-400 text-lg font-semibold transition duration-300 ease-in-out ${currentSection === 'blog' ? 'bg-[#222] text-white': 'hover:bg-[#000] hover:text-white'}`}
          >
            <MdChromeReaderMode className="text-xl" /> Blogs
          </Link>

          <Link
            to='#vendor'
            onClick={() => setCurrentSection("vendor")}
            className={`w-full py-2 flex justify-start px-4 items-center gap-4 text-gray-400 text-lg font-semibold transition duration-300 ease-in-out ${currentSection === 'vendor' ? 'bg-[#222] text-white': 'hover:bg-[#000] hover:text-white'}`}
          >
            <RiAlignItemHorizontalCenterFill className="text-xl" /> Vendor
          </Link>

          <Link
            to='#venue'
            onClick={() => setCurrentSection("venue")}
            className={`w-full py-2 flex justify-start px-4 items-center gap-4 text-gray-400 text-lg font-semibold transition duration-300 ease-in-out ${currentSection === 'venue' ? 'bg-[#222] text-white': 'hover:bg-[#000] hover:text-white'}`}
          >
            <RiHotelFill className="text-xl" /> Venue
          </Link>

          <Link
            to='#gallery'
            onClick={() => setCurrentSection("gallery")}
            className={`w-full py-2 flex justify-start px-4 items-center gap-4 text-gray-400 text-lg font-semibold transition duration-300 ease-in-out ${currentSection === 'gallery' ? 'bg-[#222] text-white': 'hover:bg-[#000] hover:text-white'}`}
          >
            <GrGallery className="text-xl" /> Gallery
          </Link>

          <Link
            to='#weddings'
            onClick={() => setCurrentSection("weddings")}
            className={`w-full py-2 flex justify-start px-4 items-center gap-4 text-gray-400 text-lg font-semibold transition duration-300 ease-in-out ${currentSection === 'weddings' ? 'bg-[#222] text-white': 'hover:bg-[#000] hover:text-white'}`}
          >
            <TbTimelineEventMinus className="text-xl" /> Weddings
          </Link>

          <Link
            to='#testimonals'
            onClick={() => setCurrentSection("testimonals")}
            className={`w-full py-2 flex justify-start px-4 items-center gap-4 text-gray-400 text-lg font-semibold transition duration-300 ease-in-out ${currentSection === 'testimonals' ? 'bg-[#222] text-white': 'hover:bg-[#000] hover:text-white'}`}
          >
            <GoPeople className="text-xl" /> Testimonials
          </Link>

          <Link
            to='#contact'
            onClick={() => setCurrentSection("contact")}
            className={`w-full py-2 flex justify-start px-4 items-center gap-4 text-gray-400 text-lg font-semibold transition duration-300 ease-in-out ${currentSection === 'contact' ? 'bg-[#222] text-white': 'hover:bg-[#000] hover:text-white'}`}
          >
            <RiContactsBook3Line className="text-xl" /> Contacts
          </Link>
          <Link
            to='#e-invites'
            onClick={() => setCurrentSection("e-invites")}
            className={`w-full py-2 flex justify-start px-4 items-center gap-4 text-gray-400 text-lg font-semibold transition duration-300 ease-in-out ${currentSection === 'e-invites' ? 'bg-[#222] text-white': 'hover:bg-[#000] hover:text-white'}`}
          >
            <TbGiftCardFilled className="text-xl" /> E-Invites Card
          </Link>
          <button
            onClick={handleLogout}
            className="w-full py-2 flex justify-start px-4 items-center gap-4 text-red-400 text-lg font-semibold transition duration-300 ease-in-out hover:bg-[#000] hover:text-red-500"
          >
            <TbLogout className="text-xl text-red-600" /> LogOut
          </button>
        </div>

        <div className="w-full flex justify-start items-start text-white p-4">
          {currentSection === "home" && <MainPage/>}
          {currentSection === "users" && <User/>}
          {currentSection === "settings" && <GeneralSettings/>}
          {currentSection === "services" && <Services/>}
          {currentSection === "blog" && <Blog/>}
          {currentSection === "gallery" && <UploadGallery/>}
          {currentSection === "weddings" && <Weddings/>}
          {currentSection === "vendor" && <Vendor/>}
          {currentSection === "venue" && <Venue/>}
          {currentSection === "testimonals" && <Testimonal/>}
          {currentSection === "e-invites" && <EInvitesCard/>}
          {currentSection === "contact" && <Contact/>}
        </div>
      </div>
    </div>
  );
};

export default Home;