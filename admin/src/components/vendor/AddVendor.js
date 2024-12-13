import React, {useState, useEffect} from 'react'
import axios from "axios"
import CreatableSelect from "react-select/creatable";
import MdLoader from '../spinner/MdLoader';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast"

const AddVendor = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [isLoading, setIsLoading] = useState(false);
    const [description, setDescription] = useState("");
    const [img, setImg] = useState(null);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [formData, setFormData] = useState({
        category:'',
        name:'',
        phone:'',
        whatsapp:'',
        email:'',
        title:''
    });

    function inputHandler(event){
        const {name, value} = event.target;
        if(name === 'phone' && value > 9999999999){
            return;
        }
        if(name === 'whatsapp' && value > 9999999999){
            return;
        }
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleFileChange = (e) => {
        setImg(e.target.files[0]);
    };
    
    const handleDescriptionChange = (value) => {
        setDescription(value);
    };
    
    const handleCategoryChange = (selectedOption) => {
        setFormData((prevState) => ({
          ...prevState,
          category: selectedOption ? selectedOption.value : "",
        }));
    };

    const getVendorCategory = async () => {
        try {
          const response = await axios.get(
            `${baseUrl}/vendor/category`
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
        getVendorCategory();
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        if (!img) {
            setError("Please upload a blog image.");
            return;
        }

        try {
            setIsLoading(true);
            const formXData = new FormData();
            formXData.append("category", formData.category);
            formXData.append("name", formData.name);
            formXData.append("phone", formData.phone);
            formXData.append("whatsapp", formData.whatsapp);
            formXData.append("email", formData.email);
            formXData.append("title", formData.title);
            formXData.append("description", description);
            formXData.append("img", img);

            const response = await fetch(`${baseUrl}/vendor/add`, {
                method:'POST',
                body: formXData
            });
            const data = await response.json();
            if (data.success) {
                setSuccessMessage("Vendor added successfully");
                setFormData({
                    category:'',
                    name:'',
                    phone:'',
                    whatsapp:'',
                    email:'',
                    title:''
                });
                setDescription("");
                setImg(null);
                toast.success("Vendor added successfully");
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError("Internal Server Error. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <div className="w-full flex flex-col bg-black p-6 gap-4">
        <h2 className="text-2xl font-bold text-cyan-600">Add New Vendor Category</h2>
        <form onSubmit={submitHandler} className="w-full flex flex-col gap-4">
            <div className="w-full flex justify-between gap-4">
                <div className="w-full flex flex-col gap-1">
                    <label className="text-gray-400 text-base font-medium">
                        Vendor Category
                    </label>
                    <CreatableSelect
                        isClearable
                        required
                        options={categoryOptions}
                        onChange={handleCategoryChange}
                        value={categoryOptions.find(
                            (option) => option.value === formData.category
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
                    <label className="text-gray-400 text-base font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={inputHandler}
                        required
                        placeholder="Vendor name"
                        className="w-full py-2 px-4 bg-[#111] border placeholder:text-gray-700 border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                    />
                </div>
            </div>

            <div className="w-full flex justify-between gap-4">
                <div className="w-full flex flex-col gap-1">
                    <label className="text-gray-400 text-base font-medium">Phone</label>
                    <input
                        type="number"
                        name="phone"
                        value={formData.phone}
                        onChange={inputHandler}
                        required
                        placeholder="Vendor mobile no"
                        className="w-full py-2 px-4 bg-[#111] border placeholder:text-gray-700 border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                    />
                </div>
                <div className="w-full flex flex-col gap-1">
                    <label className="text-gray-400 text-base font-medium">WhatsApp</label>
                    <input
                        type="number"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={inputHandler}
                        required
                        placeholder="Vendor whatsapp no"
                        className="w-full py-2 px-4 bg-[#111] border placeholder:text-gray-700 border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                    />
                </div>
            </div>

            <div className="w-full flex justify-between gap-4">
                <div className="w-full flex flex-col gap-1">
                    <label className="text-gray-400 text-base font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={inputHandler}
                        required
                        placeholder="Vendor email id"
                        className="w-full py-2 px-4 bg-[#111] border placeholder:text-gray-700 border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                    />
                </div>
                <div className="w-full flex flex-col gap-1">
                    <label className="text-gray-400 text-base font-medium">Upload image</label>
                    <input
                        type="file"
                        name="img" 
                        onChange={handleFileChange}
                        accept="image/*"
                        required
                        className="w-full h-[45px] placeholder:text-gray-700 py-1 px-2 bg-[#111] border-2 border-[#333] border-dashed outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                    />
                </div>
            </div>

            <div className="w-full flex flex-col gap-1">
                <label className="text-gray-400 text-base font-medium">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={inputHandler}
                    required
                    placeholder="write heading"
                    className="w-full py-2 px-4 bg-[#111] border placeholder:text-gray-700 border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                />
            </div>

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

            <div className="w-full flex justify-start items-center gap-4">
                <div className="w-[200px] flex gap-1">
                    <button
                    type="submit"
                    className="h-[45px] w-full rounded-sm flex justify-center items-center py-2 px-4 border-none outline-none text-lg text-white bg-cyan-600 transition duration-200 ease-in hover:bg-cyan-800"
                    >
                    {isLoading ? <MdLoader /> : "Add Vendor"}
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

export default AddVendor