import React, {useState} from 'react'
import axios from "axios"
import MdLoader from '../spinner/MdLoader';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast"

const AddWeddings = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [isLoading, setIsLoading] = useState(false);
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [formData, setFormData] = useState({
        couple_name:'',
        location:'',
        title:'',
        date:'',
        taggedVendor:''
    });

    function inputHandler(event){
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const handleFileChange = (e) => {
        setImages([...e.target.files]);
    };
    
    const handleDescriptionChange = (value) => {
        setDescription(value);
    };

    const uploadImg = async (index, ids) => {
        try {
            const formXData = new FormData();
            formXData.append("id", ids);
            formXData.append("img", images[index]);
    
            const response = await axios.post(`${baseUrl}/wedding/img-upload`, formXData);
    
            if (response.data.success) {
                return 'success';
            } else {
                return 'error';
            }
        } catch (error) {
            return 'something went wrong';
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");
    
        try {
            setIsLoading(true);
            if (images.length < 4) {
                setError("Please upload a minimum of four images.");
                return;
            }
            const formXData = new FormData();
    
            // Append form data dynamically
            Object.entries(formData).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach((item, index) => formXData.append(`${key}[${index}]`, item)); // handle arrays properly
                } else {
                    formXData.append(key, value);
                }
            });
    
            formXData.append("description", description);
    
            const response = await axios.post(`${baseUrl}/wedding/upload`, formXData);
            
            if (response.data.success) {    
                const id = response.data.ids;
    
                // Loop through and upload images
                for (let index = 0; index < images.length; index++) {
                    const res = await uploadImg(index, id);
                    if (res !== 'success') {
                        toast.error(`Error uploading image ${index + 1}`);
                        return; // If one fails, stop further execution
                    }
                }
    
                // Reset form and states
                setDescription("");
                setFormData({
                    couple_name: '',
                    location: '',
                    title: '',
                    date: '',
                    taggedVendor: ''     
                });
                setImages([]);
                setSuccessMessage("Submitted successfully");
                toast.success("Submitted successfully");
    
            } else {
                setError(response.data.message);
                toast.error(response.data.message);
            }
    
        } catch (error) {
            setError("Internal Server Error. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };
    

  return (
    <div className="w-full flex flex-col bg-black p-6 gap-4">
        <h2 className="text-2xl font-bold text-cyan-600">Add Real Weddings</h2>
        <form onSubmit={submitHandler} className="w-full flex flex-col gap-4">
            <div className="w-full flex justify-between gap-4">
                <div className="w-full flex flex-col gap-1">
                    <label className="text-gray-400 text-base font-medium">Couple Name</label>
                    <input
                        type="text"
                        name="couple_name"
                        value={formData.couple_name}
                        onChange={inputHandler}
                        required
                        placeholder="enter couple name"
                        className="w-full py-2 px-4 bg-[#111] border placeholder:text-gray-700 border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                    />
                </div>
                <div className="w-full flex flex-col gap-1">
                    <label className="text-gray-400 text-base font-medium">Heading</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={inputHandler}
                        required
                        placeholder="brief desc into 10 words"
                        className="w-full py-2 px-4 bg-[#111] border placeholder:text-gray-700 border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                    />
                </div>
            </div>

            <div className="w-full flex justify-between gap-4">
                <div className="w-full flex flex-col gap-1">
                    <label className="text-gray-400 text-base font-medium">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={inputHandler}
                        required
                        className="w-full py-2 px-4 bg-[#111] border placeholder:text-gray-700 border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                    />
                </div>
                <div className="w-full flex flex-col gap-1">
                    <label className="text-gray-400 text-base font-medium">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={inputHandler}
                        required
                        placeholder="enter wedding location"
                        className="w-full py-2 px-4 bg-[#111] border placeholder:text-gray-700 border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                    />
                </div>
            </div>

            <div className="w-full flex justify-between gap-4">
                <div className="w-full flex flex-col gap-1">
                    <label className="text-gray-400 text-base font-medium">Tag Vendors</label>
                    <input
                        type="text"
                        name="taggedVendor"
                        value={formData.taggedVendor}
                        onChange={inputHandler}
                        required
                        placeholder="write vendor name like vendor1, vendor2"
                        className="w-full py-2 px-4 bg-[#111] border placeholder:text-gray-700 border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                    />
                </div>
                <div className="w-full flex flex-col gap-1">
                    <label className="text-gray-400 text-base font-medium">Upload images</label>
                    <input
                        type="file"
                        name="images" 
                        onChange={handleFileChange}
                        accept="image/*"
                        multiple
                        required
                        className="w-full h-[45px] placeholder:text-gray-700 py-1 px-2 bg-[#111] border-2 border-[#333] border-dashed outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                    />
                </div>
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
                    {isLoading ? <MdLoader /> : "Submit"}
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

export default AddWeddings