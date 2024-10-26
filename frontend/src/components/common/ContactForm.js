import React, { useState } from 'react'
import { IoIosMail } from "react-icons/io";
import { MdPermContactCalendar } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { TiMessageTyping } from "react-icons/ti";
import SmLoader from '../spinner/SmLoader';
import contactImg from '../../assets/contact-img.jpg';
import Logo from '../navbar/Logo';

const ContactForm = () => {
    const [error, setError] = useState('');
    const [sucess, setSucess] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name:'',
        phone:'',
        email:'',
        subject:'',
        message:''
    });

    function inputHandler(event){
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setError("");
        setSucess(""); 
    
        try {
            setLoading(true);
    
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/contact-us`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(formData),
            });
    
            // Check if the response status is OK (2xx)
            const data = await response.json();
            if (response.ok && data.success) {
                setSucess(data.message);  // Display success message
            } else {
                setError(data.message || 'Something went wrong');  // Handle errors properly
            }
        } catch (err) {
            setError('Internal Server Error');  // Catch network or other errors
        } finally {
            setLoading(false);  // Ensure loading state is reset
        }
    };    

  return (
    <div className='w-full flex justify-between p-8 gap-8 max-lg:flex-col-reverse max-md:flex-col max-sm:px-4 max-sm:py-6'>
        <div className='w-full flex flex-col relative'>
            <img src={contactImg} alt='banner' className='w-full h-full object-cover max-lg:h-[300px] rounded-xl'/>
            <div className='absolute top-0 left-0 w-full h-full max-lg:h-[300px] bg-[#0000008a] rounded-xl flex justify-center items-center'>
                <div className='flex flex-col items-center'>
                    <Logo/>
                    <h3 className='text-2xl text-white'>Hire me</h3>
                </div>
            </div>
        </div>
        <form onSubmit={submitHandler} className='w-full border rounded-xl flex flex-col p-4 gap-4 max-sm:p-2'>
            <h2 className='w-full text-center text-xl font-semibold text-black'>Send Message</h2>
            <div className='w-full flex flex-col gap-4 max-sm:gap-2'>
                <div className='w-full flex justify-between gap-4 max-sm:flex-col max-sm:gap-2'>
                    <label className='w-full flex flex-col relative'>
                        <span className='text-base font-semibold text-gray-400 max-sm:text-sm'>Name<span className='text-red-600'>*</span></span>
                        <input
                            type='text'
                            name='name'
                            value={formData.name}
                            placeholder='enter full name'
                            onChange={inputHandler}
                            required
                            className='w-full py-2 pl-8 pr-2 border border-gray-300 rounded-sm outline-none text-base font-medium text-black placeholder:text-gray-300 focus:border-[#AB1C49]'
                        />
                        <FaUser className='absolute bottom-3 left-2 text-lg text-gray-400'/>
                    </label>
                    <label className='w-full flex flex-col relative'>
                        <span className='text-base font-semibold text-gray-400 max-sm:text-sm'>Phone</span>
                        <input
                            type='number'
                            name='phone'
                            value={formData.phone}
                            placeholder='enter mobile no'
                            onChange={inputHandler}
                            required
                            className='w-full py-2 pl-8 pr-2 border border-gray-300 rounded-sm outline-none text-base font-medium text-black placeholder:text-gray-300 focus:border-[#AB1C49]'
                        />
                        <MdPermContactCalendar className='absolute bottom-3 left-2 text-lg text-gray-400'/>
                    </label>
                </div>

                <label className='w-full flex flex-col relative'>
                    <span className='text-base font-semibold text-gray-400 max-sm:text-sm'>Email<span className='text-red-600'>*</span></span>
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        placeholder='enter email'
                        onChange={inputHandler}
                        required
                        className='w-full py-2 pl-8 pr-2 border border-gray-300 rounded-sm outline-none text-base font-medium text-black placeholder:text-gray-300 focus:border-[#AB1C49]'
                    />
                    <IoIosMail className='absolute bottom-2 left-[6px] text-2xl text-gray-400'/>
                </label>

                <label className='w-full flex flex-col relative'>
                    <span className='text-base font-semibold text-gray-400 max-sm:text-sm'>Subject<span className='text-red-600'>*</span></span>
                    <input
                        type='text'
                        name='subject'
                        value={formData.subject}
                        placeholder='enter subject'
                        onChange={inputHandler}
                        required
                        className='w-full py-2 pl-8 pr-2 border border-gray-300 rounded-sm outline-none text-base font-medium text-black placeholder:text-gray-300 focus:border-[#AB1C49]'
                    />
                    <TiMessageTyping className='absolute bottom-2 left-[6px] text-2xl text-gray-400'/>
                </label>

                <label className='w-full flex flex-col'>
                    <span className='text-base font-semibold text-gray-400 max-sm:text-sm'>Message<span className='text-red-600'>*</span></span>
                    <textarea
                        type='text'
                        name='message'
                        value={formData.message}
                        placeholder='enter subject'
                        onChange={inputHandler}
                        required
                        className='w-full py-2 px-4 border border-gray-300 rounded-sm outline-none text-base font-medium text-black placeholder:text-gray-300 focus:border-[#AB1C49]'
                    />
                </label>
            </div>

            <div className='w-full flex flex-col justify-start gap-2'>
                {
                    error !== '' && (<div className='text-sm text-red-500 font-semibold'>{error}</div>)
                }
                {
                    sucess !== '' && (<div className='text-sm text-green-500 font-semibold'>{sucess}</div>)
                }
                <button 
                    type='submit'
                    className='w-[200px] max-sm:mb-2 max-sm:w-full flex justify-center items-center gap-4 py-2 px-4 border-2 border-transparent bg-[#411530] text-lg max-sm:text-base font-semibold text-white rounded-sm hover:border-[#AB1C49]'
                >Submit {loading && (<SmLoader/>)}</button>
            </div>
        </form>
    </div>
  )
}

export default ContactForm