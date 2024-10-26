import React, { useContext, useEffect, useState } from "react";
import { FiBarChart2 } from "react-icons/fi";
import { TbLogout } from "react-icons/tb";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { FaSitemap } from "react-icons/fa6";
import { FaQuestionCircle } from "react-icons/fa";
import MainPage from "../components/home/MainPage";
import FAQs from "../components/FAQs/FAQs";
import Reviews from "../components/reviews/Reviews";
import Logo from "../assets/logo.png";
import { IoMdNotifications } from "react-icons/io";
import Album from "../components/album/Album";
import { MdPhotoAlbum } from "react-icons/md";


const Home = () => {
  const { setIsLoggedIn, adminData } = useContext(AppContext);
  const [currentSection, setCurrentSection] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    window.document.title = "Vendor Dashboard";
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("VideekVendor");
    setIsLoggedIn(false);
    navigate("/");
    toast.error("Log Out Successfully");
  };

  return (
    <div className="w-full h-full flex flex-col bg-black">
      <div className="w-full flex justify-between items-center py-3 px-8 bg-[#111]">
        <img src={Logo} alt="LOGO" className="w-[150px] max-lg:w-[100px]" />

        <div className="flex items-center text-white gap-2">
          <IoMdNotifications className="text-3xl" />
          {adminData && (
            <div className="w-[40px] h-[40px] flex justify-center items-center border-2 border-yellow-600 rounded-full">
              <img
                src={ adminData.user_img === '' ? `https://api.dicebear.com/5.x/initials/svg?seed=${adminData.name}` : `${process.env.REACT_APP_BASE_URL}${adminData.user_img}`}
                alt={adminData.name}
                className="rounded-full w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex justify-start items-start">
        <div className="w-[300px] h-screen sticky top-0 flex flex-col items-center justify-start bg-[#111] border-r border-t border-[#222]">
          <button
            onClick={() => setCurrentSection("dashboard")}
            className={`w-full py-2 flex justify-center items-center gap-2 text-gray-400 text-lg font-semibold transition duration-300 ease-in-out ${
              currentSection === "dashboard"
                ? "bg-[#222] text-white"
                : "hover:bg-[#000] hover:text-white"
            }`}
          >
            <FiBarChart2 className="text-xl text-blue-600" /> Dashboard
          </button>

          <button
            onClick={() => setCurrentSection("album")}
            className={`w-full py-2 flex justify-start px-4 items-center gap-4 text-gray-400 text-lg font-semibold transition duration-300 ease-in-out ${
              currentSection === "album"
                ? "bg-[#222] text-white"
                : "hover:bg-[#000] hover:text-white"
            }`}
          >
            <MdPhotoAlbum className="text-xl" /> Album
          </button>

          <button
            onClick={() => setCurrentSection("faqs")}
            className={`w-full py-2 flex justify-start px-4 items-center gap-4 text-gray-400 text-lg font-semibold transition duration-300 ease-in-out ${
              currentSection === "faqs"
                ? "bg-[#222] text-white"
                : "hover:bg-[#000] hover:text-white"
            }`}
          >
            <FaQuestionCircle className="text-xl" /> FAQs
          </button>

          <button
            onClick={() => setCurrentSection("reviews")}
            className={`w-full py-2 flex justify-start px-4 items-center gap-4 text-gray-400 text-lg font-semibold transition duration-300 ease-in-out ${
              currentSection === "reviews"
                ? "bg-[#222] text-white"
                : "hover:bg-[#000] hover:text-white"
            }`}
          >
            <FaSitemap className="text-xl" /> Reviews
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-2 flex justify-start px-4 items-center gap-4 text-red-400 text-lg font-semibold transition duration-300 ease-in-out hover:bg-[#000] hover:text-red-500"
          >
            <TbLogout className="text-xl text-red-600" /> LogOut
          </button>
        </div>

        <div className="w-full flex justify-start items-start text-white p-4">
          {currentSection === "dashboard" && <MainPage />}
          {currentSection === "album" && <Album />}
          {currentSection === "faqs" && <FAQs />}
          {currentSection === "reviews" && <Reviews />}
        </div>
      </div>
    </div>
  );
};

export default Home;
