import React, { useEffect, useState } from 'react'
import MdLoader from '../spinner/MdLoader';
import toast from 'react-hot-toast';
import axios from 'axios';

const DeleteVenue = () => {
    const [success, setSucsess] = useState("");
    const [error, setError] = useState("");
    const [addLoading, setAddLoading] = useState(false);
    const [venueData, setVenueData] = useState(null);
    const [currVenueData, setCurrVenueData] = useState(null);
    const [currVenueName, setCurrVenueName] = useState(null);

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

    // console.log(venueData);

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
    <div>DeleteVenue</div>
  )
}

export default DeleteVenue