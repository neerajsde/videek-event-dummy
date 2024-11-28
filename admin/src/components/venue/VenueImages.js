import React, { useEffect, useState } from 'react'
import MdLoader from '../spinner/MdLoader';
import toast from 'react-hot-toast';
import axios from 'axios';
import AllPictures from './AllPictures';

const VenueImages = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [success, setSucsess] = useState("");
    const [error, setError] = useState("");
    const [addLoading, setAddLoading] = useState(false);
    const [venueData, setVenueData] = useState(null);
    const [currVenueData, setCurrVenueData] = useState(null);
    const [currVenueName, setCurrVenueName] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

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
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/venue/${currVenueName}/faqs`, config);
            if(response.data.success){
                setVenueData(response.data.data);
                setSucsess(response.data.message);
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

    const handleFileChange = (e) => {
        setImages([...e.target.files]);
    };

    const uploadImg = async (index) => {
        try {
            const formXData = new FormData();
            formXData.append("id", venueData.id);
            formXData.append("img", images[index]);
    
            const response = await axios.post(`${baseUrl}/venue/album/img/upload`, formXData);
            if (response.data.success) {
                setVenueData(response.data.data);
                return 'success';
            } else {
                return 'error';
            }
        } catch (error) {
            return 'something went wrong';
        }
    };
    
    const imagesUploader = async () => {
        if (!venueData.id) {
            setSuccessMessage('');
            setErrorMessage('Please refresh the tab');
            toast.error('Please refresh the tab');
            return;
        }
        if (images.length === 0) {
            setSuccessMessage('');
            setErrorMessage('Please upload the images');
            toast.error('Please upload the images');
            return;
        }
    
        try {
            setIsLoading(true); 
            setSuccessMessage('');
            setErrorMessage('');
    
            // Sequential Upload Approach (Current)
            for (let index = 0; index < images.length; index++) {
                const res = await uploadImg(index);
                if (res !== 'success') {
                    toast.error(`Error uploading image ${index + 1}`);
                    return;
                }
            }
            setImages([]);
            setSuccessMessage('All images uploaded successfully');
            toast.success('All images uploaded successfully');
        } catch (err) {
            setErrorMessage('Something went wrong while uploading images');
            toast.error('Something went wrong while uploading images');
        } finally {
            setIsLoading(false);
        }
    };

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

  return (
    <div className='w-full flex flex-col gap-8 p-4'>
        <h2 className='text-2xl text-cyan-600 font-bold'>Upload Images into album - <span className='text-blue-500'>{venueData?.venue_name}</span></h2>

        <div className='w-full flex flex-col gap-4'>
            <div className='w-full p-4 border bg-[#111] border-[#333] flex gap-4'>
                <div className="w-full flex flex-col gap-1">
                    <label className="text-gray-400 text-base font-medium">Upload images</label>
                    <input
                        type="file"
                        name="img" 
                        onChange={handleFileChange}
                        accept="image/*"
                        multiple 
                        required
                        className="w-full h-[45px] placeholder:text-gray-700 py-1 px-2 bg-[#111] border-2 border-[#333] border-dashed outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                    />
                </div>

                <div className="w-full flex justify-start items-end gap-4">
                    <div className="w-full flex flex-col gap-1">
                        {
                            errorMessage && (<span className='text-red-500 text-base font-semibold'>{errorMessage}</span>)
                        }
                        {
                            successMessage && (<span className='text-green-500 text-base font-semibold'>{successMessage}</span>)
                        }
                        <button
                            onClick={imagesUploader}
                            className="h-[45px] w-[200px] rounded-sm flex justify-center items-center py-2 px-4 border-none outline-none text-lg text-white bg-cyan-600 transition duration-200 ease-in hover:bg-cyan-800"
                        >
                        {isLoading ? <MdLoader /> : "Upload Images"}
                        </button>
                    </div>
                </div>
            </div>

            <div className='w-full p-4 border bg-[#111] border-[#333] flex flex-col gap-4'>
                <h2 className='text-2xl font-semibold text-green-600'>Venue Images</h2>
                <AllPictures data={venueData}/>
            </div>
        </div>
    </div>
  )
}

export default VenueImages