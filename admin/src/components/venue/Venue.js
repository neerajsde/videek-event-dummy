import React, { useState } from "react";
import { IoHome } from "react-icons/io5";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import UpdateVenue from "./UpdateVenue";
import DisplayVenue from "./DisplayVenue";
import AddVenue from "./AddVenue";
import VenueFAQs from './VenueFAQs';
import { FaQuestion } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";
import VenueImages from "./VenueImages";

const Venue = () => {
  const [currentSection, setCurrentSection] = useState("/");
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex items-center justify-between bg-[#111] p-3 rounded-sm !border !border-[#333]">
        <button
          onClick={() => setCurrentSection("/")}
          className={`text-base font-semibold cursor-pointer flex justify-center items-center gap-1 py-2 px-3 border-1 border-gray-300 rounded-md transition duration-200 ease-in ${
            currentSection === "/"
              ? "bg-white text-black"
              : "hover:bg-gray-200 hover:text-black"
          }`}
        >
          <IoHome className="text-xl" /> All Venue
        </button>
  
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setCurrentSection("add")}
            className={`text-base font-semibold flex justify-center items-center gap-1 py-2 px-3 border text-blue-600 border-blue-600 rounded-md transition duration-200 ease-in ${
              currentSection === "add"
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-600 hover:text-white"
            }`}
          >
            <MdFormatListBulletedAdd className="text-xl" /> Add Venue
          </button>
          <button
            onClick={() => setCurrentSection("edit")}
            className={`text-base font-semibold flex justify-center items-center gap-1 py-2 px-3 border text-blue-600 border-blue-600 rounded-md transition duration-200 ease-in ${
              currentSection === "edit"
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-600 hover:text-white"
            }`}
          >
            <MdEdit className="text-xl" /> Update Details
          </button>
          <button
            onClick={() => setCurrentSection("faqs")}
            className={`text-base font-semibold flex justify-center items-center gap-1 py-2 px-3 border text-blue-600 border-blue-600 rounded-md transition duration-200 ease-in ${
              currentSection === "faqs"
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-600 hover:text-white"
            }`}
          >
            <FaQuestion className="text-xl" /> FAQs
          </button>
          
          <button
            onClick={() => setCurrentSection("albums")}
            className={`text-base font-semibold flex justify-center items-center gap-1 py-2 px-3 border text-blue-600 border-blue-600 rounded-md transition duration-200 ease-in ${
              currentSection === "albums"
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-600 hover:text-white"
            }`}
          >
            <CiImageOn className="text-xl" /> Add Albums
          </button>
        </div>
      </div>
      <div className="w-full bg-[#111] rounded-sm !border !border-[#333]">
        {currentSection === "/" && <DisplayVenue />}
        {currentSection === "add" && <AddVenue />}
        {currentSection === "faqs" && <VenueFAQs />}
        {currentSection === "albums" && <VenueImages />}
        {currentSection === "edit" && <UpdateVenue />}
      </div>
    </div>
  );
};

export default Venue;