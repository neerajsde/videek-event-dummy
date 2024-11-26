import React, {useState, useEffect} from 'react'
import axios from "axios"
import CreatableSelect from "react-select/creatable";
import MdLoader from '../spinner/MdLoader';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast"

const AddVenue = () => {
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
        location:'',
        price: '',
        rooms: 0
    });

    function inputHandler(event) {
        const { name, value } = event.target;
    
        // Define fields with max length of 10
        const maxLengthFields = ['phone', 'whatsapp'];
    
        // Restrict length for specific fields
        if (maxLengthFields.includes(name) && value.length > 10) {
            return; // Ignore input if length exceeds 10
        }
    
        // Update form data dynamically
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
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

    const getVenueCategory = async () => {
        try {
          const response = await axios.get(
            `${baseUrl}/venue/category`
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
        getVenueCategory();
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
            formXData.append("location", formData.location);
            formXData.append("description", description);
            formXData.append("price", formData.price);
            formXData.append("rooms", formData.rooms);
            formXData.append("img", img);

            const response = await axios.post(`${baseUrl}/venue/add`, formXData);
            if (response.data.success) {
                setSuccessMessage("Venue added successfully");
                setFormData({
                    category:'',
                    name:'',
                    phone:'',
                    whatsapp:'',
                    email:'',
                    location:'',
                    price: '',
                    rooms: 0
                });
                setDescription("");
                setImg(null);
                toast.success("Venue added successfully");
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError("Internal Server Error. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <div className="w-full flex flex-col bg-black p-6 gap-4">
        <h2 className="text-2xl font-bold text-cyan-600">Add New Venue</h2>
        <form onSubmit={submitHandler} className="w-full flex flex-col gap-4">
            <div className="w-full flex justify-between gap-4">
                <div className="w-full flex flex-col gap-1">
                    <label className="text-gray-400 text-base font-medium">
                        Venue type
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
                        placeholder="Venue name"
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
                        placeholder="Venue mobile no"
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
                        placeholder="Venue whatsapp no"
                        className="w-full py-2 px-4 bg-[#111] border placeholder:text-gray-700 border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                    />
                </div>
            </div>

            <div className="w-full flex justify-between gap-4">
                <div className="w-full flex flex-col gap-1">
                    <label className="text-gray-400 text-base font-medium">Price Range</label>
                    <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={inputHandler}
                        required
                        placeholder="e.g. 1200 - 1500"
                        className="w-full py-2 px-4 bg-[#111] border placeholder:text-gray-700 border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                    />
                </div>
                <div className="w-full flex flex-col gap-1">
                    <label className="text-gray-400 text-base font-medium">Total Rooms</label>
                    <input
                        type="number"
                        name="rooms"
                        value={formData.rooms}
                        onChange={inputHandler}
                        required
                        placeholder="Available rooms"
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
                        placeholder="Venue email id"
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
                <label className="text-gray-400 text-base font-medium">Location</label>
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={inputHandler}
                    required
                    placeholder="Enter Venue Location"
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

            <div className="w-full flex justify-start items-end gap-4">
                <div className="w-full flex gap-1">
                    <button
                    type="submit"
                    className="h-[45px] w-[200px] rounded-sm flex justify-center items-center py-2 px-4 border-none outline-none text-lg text-white bg-cyan-600 transition duration-200 ease-in hover:bg-cyan-800"
                    >
                    {isLoading ? <MdLoader /> : "Add Venue"}
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
  )
}

export default AddVenue