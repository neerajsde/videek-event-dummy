import React, { useState } from 'react'
import banner from '../../assets/basic-contact-form.svg';
import MdLoader from '../spinner/MdLoader';
import toast from "react-hot-toast";

const BasicContactForm = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        vendor:'none'
    });

    function inputHandler(event){
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const submitHandler = async (e) => {
        e.preventDefault();
    
        try {
            setLoading(true);
    
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/contact/vendor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(formData),
            });
    
            const data = await response.json();
            if (response.ok && data.success) {
                setFormData({
                    name:'',
                    email:'',
                    vendor:'none'
                })
                toast.success(data.message); 
            } else {
                toast.error(data.message || 'Something went wrong');
            }
        } catch (err) {
            toast.error('Internal Server Error');
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className={`w-full h-[300px] max-md:h-[350px] relative`}>
        <img src={banner} alt='banner' loading='lazy' className='w-full h-full object-contain'/>
        <div className='w-full h-full absolute top-0 left-0 flex flex-col justify-center items-center py-8 px-24 max-sm:py-4 max-md:px-6 max-sm:px-4 gap-8 max-md:gap-4'>
            <div className='w-full flex flex-col'>
                <h2 className='text-2xl max-sm:text-lg font-bold text-black'>Help us with your details</h2>
                <p className='text-base max-md:text-sm max-sm:text-xs font-normal text-gray-500'>Our executives will call you to understand your requirements to find suitable vendors</p>
            </div>
            <form onSubmit={submitHandler} className='w-full flex max-sm:flex-col justify-between items-center gap-4 max-md:pr-4 max-sm:pr-0 max-md:gap-2'>
                <div className='w-full relative group focus-within'>
                    <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={inputHandler}
                        required
                        placeholder='Enter your name'
                        className='w-full text-base placeholder:text-black font-semibold text-black py-2 px-3 bg-transparent border rounded-md border-gray-400 transition duration-200 ease-in hover:border-black outline-none focus:border-blue-600'
                    />
                    {formData.name !== '' && (
                        <div className='absolute top-[-12px] left-3 px-1 text-gray-500 bg-[#fffbfb] text-sm font-semibold transition duration-200 ease-in group-focus-within:text-blue-600 group-hover:text-black'>
                            Your name
                        </div>
                    )}
                </div>
                <div className='w-full relative group focus-within'>
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={inputHandler}
                        placeholder='Enter your email'
                        required
                        className='w-full text-base placeholder:text-black font-semibold text-black py-2 px-3 bg-transparent border rounded-md border-gray-400 transition duration-200 ease-in hover:border-black outline-none focus:border-blue-600'
                    />
                    {formData.email !== '' && (<div className=' absolute top-[-12px] left-3 px-1 text-gray-500 bg-[#fffbfb] text-sm font-semibold  transition duration-200 ease-in group-focus-within:text-blue-600 group-hover:text-black'>Your email</div>)}
                </div>

                <div className='w-full relative group focus-within'>
                    <select
                        name='vendor'
                        value={formData.vendor}
                        onChange={inputHandler}
                        className='w-full text-base font-semibold text-black py-2 px-3 bg-transparent border rounded-md border-gray-400 transition duration-200 ease-in hover:border-black outline-none focus:border-blue-600'
                    >
                        <option value='none'>Search For Vendors</option>
                        <option value='makeup artist'>Makeup Artists</option>
                        <option value='Photographers'>Photographers</option>
                        <option value='Planners'>Planners</option>
                        <option value='Venues'>Venues</option>
                        <option value='Decorators'>Decorators</option>
                        <option value='Mehendi Artists'>Mehendi Artists</option>
                        <option value='Caterers'>Caterers</option>
                        <option value='Invitations'>Invitations</option>
                    </select>
                    {formData.vendor !== 'none' && (<div className=' absolute top-[-12px] left-3 px-1 text-gray-500 bg-[#fffbfb] text-sm font-semibold transition duration-200 ease-in group-focus-within:text-blue-600 group-hover:text-black'>Search For Vendors</div>)}
                </div>

                <button type='submit' className='h-[40px] flex justify-center items-center text-lg font-semibold text-white bg-[#AB1C49] border-none py-2 w-full rounded-md transition duration-200 ease-in hover:bg-[#801537]'>
                    {loading ? (<MdLoader/>): ('Submit')}
                </button>
            </form>
        </div>
    </div>
  )
}

export default BasicContactForm