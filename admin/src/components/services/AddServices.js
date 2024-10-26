import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import toast from "react-hot-toast";
import MdLoader from "../spinner/MdLoader";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const AddServices = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [serviceData, setServiceData] = useState({
    category: "",
    subCategory: "",
    name: "",
    title: "",
  });
  const [description, setDescription] = useState("");
  const [servicesImg, setServicesImg] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Simulate category and sub-category data fetching
  const categoryOptions = [
    { label: "DJ Events", value: "DJ Events" },
    { label: "Decoration", value: "Decoration" },
    { label: "Event", value: "Event" },
    { label: "Audio Visiual", value: "Audio Visiual" },
  ];

  const [subCategoryOptions, setSubCategoryOptions] = useState([]);

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

  const handleCategoryChange = (selectedOption) => {
    setServiceData((prevState) => ({
      ...prevState,
      category: selectedOption.value,
    }));
  };

  const handleSubCategoryChange = (selectedOption) => {
    setServiceData((prevState) => ({
      ...prevState,
      subCategory: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!servicesImg) {
      setError("Please upload a service image.");
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("category", serviceData.category);
      formData.append("subCategory", serviceData.subCategory);
      formData.append("name", serviceData.name);
      formData.append("title", serviceData.title);
      formData.append("description", description);
      formData.append("services_img", servicesImg);

      const response = await axios.post(`${baseUrl}/services/add`, formData);
      if (response.data.success) {
        setSuccessMessage("Service added successfully");
        setServiceData({ category: "", subCategory: "", name: "", title: "" });
        setDescription("");
        setServicesImg(null);
        toast.success("Service added successfully");
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

  const getServicesByCategory = async (category) => {
    if (!category) return;
    try {
      const response = await axios.get(
        `${baseUrl}/services-select/${category}`
      );

      if (response.data.success) {
        const formattedSubCategories = response.data.data.map((sub) => ({
          label: sub,
          value: sub,
        }));
        setSubCategoryOptions(formattedSubCategories);
      } else {
        setSubCategoryOptions([]);
      }
    } catch (error) {
      setSubCategoryOptions([]);
    }
  };

  useEffect(() => {
    getServicesByCategory(serviceData.category);
  }, [serviceData.category]);

  return (
    <div className="w-full flex flex-col bg-black p-6 gap-4">
      <h2 className="text-2xl font-bold text-cyan-600">Add New Services</h2>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div className="w-full flex justify-between gap-4">
          {/* Category Select */}
          <div className="w-full flex flex-col gap-1">
            <label className="text-gray-400 text-base font-medium">
              Category:
            </label>
            <Select
              required
              options={categoryOptions}
              onChange={handleCategoryChange}
              value={categoryOptions.find(
                (option) => option.value === serviceData.category
              )}
              placeholder="Choose Category"
              className="w-full h-[45px]"
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: "#111",
                  borderColor: "#333",
                  color: "white",
                }),
                menu: (provided) => ({
                  ...provided,
                  backgroundColor: "#222",
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isFocused ? "#444" : "#222",
                  color: "white",
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: "white",
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: "#555",
                }),
              }}
            />
          </div>
          {/* Sub-Category with Creatable Select */}
          <div className="w-full flex flex-col gap-1">
            <label className="text-gray-400 text-base font-medium">
              Sub-Category:
            </label>
            <CreatableSelect
              isClearable
              options={subCategoryOptions}
              onChange={handleSubCategoryChange}
              value={subCategoryOptions.find(
                (option) => option.value === serviceData.subCategory
              )}
              placeholder="Create or choose one"
              className="w-full"
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: "#111",
                  borderColor: "#333",
                  color: "white",
                }),
                menu: (provided) => ({
                  ...provided,
                  backgroundColor: "#222",
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isFocused ? "#444" : "#222",
                  color: "white",
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: "white",
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: "#555",
                }),
              }}
            />
          </div>
        </div>

        {/* Name and Title Inputs */}
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

        {/* Service Image Input */}
        <div className="w-full flex justify-start items-end gap-4">
          <div className="w-full flex flex-col gap-1">
            <label className="text-gray-400 text-base font-medium">
              Service Image:
            </label>
            <input
              type="file"
              name="services_img"
              onChange={handleFileChange}
              accept="image/*"
              required
              className="w-full placeholder:text-gray-700 py-2 px-4 bg-[#111] border-2 border-[#333] border-dashed outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
            />
          </div>
          <div className="w-full flex gap-1">
            <button
              type="submit"
              className="h-[45px] w-[200px] rounded-sm flex justify-center items-center py-2 px-4 border-none outline-none text-lg text-white bg-cyan-600 transition duration-200 ease-in hover:bg-cyan-800"
            >
              {isLoading ? <MdLoader /> : "Add Service"}
            </button>
          </div>
        </div>

        {/* Error and Success Messages */}
        {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
        {successMessage && (
          <p className="text-sm font-semibold text-green-600">
            {successMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default AddServices;
