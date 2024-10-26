import React, { useState, useEffect } from 'react';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { MdReportGmailerrorred } from "react-icons/md";
import toast from 'react-hot-toast';
import MdLoader from '../components/spinner/MdLoader';

const SignUp = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();
    const [isVisiablePass, setIsVisiablePass] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState({ error: false, message: '' });
    const [passwordError, setPasswordError] = useState({ error: false, message: '' });
    const [nameError, setNameError] = useState({ error: false, message: '' });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        window.document.title = 'Admin SignUp';
    }, []);

    const inputHandler = (event) => {
        setError('');
        if (event.target.name === 'email') setEmailError({ error: false, message: '' });
        if (event.target.name === 'password') setPasswordError({ error: false, message: '' });
        if (event.target.name === 'name') setNameError({ error: false, message: '' });

        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value,
        }));
    };

    const isFormFilled = () => {
        return Object.values(formData).every(value => value.trim() !== '');
    };

    const signupHandler = async () => {
        if (!isFormFilled()) {
            setError('Please fill out all fields.');
            return;
        }

        try {
            setIsLoading(true);
            const url = `${baseUrl}/admin/add`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                toast.success('Signup successful! Redirecting...');
                navigate('/');
            } else {
                if (data.tag === 'email') {
                    setEmailError({ error: true, message: data.message });
                } else if (data.tag === 'password') {
                    setPasswordError({ error: true, message: data.message });
                }  else {
                    setError(data.message || 'An unexpected error occurred. Please try again.');
                }
            }
        } catch (err) {
            console.error('Error:', err);
            setError('Failed to sign up. Please check your network connection or try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='w-full login min-h-screen bg-black flex flex-col items-center justify-center py-4'>
            <div className='w-[500px] flex flex-col text-white bg-[#111] py-6 px-8 max-sm:p-4 rounded-xl gap-2 max-sm:gap-4 max-md:w-[400px] max-sm:w-full'>
                <div className='w-full flex flex-col gap-1'>
                    <h1 className='text-xl font-bold text-white max-md:text-lg'>Admin-Signup</h1>
                    <p className='text-md font-semibold text-gray-400 max-md:text-sm'>Create an account to continue</p>
                </div>

                <div className='w-full flex flex-col gap-4 max-md:gap-3'>
                    <label className='w-full flex flex-col'>
                        <p className='text-base font-semibold text-gray-500 max-md:text-sm'>Full Name</p>
                        <input
                            type='text'
                            name='name'
                            value={formData.name}
                            onChange={inputHandler}
                            placeholder='John Doe'
                            className={`text-lg max-md:text-base font-semibold py-2 px-3 max-sm:px-2 bg-[#333] text-white placeholder:text-gray-500 rounded outline-none border-2 ${nameError.error ? 'border-red-500' : 'border-transparent transition duration-300 ease-in hover:border-yellow-300 focus:border-yellow-500'}`}
                        />
                        {nameError.error && (
                            <div className='w-full flex items-center justify-start gap-2 text-red-500 text-sm font-medium max-sm:text-xs'>
                                <MdReportGmailerrorred className='text-lg max-sm:text-base text-orange-500' />
                                {nameError.message}
                            </div>
                        )}
                    </label>

                    <label className='w-full flex flex-col'>
                        <p className='text-base font-semibold text-gray-500 max-md:text-sm'>Email address</p>
                        <input
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={inputHandler}
                            placeholder='example@gmail.com'
                            className={`text-lg max-md:text-base font-semibold py-2 px-3 max-sm:px-2 bg-[#333] text-white placeholder:text-gray-500 rounded outline-none border-2 ${emailError.error ? 'border-red-500' : 'border-transparent transition duration-300 ease-in hover:border-yellow-300 focus:border-yellow-500'}`}
                        />
                        {emailError.error && (
                            <div className='w-full flex items-center justify-start gap-2 text-red-500 text-sm font-medium max-sm:text-xs'>
                                <MdReportGmailerrorred className='text-lg max-sm:text-base text-orange-500' />
                                {emailError.message}
                            </div>
                        )}
                    </label>

                    <label className='w-full flex flex-col relative'>
                        <div className='w-full flex items-center justify-between'>
                            <p className='text-base max-md:text-sm font-semibold text-gray-500'>Password</p>
                        </div>
                        <input
                            type={isVisiablePass ? 'text' : 'password'}
                            name='password'
                            value={formData.password}
                            onChange={inputHandler}
                            placeholder='Password'
                            className={`text-lg max-md:text-base font-semibold py-2 max-sm:px-2 pl-4 pr-12 bg-[#333] text-white placeholder:text-gray-500 rounded outline-none border-2 ${passwordError.error ? 'border-red-500' : 'border-transparent transition duration-300 ease-in hover:border-yellow-300 focus:border-yellow-500'}`}
                        />
                        <div className='absolute top-8 right-2 text-3xl max-md:text-xl cursor-pointer text-gray-500' onClick={() => setIsVisiablePass(!isVisiablePass)}>
                            {isVisiablePass ? <IoMdEyeOff /> : <IoMdEye />}
                        </div>
                        {passwordError.error && (
                            <div className='w-full flex items-center justify-start gap-2 text-red-500 text-sm font-medium max-sm:text-xs'>
                                <MdReportGmailerrorred className='text-lg text-orange-500' />
                                {passwordError.message}
                            </div>
                        )}
                    </label>

                    {error !== '' && (
                        <div className='w-full flex items-center justify-start gap-2 py-1 px-3 text-md max-md:text-sm max-sm:text-xs text-red-500 border border-red-500 font-semibold'>
                            {error}
                        </div>
                    )}

                    <div className='w-full flex justify-start'>
                        <button className='w-[150px] h-[40px] text-lg max-md:text-base flex justify-center items-center font-extrabold text-white border-2 border-blue-500 bg-blue-500 py-1 px-4 rounded-3xl transition duration-300 ease-in hover:bg-transparent' onClick={signupHandler}>
                            {isLoading ? <MdLoader />: 'Sign Up'}
                        </button>
                    </div>
                </div>

                <div className='w-full flex items-center justify-start gap-2'>
                    <p className='text-md max-md:text-sm text-[#444] font-medium'>Already have an account?</p>
                    <p className='text-md max-md:text-sm font-semibold text-blue-500 cursor-pointer transition duration-200 ease-in hover:underline' onClick={() => navigate('/')}>Admin Log in</p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;