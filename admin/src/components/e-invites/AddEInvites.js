import React, { useEffect, useState} from 'react'
import axios from "axios"
import MdLoader from '../spinner/MdLoader';
import toast from "react-hot-toast";

const AddEInvites = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [image2, setImage2] = useState(null);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleFileChange = (e) => {
        if(e.target.name === 'image'){
            setImage(e.target.files[0]);
        }
        else{
            setImage2(e.target.files[0]);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");
    
        try {
            setIsLoading(true);
            const formXData = new FormData();
            formXData.append("img", image);
            formXData.append("dummy_img", image2);
    
            // Submit form data
            const response = await axios.post(`${baseUrl}/einvites/dummy/add`, formXData);
    
            if (response.data.success) {    
                setImage(null);
                setImage2(null);
                setSuccessMessage(response.data.message);
            } else {
                setError(response.data.message);
                toast.error(response.data.message);
            }
    
        } catch (error) {
            // Handle unexpected errors
            setError("Internal Server Error. Please try again later.");
            toast.error(error.message);
        } finally {
            // End loading state
            setIsLoading(false);
        }
    };
    

  return (
    <div className="w-full flex flex-col bg-black p-6 gap-4">
        <h2 className="text-2xl font-bold text-cyan-600">Add New Dummy Invitaion-Card</h2>
        <form onSubmit={submitHandler} className="w-full flex flex-col gap-4">
            <div className="w-full flex justify-between gap-4">
                <div className="w-full flex flex-col gap-1">
                    <label className="text-gray-400 text-base font-medium">Upload Invition Card Without Couple Name</label>
                    <input
                        type="file"
                        name="image" 
                        onChange={handleFileChange}
                        accept="image/*"
                        required
                        className="w-full h-[45px] placeholder:text-gray-700 py-1 px-2 bg-[#111] border-2 border-[#333] border-dashed outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                    />
                </div>
                <div className="w-full flex flex-col gap-1">
                    <label className="text-gray-400 text-base font-medium">Dummy Card</label>
                    <input
                        type="file"
                        name="image2" 
                        onChange={handleFileChange}
                        accept="image/*"
                        required
                        className="w-full h-[45px] placeholder:text-gray-700 py-1 px-2 bg-[#111] border-2 border-[#333] border-dashed outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                    />
                </div>
            </div>

            <div className="w-full flex justify-start items-center gap-4">
                <button
                    type="submit"
                    className="h-[45px] w-[200px] rounded-sm flex justify-center items-center py-2 px-4 border-none outline-none text-lg text-white bg-cyan-600 transition duration-200 ease-in hover:bg-cyan-800"
                >
                    {isLoading ? <MdLoader /> : "Submit"}
                </button>
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

export default AddEInvites;