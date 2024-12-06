import React, { useContext, useEffect, useState } from "react";
import { IoHome } from "react-icons/io5";
import { MdFormatListBulletedAdd } from "react-icons/md";
import DisplayAll from "./DisplayAll";
import AddServices from "./AddServices";
import { AppContext } from "../../context/AppContext";
import { MdClose } from "react-icons/md";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import MdLoader from "../spinner/MdLoader";
import toast from "react-hot-toast";
import axios from 'axios'

const Services = () => {
  const [currentSection, setCurrentSection] = useState("/");
  const {editServices, setEditServices} = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [serviceData, setServiceData] = useState({
    subCategory: "",
    name: "",
    title: "",
  });
  const [description, setDescription] = useState("");
  const [servicesImg, setServicesImg] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if(editServices.isActive && editServices.data){
      setServiceData({
        subCategory: editServices.data.subCategory,
        name: editServices.data.name,
        title: editServices.data.title,
      });
      setDescription(editServices.data.description);
    }
  },[editServices])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServiceData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setServicesImg(e.target.files[0]);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("serviceId", editServices.data._id);
      formData.append("subCategory", serviceData.subCategory);
      formData.append("name", serviceData.name);
      formData.append("title", serviceData.title);
      formData.append("description", description);
      if(servicesImg){
        formData.append("services_img", servicesImg);
      }

      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/services/update`, formData);
      if (response.data.success) {
        setSuccessMessage(response.data.message);
        setEditServices({isActive: false, data: null})
        toast.success(response.data.message);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error(error.message);
      setError("Internal Server Error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  if(editServices.isActive){
    return (
      <div className="w-full flex flex-col gap-4 border p-4 border-[#333]">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-xl font-semibold text-teal-600">{`Update Services: Name - ${editServices.data.name}`}</h2>
          <MdClose onClick={() => setEditServices({isActive: false, data: null})} className="text-4xl text-red-600 cursor-pointer"/>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 ">
          <div className="w-full flex justify-between gap-4">
            <div className="w-full flex flex-col gap-1">
              <label className="text-gray-400 text-base font-medium">Sub Tab Name</label>
              <input
                type="text"
                name="subCategory"
                value={serviceData.subCategory}
                onChange={handleInputChange}
                required
                placeholder="Sub Tab Name"
                className="w-full py-2 px-4 bg-[#111] border placeholder:text-gray-700 border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <label className="text-gray-400 text-base font-medium">
                Service Image:
              </label>
              <input
                type="file"
                name="services_img"
                onChange={handleFileChange}
                accept="image/*"
                className="w-full h-[45px] placeholder:text-gray-700 py-1 px-2 bg-[#111] border-2 border-[#333] border-dashed outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
              />
            </div>
          </div>

          <div className="w-full flex justify-between gap-4">
            <div className="w-full flex flex-col gap-1">
              <label className="text-gray-400 text-base font-medium">Name:</label>
              <input
                type="text"
                name="name"
                value={serviceData.name}
                onChange={handleInputChange}
                required
                placeholder="Service name"
                className="w-full py-2 px-4 bg-[#111] border placeholder:text-gray-700 border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
              />
            </div>

            <div className="w-full flex flex-col gap-1">
              <label className="text-gray-400 text-base font-medium">
                Title:
              </label>
              <input
                type="text"
                name="title"
                value={serviceData.title}
                onChange={handleInputChange}
                required
                placeholder="Write a title"
                className="w-full py-2 px-4 bg-[#111] placeholder:text-gray-700 border border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
              />
            </div>
          </div>

          {/* Description Input */}
          <div className="w-full flex flex-col gap-1">
            <label className="text-gray-400 text-base font-medium">
              Description:
            </label>
            <ReactQuill
              value={description}
              onChange={handleDescriptionChange}
              className="text-white"
            />
          </div>

          <div className="w-full flex justify-start items-center gap-4">
            <div className="flex gap-1">
              <button
                type="submit"
                className="h-[45px] w-[150px] rounded-sm flex justify-center items-center py-2 px-4 border-none outline-none text-lg text-white bg-cyan-600 transition duration-200 ease-in hover:bg-cyan-800"
              >
                {isLoading ? <MdLoader /> : "Save"}
              </button>
            </div>
            {/* Error and Success Messages */}
            {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
            {successMessage && (
              <p className="text-sm font-semibold text-green-600">
                {successMessage}
              </p>
            )}
          </div>
        </form>
      </div>
    )
  }

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
          <IoHome className="text-xl" /> All Services
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
        </div>
      </div>
      <div className="w-full bg-[#111] rounded-sm !border !border-[#333]">
        {currentSection === "/" && <DisplayAll />}
        {currentSection === "add" && <AddServices />}
      </div>
    </div>
  );
};

export default Services;
