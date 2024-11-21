import React, { useContext, useState } from 'react';
import { IoIosMail } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";
import MdLoader from '../spinner/MdLoader';
import toast from 'react-hot-toast';
import { AppContext } from '../../context/AppContext';

const AddTestimonal = () => {
    const {isLoggedIn, userData} = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        user_id:'',
        name:'',
        email:'',
        designation:'',
        message:''
    });

    function inputHandler(e){
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const submitHandler = async (e) => {
        e.preventDefault(); 
    
        try {
            setIsLoading(true);
    
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/testimonial/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({
                    user_id: isLoggedIn ? userData?.user_id : '',
                    email: formData.email, 
                    name:formData.name, 
                    designation: formData.designation, 
                    message: formData.message
                }),
            });
    
            // Check if the response status is OK (2xx)
            const data = await response.json();
            if (response.ok && data.success) {
                setFormData({
                    user_id:'',
                    name:'',
                    email:'',
                    designation:'',
                    message:''
                })
                toast.success(data.message); 
            } else {
                toast.error(data.message || 'Something went wrong'); 
            }
        } catch (err) {
            toast.error('Internal Server Error');
        } finally {
            setIsLoading(false);  // Ensure loading state is reset
        }
    };    


  return (
    <div className='w-[500px] flex flex-col bg-[#111] rounded-md py-6 px-6 gap-4'>
        <div className='w-full text-xl text-white text-center'>Write a review</div>
        <form onSubmit={submitHandler} className='w-full flex flex-col gap-4'>
            {!isLoggedIn && (<label className='w-full relative gap-1'>
                <span className='absolute top-2 text-2xl left-2 text-gray-400 font-semibold'><FaUser/></span>
                <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={inputHandler}
                    required
                    placeholder='Full name'
                    className='w-full bg-[#222] text-base py-2 pl-10 px-3 text-white outline-none border-2 border-[#333] rounded focus:border-blue-500'
                />
            </label>)}
            {!isLoggedIn && (<label className='w-full relative gap-1'>
                <span className='absolute top-2 text-3xl left-2 text-gray-400 font-semibold'><IoIosMail/></span>
                <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={inputHandler}
                    required
                    placeholder='Email'
                    className='w-full bg-[#222] text-base py-2 pl-10 px-3 text-white outline-none border-2 border-[#333] rounded focus:border-blue-500'
                />
            </label>)}
            <label className='w-full relative gap-1'>
                <span className='absolute top-2 text-2xl left-[10px] text-gray-400 font-semibold'><MdOutlineWork/></span>
                <input
                    type='text'
                    name='designation'
                    value={formData.designation}
                    onChange={inputHandler}
                    required
                    placeholder='Work Profile'
                    className='w-full bg-[#222] text-base py-2 pl-10 px-3 text-white outline-none border-2 border-[#333] rounded focus:border-blue-500'
                />
            </label>

            <textarea
                type='text'
                name='message'
                value={formData.message}
                onChange={inputHandler}
                required
                placeholder='write here...'
                rows={5}
                className='w-full bg-[#222] text-base py-2 px-3 text-white outline-none border-2 border-[#333] rounded focus:border-blue-500'
            />

            <button type='submit' className='w-full h-[40px] flex justify-center items-center bg-blue-500 py-2 text-base font-semibold text-white rounded-md transition duration-200 ease-in hover:bg-blue-600'>{isLoading ? (<MdLoader/>) : 'Submit'}</button>
        </form>
    </div>
  )
}

export default AddTestimonal