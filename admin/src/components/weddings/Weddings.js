import React, { useContext, useEffect, useState } from "react";
import { IoHome } from "react-icons/io5";
import { MdFormatListBulletedAdd } from "react-icons/md";
import DisplayWeddings from "./DisplayWeddings";
import AddWeddings from "./AddWeddings";
import { AppContext } from "../../context/AppContext";
import { MdClose } from "react-icons/md";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import MdLoader from "../spinner/MdLoader";
import toast from "react-hot-toast";
import axios from "axios";

const Weddings = () => {
  const [currentSection, setCurrentSection] = useState("/");
  const { editWedding, setEditWedding } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    title: "",
    location: "",
    date: "",
  });
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState("");
  const [weddingImages, setWeddingImages] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (editWedding.isActive && editWedding.data) {
      setFormData({
        category: editWedding.data.category,
        name: editWedding.data.couple_name,
        title: editWedding.data.title,
        date: editWedding.data.date,
        location: editWedding.data.location,
      });
      const tags = editWedding.data.taggedVendor.map((vendor) => {
        return vendor.name;
      });
      setTags(tags);
      setDescription(editWedding.data.description);
    }
  }, [editWedding]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      const inputValue = e.target.value || e.target.previousSibling.value;
      if (inputValue.trim() && !tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
        e.target.value = ""; // Clear the input
      }
    }
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // Convert FileList to array

    // Validate file types (e.g., ensure all are images)
    const validFiles = selectedFiles.filter((file) =>
      ["image/jpeg", "image/png", "image/jpg"].includes(file.type)
    );

    // Check if valid files exist
    if (validFiles.length === 0) {
      alert("Please select valid image files (JPEG, PNG, JPG).");
      return;
    }
    setWeddingImages(validFiles);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const uploadImg = async (index, ids) => {
    try {
      const formXData = new FormData();
      formXData.append("id", ids);
      formXData.append("img", weddingImages[index]);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/wedding/img-upload`,
        formXData
      );

      if (response.data.success) {
        return "success";
      } else {
        return "error";
      }
    } catch (error) {
      return "something went wrong";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      setIsLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append("WeddingId", editWedding.data._id);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("date", formData.date);
      formDataToSend.append("description", description);
      formDataToSend.append("tags", JSON.stringify(tags));

      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/wedding/update`,
        formDataToSend
      );
      if (response.data.success) {
        if(weddingImages && weddingImages.length > 0){
          const id = editWedding.data._id;
          // Upload images
          for (let index = 0; index < weddingImages.length; index++) {
            const res = await uploadImg(index, id);

            if (res !== "success") {
              toast.error(
                `Error uploading image ${index + 1}. Please try again.`
              );
              setError(`Error uploading image ${index + 1}`);
              return;
            }
          }
        }
        setSuccessMessage(response.data.message);
        toast.success(response.data.message);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Internal Server Error. Please try again later.");
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (editWedding.isActive) {
    return (
      <div className="w-full flex flex-col gap-4 border p-4 border-[#333]">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-xl font-semibold text-teal-600">{`Update Real Wedding:  couple name - ${editWedding.data.couple_name}`}</h2>
          <MdClose
            onClick={() => setEditWedding({ isActive: false, data: null })}
            className="text-4xl text-red-600 cursor-pointer"
          />
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 ">
          <div className="w-full flex justify-between gap-4">
            <div className="w-full flex flex-col gap-1">
              <label className="text-gray-400 text-base font-medium">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                placeholder="Sub Tab Name"
                className="w-full py-2 px-4 bg-[#111] border placeholder:text-gray-700 border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <label className="text-gray-400 text-base font-medium">
                upload images:
              </label>
              <input
                type="file"
                name="images"
                onChange={handleFileChange}
                accept="image/*"
                multiple
                className="w-full h-[45px] placeholder:text-gray-700 py-1 px-2 bg-[#111] border-2 border-[#333] border-dashed outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
              />
            </div>
          </div>

          <div className="w-full flex justify-between gap-4">
            <div className="w-full flex flex-col gap-1">
              <label className="text-gray-400 text-base font-medium">
                Couple Name:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Wedding name"
                className="w-full py-2 px-4 bg-[#111] border placeholder:text-gray-700 border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
              />
            </div>

            <div className="w-full flex flex-col gap-1">
              <label className="text-gray-400 text-base font-medium">
                Date
              </label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="w-full py-2 px-4 bg-[#111] border placeholder:text-gray-700 border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
              />
            </div>
          </div>

          <div className="w-full flex justify-between gap-4">
            <div className="w-full flex flex-col gap-1">
              <label className="text-gray-400 text-base font-medium">
                Location:
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                placeholder="Wedding name"
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
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Write a title"
                className="w-full py-2 px-4 bg-[#111] placeholder:text-gray-700 border border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-1">
            <label className="text-gray-400 text-base font-medium">
              Tag New Vendors:
            </label>
            <div className="w-full flex justify-start items-center gap-2">
              <input
                type="text"
                name="tagInput"
                placeholder="Add a vendor name"
                className="w-[50%] flex py-2 px-4 bg-[#111] border border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                onKeyDown={handleAddTag}
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="py-2 px-4 bg-green-600 text-white rounded-sm"
              >
                Add
              </button>
            </div>
            <div className="w-full flex items-center gap-2 flex-wrap">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="bg-blue-600 text-white px-3 py-1 rounded-md flex items-center gap-2"
                >
                  {tag}
                  <MdClose
                    onClick={() => handleRemoveTag(index)}
                    className="cursor-pointer text-red-600"
                  />
                </div>
              ))}
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
            {error && (
              <p className="text-sm font-semibold text-red-600">{error}</p>
            )}
            {successMessage && (
              <p className="text-sm font-semibold text-green-600">
                {successMessage}
              </p>
            )}
          </div>
        </form>
      </div>
    );
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
        </div>
      </div>
      <div className="w-full bg-[#111] rounded-sm !border !border-[#333]">
        {currentSection === "/" && <DisplayWeddings />}
        {currentSection === "add" && <AddWeddings />}
      </div>
    </div>
  );
};

export default Weddings;
