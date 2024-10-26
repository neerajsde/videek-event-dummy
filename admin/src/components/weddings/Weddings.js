import React, { useState } from "react";
import { IoHome } from "react-icons/io5";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import DisplayWeddings from "./DisplayWeddings";
import AddWeddings from "./AddWeddings";
import EditWeddings from "./EditWeddings";
import DeleteWeddings from "./DeleteWeddings";

const Weddings = () => {
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
          <IoHome className="text-xl" /> Weddings
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
            <MdFormatListBulletedAdd className="text-xl" /> Add
          </button>
          <button
            onClick={() => setCurrentSection("edit")}
            className={`text-base font-semibold flex justify-center items-center gap-1 py-2 px-3 border text-blue-600 border-blue-600 rounded-md transition duration-200 ease-in ${
              currentSection === "edit"
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-600 hover:text-white"
            }`}
          >
            <MdEdit className="text-xl" /> Edit
          </button>
          <button
            onClick={() => setCurrentSection("remove")}
            className={`text-base font-semibold flex justify-center items-center gap-1 py-2 px-3 border text-red-600 border-red-600 rounded-md transition duration-200 ease-in ${
              currentSection === "remove"
                ? "bg-red-600 text-white"
                : "hover:bg-red-600 hover:text-white"
            }`}
          >
            <MdDelete className="text-xl" /> Delete
          </button>
        </div>
      </div>
      <div className="w-full bg-[#111] rounded-sm !border !border-[#333]">
        {currentSection === "/" && <DisplayWeddings />}
        {currentSection === "add" && <AddWeddings />}
        {currentSection === "edit" && <EditWeddings />}
        {currentSection === "remove" && <DeleteWeddings />}
      </div>
    </div>
  );
};

export default Weddings;