import React, { useContext, useEffect, useState } from 'react'
import banner from '../../assets/basic-contact-form.svg';
import MdLoader from '../spinner/MdLoader';
import toast from "react-hot-toast";
import { AppContext } from '../../context/AppContext';

const BasicContactForm = () => {
    const {isLoggedIn, setIsActiveLoginPage, userData} = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [isActiveForm, setIsActiveForm] = useState(false);
    const [selectData, setSelectData] = useState(null);
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        phone: '',
        vendor:'none'
    });

    function inputHandler(event) {
        const { name, value } = event.target;
    
        // Check for phone input
        if (name === 'phone') {
            // Allow deletion (backspace) and prevent input if length exceeds 10
            if (value.length > 10) {
                return;
            }
        }
    
        // Update form data state
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }
    

    useEffect(() => {
        if (isLoggedIn && userData && isActiveForm) {
            setFormData((prevState) => ({
                ...prevState,
                name: userData.name,
                email: userData.email ? userData.email : formData.email,
                phone: userData.mobile ? userData.mobile.slice(3) : formData.phone
            }));
        }
    }, [userData, isActiveForm]);

    const getUniqueCategory = async(req, res) => {
        try{
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/vendor/category`, {
                method: 'GET',
            });

            const data = await response.json();
            if (response.ok && data.success) {
                setSelectData(data.data);
            } else {
                setSelectData(null);
                toast.error(data.message || 'Something went wrong');
            }
        } catch (err) {
            setSelectData();
            toast.error('Internal Server Error');
        }
    }

    useEffect(() => {
        if(!selectData){
            getUniqueCategory();
        }
    },[]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if(!isLoggedIn && !userData){
            setIsActiveLoginPage(true);
            return
        }
        if(isLoggedIn)
        if(formData.vendor === 'none'){
            toast.error("Please select 'search for vendor'")
            return;
        }
    
        try {
            setLoading(true);
    
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/contact/vendor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({
                    ...formData,
                    userId: userData.user_id
                }),
            });
    
            const data = await response.json();
            if (response.ok && data.success) {
                setFormData((prevState) => ({
                    ...prevState,
                    name: '',
                    vendor: 'none'
                }));
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
            <form onSubmit={submitHandler} className='w-full flex max-sm:flex-col justify-between items-center gap-4 max-sm:gap-6 max-md:pr-4 max-sm:pr-0 max-md:gap-2'>
                <div className='w-full relative group focus-within'>
                    <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={inputHandler}
                        required
                        placeholder='Enter your name'
                        className='w-full text-base placeholder:text-black text-black py-2 px-3 bg-transparent border rounded-md border-gray-400 transition duration-200 ease-in hover:border-black outline-none focus:border-blue-600'
                    />
                    {formData.name !== '' && (
                        <div className='absolute top-[-12px] left-3 px-1 text-gray-500 bg-[#fffbfb] text-sm font-semibold transition duration-200 ease-in group-focus-within:text-blue-600 group-hover:text-black'>
                            Your name
                        </div>
                    )}
                </div>
                {(!isLoggedIn || (isLoggedIn && userData && (userData.email === ''))) && (<div className='w-full relative group focus-within'>
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={inputHandler}
                        placeholder='Enter your email'
                        required
                        className='w-full text-base placeholder:text-black text-black py-2 px-3 bg-transparent border rounded-md border-gray-400 transition duration-200 ease-in hover:border-black outline-none focus:border-blue-600'
                    />
                    {formData.email !== '' && (<div className=' absolute top-[-12px] left-3 px-1 text-gray-500 bg-[#fffbfb] text-sm font-semibold  transition duration-200 ease-in group-focus-within:text-blue-600 group-hover:text-black'>Your email</div>)}
                </div>)}

                {isLoggedIn && userData && (userData.mobile === '') && (<div className='w-full relative group focus-within'>
                    <input
                        type='number'
                        name='phone'
                        value={formData.phone}
                        onChange={inputHandler}
                        placeholder='Enter phone no'
                        required
                        className='w-full text-base placeholder:text-black text-black py-2 px-3 pl-10 bg-transparent border rounded-md border-gray-400 transition duration-200 ease-in hover:border-black outline-none focus:border-blue-600'
                    />
                    <div className=' absolute top-2 left-2'>+91</div>
                    {formData.phone !== '' && (<div className=' absolute top-[-12px] left-3 px-1 text-gray-500 bg-[#fffbfb] text-sm font-semibold  transition duration-200 ease-in group-focus-within:text-blue-600 group-hover:text-black'>Mobile</div>)}
                </div>)}

                <div className='w-full relative group focus-within'>
                    <select
                        name='vendor'
                        value={formData.vendor}
                        onChange={inputHandler}
                        className='w-full text-base text-black py-2 px-3 bg-transparent border rounded-md border-gray-400 transition duration-200 ease-in hover:border-black outline-none focus:border-blue-600'
                    >
                        <option value='none'>Search For Vendors</option>
                        {
                            selectData && selectData.map((item) => (
                                <option value={item}>{item}</option>
                            ))
                        }
                    </select>
                    {formData.vendor !== 'none' && (<div className=' absolute top-[-12px] left-3 px-1 text-gray-500 bg-[#fffbfb] text-sm font-semibold transition duration-200 ease-in group-focus-within:text-blue-600 group-hover:text-black'>Search For Vendors</div>)}
                </div>

                <button 
                    type='submit' 
                    onMouseEnter={() => {
                        isLoggedIn ? setIsActiveForm(true) : setIsActiveLoginPage(true)
                    }} 
                    className='h-[40px] flex justify-center items-center text-lg font-semibold text-white bg-[#AB1C49] border-none py-2 w-full rounded-md transition duration-200 ease-in hover:bg-[#801537]'
                >
                    {loading ? (<MdLoader/>): ('Submit')}
                </button>
            </form>
        </div>
    </div>
  )
}

export default BasicContactForm