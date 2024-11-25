import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import toast from "react-hot-toast";
import MdLoader from "../spinner/MdLoader";
import CreatableSelect from "react-select/creatable";

const AddBlog = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [blogData, setblogData] = useState({
    category: "",
    title: "",
  });
  const [description, setDescription] = useState("");
  const [blog_img, setBlog_img] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setblogData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setBlog_img(e.target.files[0]);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleCategoryChange = (selectedOption) => {
    setblogData((prevState) => ({
      ...prevState,
      category: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!blog_img) {
      setError("Please upload a blog image.");
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("category", blogData.category);
      formData.append("title", blogData.title);
      formData.append("description", description);
      formData.append("blog_img", blog_img);

      const response = await axios.post(`${baseUrl}/blog/post`, formData);
      if (response.data.success) {
        setSuccessMessage("Blog uploaded successfully");
        setblogData({ category: "", title: "" });
        setDescription("");
        setBlog_img(null);
        toast.success("Blog uploaded successfully");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Internal Server Error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const getBlogsCategory = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/blog/category`
      );

      if (response.data.success) {
        const formattedSubCategories = response.data.data.map((sub) => ({
          label: sub,
          value: sub,
        }));
        setCategoryOptions(formattedSubCategories);
      } else {
        setCategoryOptions([]); 
      }
    } catch (error) {
      setCategoryOptions([]);
    }
  };

  useEffect(() => {
    getBlogsCategory();
  }, []);

  return (
    <div className="w-full flex flex-col bg-black p-6 gap-4">
      <h2 className="text-2xl font-bold text-cyan-600">Add New Services</h2>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-col gap-1">
          <label className="text-gray-400 text-base font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={blogData.title}
            onChange={handleInputChange}
            required
            placeholder="Write a title"
            className="w-full py-2 px-4 bg-[#111] placeholder:text-gray-700 border border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
          />
        </div>
        <div className="w-full flex justify-between gap-4">
          {/* Category with Creatable Select */}
          <div className="w-full flex flex-col gap-1">
            <label className="text-gray-400 text-base font-medium">
              Blog Category
            </label>
            <CreatableSelect
              isClearable
              options={categoryOptions}
              onChange={handleCategoryChange}
              value={categoryOptions.find(
                (option) => option.value === blogData.category
              )}
              placeholder="Create or choose one"
              className="w-full"
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: "#111",
                  borderColor: "#333",
                  height: '45px',
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

          <div className="w-full flex flex-col gap-1">
            <label className="text-gray-400 text-base font-medium">
              Upload Image
            </label>
            <input
              type="file"
              name="blog_img" 
              onChange={handleFileChange}
              accept="image/*"
              required
              className="w-full placeholder:text-gray-700 py-2 px-4 bg-[#111] border-2 border-[#333] border-dashed outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
            />
          </div>
        </div>

        {/* Description Input */}
        <div className="w-full flex flex-col gap-1">
          <label className="text-gray-400 text-base font-medium">
            Description
          </label>
          <ReactQuill
            value={description}
            onChange={handleDescriptionChange}
            className="text-white"
          />
        </div>

        {/* Service Image Input */}
        <div className="w-full flex justify-start items-end gap-4">
          <div className="w-full flex gap-1">
            <button
              type="submit"
              className="h-[45px] w-[200px] rounded-sm flex justify-center items-center py-2 px-4 border-none outline-none text-lg text-white bg-cyan-600 transition duration-200 ease-in hover:bg-cyan-800"
            >
              {isLoading ? <MdLoader /> : "Blog Post"}
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

export default AddBlog;
