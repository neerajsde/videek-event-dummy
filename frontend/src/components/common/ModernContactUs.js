import React, { useContext, useEffect, useState } from 'react';
import { MdOutlineEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import MdLoader from '../spinner/MdLoader';
import { TiArrowSortedUp } from "react-icons/ti";
import indiaFlagImg from '../../assets/india_flag.svg';
import toast from "react-hot-toast";
import { AppContext } from '../../context/AppContext';

const ModernContactUs = ({sname}) => {
    const {webData, isLoggedIn, userData, setIsActiveLoginPage} = useContext(AppContext);
    const [currTab, setTab] = useState('send-message');
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        userId: '',
        name:'',
        email:'',
        country_code:'+91',
        phone:'',
        function_date:'',
        message:'',
        ServicesName: ''
    });

    useEffect(() => {
        if(isLoggedIn && userData){
            setFormData((prevState) => ({
                ...prevState,
                userId: userData.user_id,
                name: userData.name,
                email: userData?.email,
                phone: userData.mobile ? Number(userData.mobile.slice(-10)) : 0,
            }))
        }
    }, [isLoggedIn]);

    useEffect(() => {
        setFormData((prevState) => ({
            ...prevState,
            ServicesName: sname,
        }))
    }, [sname])

    function inputHandler(event){
        if (event.target.name === "phone" && event.target.value.length > 10) {
            return;
        }
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const vaildateUser = () => {
        if(!isLoggedIn || !userData){
            setIsActiveLoginPage(true);
        }
    }

    const submitMaleHandler = async (e) => {
        e.preventDefault();
    
        try {
            setIsLoading(true);
            const today = new Date(); // Current date
            const sixMonthsLater = new Date(); 
            sixMonthsLater.setMonth(today.getMonth() + 6); // Add 6 months

            // Format today's date and sixMonthsLater to YYYY-MM-DD for comparison
            const formattedToday = today.toISOString().split('T')[0]; 
            const formattedSixMonthsLater = sixMonthsLater.toISOString().split('T')[0]; 

            // Split selected form date
            const selectedDate = formData.function_date;
            const dateParts = selectedDate.split('-');
            const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`; // DD/MM/YYYY

            // Compare selected date with today's date and six months from today
            if (selectedDate < formattedToday || selectedDate > formattedSixMonthsLater) {
              toast.error('Please select a valid date');
              return;
            }

            const updatedFormData = { 
                ...formData, 
                function_date: formattedDate 
            };
    
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/contact/request`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(updatedFormData),
            });
    
            const data = await response.json();
            if (response.ok && data.success) {
                toast.success(data.message);
                setFormData((prevState) => ({
                    ...prevState,
                    name:'',
                    email:'',
                    country_code:'+91',
                    phone:'',
                    function_date:'',
                    message:''
                }));
            } else {
                toast.error(data.message || 'Something went wrong');
            }
        } catch (err) {
            toast.error('Internal Server Error');
        } finally {
            setIsLoading(false);
        }
    };

    const sendOnWhatsApp = async (e) => {
        e.preventDefault();
    
        try {
            setIsLoading(true);
    
            // Validate form data
            if (!formData.name || !formData.phone || !formData.country_code) {
                toast.error("Please fill all required fields");
                return;
            }
    
            if (!webData?.whatsapp) {
                toast.error("Vendor WhatsApp number is unavailable.");
                return;
            }
    
            // Ensure country code starts with '+'
            const countryCode = formData.country_code.startsWith('+') ? formData.country_code : `+${formData.country_code}`;
            const phoneNumber = `${countryCode}${webData.whatsapp}`;
            const message = `Hi, I'm ${formData.name}. My Phone No is ${countryCode}${formData.phone}.\nI want to connect for ${sname} support!`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    
            // Open WhatsApp URL
            window.open(whatsappUrl, '_blank');
    
            // Inform the user
            toast.success('Message sent on WhatsApp!');
        } catch (err) {
            toast.error('Internal Server Error');
        } finally {
            setIsLoading(false);
        }
    };  
    

  return (
    <div className='w-[320px] max-md:w-full flex flex-col border'>
        <div className='w-full flex justify-around items-center p-4'>
            <button onClick={() => setTab('send-message')} className='px-4 py-2 text-[14px] font-semibold text-white bg-[#AB1C49] flex justify-center items-center gap-2 rounded-full transition duration-200 ease-in hover:bg-[#411530]'><MdOutlineEmail className='text-xl'/>Mail</button>
            <button onClick={() => setTab('whatsapp')} className='px-4 py-2 text-[14px] font-semibold text-white bg-[#25D366] flex justify-center items-center gap-2 rounded-full transition duration-200 ease-in hover:bg-[#2bb45e]'><FaWhatsapp className='text-xl'/>WhatsApp</button>
        </div>
        { currTab === 'send-message' && (
            <div className='w-full border-t-2 border-[#AB1C49] relative'>
                <TiArrowSortedUp className=' absolute top-[-16px] left-[70px] text-2xl text-[#AB1C49]'/>
                <form onSubmit={submitMaleHandler} className='w-full flex flex-col p-4 gap-4'>
                    <h1 className='text-lg text-black font-semibold'>Fill Your Details</h1>
                    <div className='w-full flex flex-col gap-4'>
                        <input
                            type='text'
                            name='name'
                            value={formData.name}
                            onChange={inputHandler}
                            placeholder='Full name'
                            required
                            className='w-full text-base font-normal text-black border-b border-gray-300 py-1 outline-none focus:border-[#AB1C49]'
                        />
                        <div className='w-full relative'>
                            <input
                                type='number'
                                name='phone'
                                value={formData.phone}
                                onChange={inputHandler}
                                placeholder=''
                                required
                                className='w-full text-base font-normal text-black border-b border-gray-300 py-1 pl-[70px] focus:border-[#AB1C49] outline-none'
                            />
                            <div className='absolute bottom-[5px] left-0 flex gap-1'>
                                <img src={indiaFlagImg} alt='' className='w-[28px] h-full'/>
                                <div className='text-base text-gray-500'>{formData.country_code}</div>
                            </div>
                        </div>
                        <input
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={inputHandler}
                            placeholder='Email address'
                            required
                            className='w-full text-base font-normal text-black border-b border-gray-300 py-1 outline-none focus:border-[#AB1C49]'
                        />
                        <input
                            type='date'
                            name='function_date'
                            value={formData.function_date}
                            onChange={inputHandler}
                            placeholder='Function date'
                            required
                            min={new Date().toISOString().split("T")[0]}
                            className='w-full text-base font-normal text-black border-b border-gray-300 py-1 focus:border-[#AB1C49] outline-none'
                        />
                        <input
                            type='text'
                            name='message'
                            value={formData.message}
                            onChange={inputHandler}
                            placeholder='Details about my wedding'
                            required
                            className='w-full text-base font-normal text-black border-b border-gray-300 py-1 outline-none focus:border-[#AB1C49]'
                        />
                    </div>

                    <div  className='w-full flex flex-col gap-2'>
                        <button type='submit' onClick={vaildateUser} className='w-full py-2 text-base font-semibold text-white bg-[#AB1C49] flex justify-center items-center transition duration-200 ease-in hover:bg-[#411530] min-h-[40px]'>{ isLoading ? (<MdLoader/>) : ('Send')}</button>
                        <span className='text-sm text-gray-400'>Complete information ensures you get accurate and timely vendor responses</span>
                    </div>
                </form>
            </div>
        )}
        { currTab === 'whatsapp' && (
            <div className='w-full border-t-2 border-[#25D366] relative'>
                <TiArrowSortedUp className=' absolute top-[-16px] right-[80px] text-2xl text-[#25D366]'/>
                <form onSubmit={sendOnWhatsApp} className='w-full flex flex-col p-4 gap-4'>
                    <h1 className='text-lg text-black font-semibold'>Verify your mobile to contact the vendor</h1>
                    <div className='w-full flex flex-col gap-4'>
                        <div className='w-full flex flex-col justify-between gap-4'>
                            <input
                                type='text'
                                name='name'
                                value={formData.name}
                                onChange={inputHandler}
                                placeholder='Full name'
                                required
                                className='w-full text-base font-normal text-black border-b border-gray-300 py-1 outline-none focus:border-[#AB1C49]'
                            />
                            <div className='w-full relative'>
                                <input
                                    type='number'
                                    name='phone'
                                    value={formData.phone}
                                    onChange={inputHandler}
                                    placeholder=''
                                    required
                                    className='w-full text-base font-normal text-black border-b border-gray-300 py-1 pl-[70px] focus:border-[#AB1C49] outline-none'
                                />
                                <div className='absolute bottom-[6px] left-0 flex gap-2'>
                                    <img src={indiaFlagImg} alt='' className='w-[30px] h-full'/>
                                    <div className='text-base text-gray-500'>{formData.country_code}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <button type='submit' onClick={vaildateUser} className='w-full py-2 text-base font-semibold text-white bg-[#25D366] flex justify-center items-center transition duration-200 ease-in hover:bg-[#2bb45e]'>{ isLoading ? (<MdLoader/>) : ('Send')}</button>
                        <span className='text-sm text-gray-400'>Complete information ensures you get accurate and timely vendor responses</span>
                    </div>
                </form>
            </div>
        )}
    </div>
  )
}

export default ModernContactUs