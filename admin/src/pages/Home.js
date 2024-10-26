import React, { useContext, useEffect, useState } from "react";
import { FiBarChart2 } from "react-icons/fi";
import { RiContactsBook3Line } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
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
import Gallery from "../components/gallery/Gallery";
import Weddings from "../components/weddings/Weddings";
import Testimonal from "../components/testimonials/Testimonal";
import { GoPeople } from "react-icons/go";

const Home = () => {
  const { setIsLoggedIn } = useContext(AppContext);
  const [currentSection, setCurrentSection] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    window.document.title = "Admin-Dashboard";
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("VideekAdmin");
    setIsLoggedIn(false);
    navigate("/");
    toast.error("Log Out Successfully");
  };

  return (
    <div className="w-full h-full flex flex-col bg-black">

      <div className="w-full flex justify-start items-start">
        <div className="w-[300px] h-screen sticky top-0 flex flex-col items-center justify-start bg-[#111] border-r border-t border-[#222]">
          <button
            onClick={() => setCurrentSection("dashboard")}
            className={`w-full py-2 flex justify-center items-center gap-2 text-gray-400 text-lg font-semibold transition duration-300 ease-in-out ${currentSection === 'dashboard' ? 'bg-[#222] text-white': 'hover:bg-[#000] hover:text-white'}`}
          >
            <FiBarChart2 className="text-xl text-blue-600" /> Dashboard
          </button>
          <button
            onClick={() => setCurrentSection("services")}
            className={`w-full py-2 flex justify-start px-4 items-center gap-4 text-gray-400 text-lg font-semibold transition duration-300 ease-in-out ${currentSection === 'services' ? 'bg-[#222] text-white': 'hover:bg-[#000] hover:text-white'}`}
          >
            <FaSitemap className="text-xl" /> Services
          </button>
          <button
            onClick={() => setCurrentSection("blog")}
            className={`w-full py-2 flex justify-start px-4 items-center gap-4 text-gray-400 text-lg font-semibold transition duration-300 ease-in-out ${currentSection === 'blog' ? 'bg-[#222] text-white': 'hover:bg-[#000] hover:text-white'}`}
          >
            <MdChromeReaderMode className="text-xl" /> Blogs
          </button>

          <button
            onClick={() => setCurrentSection("vendor")}
            className={`w-full py-2 flex justify-start px-4 items-center gap-4 text-gray-400 text-lg font-semibold transition duration-300 ease-in-out ${currentSection === 'vendor' ? 'bg-[#222] text-white': 'hover:bg-[#000] hover:text-white'}`}
          >
            <RiAlignItemHorizontalCenterFill className="text-xl" /> Vendor
          </button>

          <button
            onClick={() => setCurrentSection("gallery")}
            className={`w-full py-2 flex justify-start px-4 items-center gap-4 text-gray-400 text-lg font-semibold transition duration-300 ease-in-out ${currentSection === 'gallery' ? 'bg-[#222] text-white': 'hover:bg-[#000] hover:text-white'}`}
          >
            <GrGallery className="text-xl" /> Gallery
          </button>

          <button
            onClick={() => setCurrentSection("weddings")}
            className={`w-full py-2 flex justify-start px-4 items-center gap-4 text-gray-400 text-lg font-semibold transition duration-300 ease-in-out ${currentSection === 'weddings' ? 'bg-[#222] text-white': 'hover:bg-[#000] hover:text-white'}`}
          >
            <TbTimelineEventMinus className="text-xl" /> Weddings
          </button>

          <button
            onClick={() => setCurrentSection("testimonals")}
            className={`w-full py-2 flex justify-start px-4 items-center gap-4 text-gray-400 text-lg font-semibold transition duration-300 ease-in-out ${currentSection === 'testimonals' ? 'bg-[#222] text-white': 'hover:bg-[#000] hover:text-white'}`}
          >
            <GoPeople className="text-xl" /> Testimonials
          </button>

          <button
            onClick={() => setCurrentSection("contact")}
            className={`w-full py-2 flex justify-start px-4 items-center gap-4 text-gray-400 text-lg font-semibold transition duration-300 ease-in-out ${currentSection === 'contact' ? 'bg-[#222] text-white': 'hover:bg-[#000] hover:text-white'}`}
          >
            <RiContactsBook3Line className="text-xl" /> Contacts
          </button>
          <button
            onClick={handleLogout}
            className="w-full py-2 flex justify-start px-4 items-center gap-4 text-red-400 text-lg font-semibold transition duration-300 ease-in-out hover:bg-[#000] hover:text-red-500"
          >
            <TbLogout className="text-xl text-red-600" /> LogOut
          </button>
        </div>

        <div className="w-full flex justify-start items-start text-white p-4">
          {currentSection === "dashboard" && <MainPage/>}
          {currentSection === "services" && <Services/>}
          {currentSection === "blog" && <Blog/>}
          {currentSection === "gallery" && <Gallery/>}
          {currentSection === "weddings" && <Weddings/>}
          {currentSection === "vendor" && <Vendor/>}
          {currentSection === "testimonals" && <Testimonal/>}
          {currentSection === "contact" && <Contact/>}
        </div>
      </div>
    </div>
  );
};

export default Home;