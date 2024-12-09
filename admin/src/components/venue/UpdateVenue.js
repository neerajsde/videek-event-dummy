import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import MdLoader from '../spinner/MdLoader';
import toast from 'react-hot-toast';
import axios from 'axios';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const UpdateVenue = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const {adminData} = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const [description, setDescription] = useState("");
    const [img, setImg] = useState(null);
    const [data, setData] = useState(null);
    const [success, setSucsess] = useState("");
    const [error, setError] = useState("");
    const [addLoading, setAddLoading] = useState(false);
    const [venueData, setVenueData] = useState(null);
    const [currVenueData, setCurrVenueData] = useState(null);
    const [currVenueName, setCurrVenueName] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        type:'',
        name:'',
        phone:'',
        whatsapp:'',
        email:'',
        location:'',
        price:'',
        rooms: '',
    });

    function inputHandler(event){
        const {name, value} = event.target;
        if(name === 'phone' && value.length > 13){
            return;
        }
        if(name === 'whatsapp' && value.length > 13){
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

    const fetchVenuesData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/venue/all`);
            setCurrVenueData(response.data.data);
        } catch (err) {
            toast.error(err.message)
        }
    };

    useEffect(() => {
        fetchVenuesData();
    },[]);

    const findVenueHandler = async (e) => {
        e.preventDefault();
        setSucsess('');
        setError('');
        if(currVenueName === "none"){
            setError('Please select venue');
            return;
        }
        try {
            setAddLoading(true);
            const token = localStorage.getItem('VideekAdmin');
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/venue/${currVenueName}/details`, config);
            if(response.data.success){
                const data = response.data.data;
                setVenueData(data);
                setData(data);
                setFormData({
                    type:data.type,
                    name:data.name,
                    phone:data.phone,
                    whatsapp:data.whatsapp,
                    email:data.email,
                    location:data.location,
                    price:data.price_range,
                    rooms: data.rooms,
                });
                setDescription(data.description);
                setSucsess(data.message);
            }
            else{
                setError(response.data.message);
            }
        } catch (err) {
            toast.error(err.message)
            setError(err.message);
        } finally{
            setAddLoading(false);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");
        if(!adminData.user_id){
            setError('Something went wrong');
            return;
        }

        try {
            setIsLoading(true);
            const formXData = new FormData();
            formXData.append("venue_id", data._id);
            formXData.append("type", formData.type.trim());
            formXData.append("name", formData.name.trim());
            formXData.append("phone", formData.phone);
            formXData.append("whatsapp", formData.whatsapp);
            formXData.append("email", formData.email);
            formXData.append("location", formData.location);
            formXData.append("price", formData.price);
            formXData.append("rooms", formData.rooms);
            formXData.append("description", description);
            if(img){
                formXData.append("img", img);
            }

            const response = await axios.put(`${baseUrl}/venue/update`, formXData);
            if (response.data.success) {
                setSuccessMessage(response.data.message);
                toast.success(response.data.message);
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError("Internal Server Error. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }

    if(!venueData){
        return(
            <form onSubmit={findVenueHandler} className='w-full p-4 flex flex-col gap-4'>
                <div className="w-full flex flex-col justify-start items-start gap-2">
                    <label className="w-full text-gray-400 text-lg font-medium">Choose Venue:</label>
                    <select
                        onChange={(e) => setCurrVenueName(e.target.value)}
                        value={currVenueName}
                        className="w-[50%] py-2 px-4 bg-[#111] border placeholder:text-gray-700 border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                        required
                    >
                        <option value='none'>-- none</option>
                        {currVenueData && currVenueData.map((item, index) => (
                            <option key={index} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className='w-full flex justify-start items-center gap-4'>
                    <button type='submit' className="h-[40px] w-[100px] rounded-sm flex justify-center items-center py-2 px-4 border-none outline-none text-lg text-white bg-cyan-600 transition duration-200 ease-in hover:bg-cyan-800">{ addLoading ? (<MdLoader/>) : 'Find'}</button>
                    {
                        success && (<p className='text-base text-green-500 font-semibold'>{success}</p>)
                    }

                    {
                        error && (<p className='text-base text-red-500 font-semibold'>{error}</p>)
                    }
                </div>
            </form>
        )
    }

    if(loading){
        return (
          <div className='w-full h-[450px] flex justify-center items-center'><MdLoader/></div>
        )
    }
    
    if(!data){
        return (
          <div className='w-full h-[450px] flex justify-center items-center'>Something went wrong</div>
        )
    }
  return (
    <div className="w-full flex flex-col bg-black p-6 gap-4">
        <h2 className="text-2xl font-bold text-cyan-600">Update Venue Name: <span className='text-orange-500'>{data?.name}</span></h2>
        <form onSubmit={submitHandler} className="w-full flex flex-col gap-4">
            <div className="w-full flex justify-between gap-4">
                <div className="w-full flex flex-col gap-1">
                    <label className="text-gray-400 text-base font-medium">Type</label>
                    <input
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={inputHandler}
                        required
                        placeholder="Venue Type"
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
                        placeholder="enter available rooms"
                        className="w-full py-2 px-4 bg-[#111] border placeholder:text-gray-700 border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                    />
                </div>
            </div>

            <div className="w-full flex justify-between gap-4">
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
                <div className="w-full flex flex-col gap-1">
                    <label className="text-gray-400 text-base font-medium">Price Range</label>
                    <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={inputHandler}
                        required
                        placeholder="enter like this: 1.5L - 10L"
                        className="w-full py-2 px-4 bg-[#111] border placeholder:text-gray-700 border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                    />
                </div>
            </div>

            <div className="w-full flex justify-between gap-4">
                <div className="w-full flex flex-col gap-1">
                    <label className="text-gray-400 text-base font-medium">Phone</label>
                    <input
                        type="text"
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
                        type="text"
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
                    <label className="text-gray-400 text-base font-medium">Upload Banner Img</label>
                    <input
                        type="file"
                        name="img" 
                        onChange={handleFileChange}
                        accept="image/*"
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
                    placeholder="enter full location"
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
                <div className=" flex gap-1">
                    <button
                    type="submit"
                    className="h-[45px] w-[200px] rounded-sm flex justify-center items-center py-2 px-4 border-none outline-none text-lg text-white bg-cyan-600 transition duration-200 ease-in hover:bg-cyan-800"
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

export default UpdateVenue