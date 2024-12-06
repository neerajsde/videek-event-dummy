import React, { useContext, useState } from 'react';
import { TiWarning } from "react-icons/ti";
import { AppContext } from '../context/AppContext';
import { IoClose } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import MdLoader from './spinner/MdLoader';
import toast from 'react-hot-toast';

const AskConformation = () => {
    const {isActiveConformation, setIsActiveConformation} = useContext(AppContext);
    const [loading, setLoading] = useState(false);

    const deleteHandler = async () => {
        if(!isActiveConformation.data){
            toast.error('Something went wrong');
            return;
        }
        try{
            setLoading(true);
            const token = localStorage.getItem("VideekAdmin");
            if (!token) {
                throw new Error("Token not found. Please log in again.");
            }
            const url = `${process.env.REACT_APP_BASE_URL}/${isActiveConformation.tab}/remove/${isActiveConformation.data._id}`;
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                Authorization: `Bearer ${token}`,
                }
            });
            const data = await response.json();
            if(data.success){
                setIsActiveConformation({isActive: false, name:'', data: isActiveConformation.data, tab:isActiveConformation.tab, response:true});
                toast.success(data.message);
            }
            else{
                toast.error(data.message);
            }
        } catch(err){
            toast.error('Something went wrong');
        } finally{
            setLoading(false);
        }
    }

  return (
    <div className='w-[400px] flex flex-col items-center gap-4 py-4 px-8 relative rounded-lg bg-white shadow-md shadow-gray-500'>
        <div className='w-[80px] h-[80px] rounded-full border-4 border-transparent flex justify-center items-center bg-white absolute top-[-30px] left-[160px]'>
            <TiWarning className='text-6xl text-red-600'/>
        </div>
        <h2 className='pt-[40px] text-xl text-black font-bold'>Are you sure ?</h2>
        <p className='text-center text-lg text-gray-400'>Do you really want to delete <strong>{isActiveConformation.name}</strong>?</p>

        <div className='w-full flex justify-evenly items-center gap-4 '>
            <button onClick={() => setIsActiveConformation({isActive: false, name:'', data: null, tab:'', response:false})} className='w-full  h-[40px] text-base font-semibold bg-red-600 text-white flex justify-center items-center gap-4 py-2 rounded transition duration-200 ease-in hover:bg-red-700'>
                <IoClose className='text-xl'/> No
            </button>

            <button onClick={deleteHandler} className='w-full h-[40px] text-base font-semibold bg-green-600 text-white flex justify-center items-center gap-4 py-2 rounded transition duration-200 ease-in hover:bg-green-700'>
                {loading ? (<MdLoader/>) : (<span className='flex justify-center items-center gap-4'><TiTick className='text-xl'/> Yes</span>)}
            </button>
        </div>
    </div>
  )
}

export default AskConformation