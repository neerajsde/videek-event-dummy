import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import MdLoader from '../../components/spinner/MdLoader';
import { MdEdit } from "react-icons/md";
import { AppContext } from '../../context/AppContext';
import { FaUser } from "react-icons/fa";
import toast from 'react-hot-toast';
import Spinner from '../spinner/Spinner';

const UserSetting = () => {
    const {userData} = useContext(AppContext);
    const [errorImg, setErrorImg] = useState("");
    const [successImg, setSuccessImg] = useState("");
    const [imgLoading, setImgLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [submitLoading, setSubmitLoading] = useState(false);
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [MainOtp, setMainOtp] = useState('');
    const [mailError, setMailError] = useState('');
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        designation:'',
        phone: '',
        address:'',
        profilePic: '',
        isVarified: false, 
        otp: ''
    });

    function inputHandler(e){
        const {name, value} = e.target;
        if(name === 'otp' && value.length > 6) return;
        if(name === 'phone' && value.length > 10) return;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const fetchUserDetail = async(userId) => {
        try{
            setLoading(true);
            const token = localStorage.getItem('DJevents');
            if (!token) {
                setErrorImg('Unauthorized. Please log in again.');
                return;
            }
            const response = await fetch(
                `${process.env.REACT_APP_BASE_URL}/user/details/${userId}`,
                {
                    method:'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            const data = await response.json();
            if(data.success){
                setFormData((prevState) => ({
                    ...prevState,
                    name: data.data.name,
                    email: data.data.email,
                    phone: data.data.phone ? Number(data.data.phone.slice(-10)) : '',
                    designation: data.data.designation,
                    address: data.data.address,
                    profilePic: data.data.user_img,
                    isVarified: data.data.isVerified
                }))
            }
            else{
                toast.error(data.message);
            }
        } catch(err){
            toast.error(err.message)
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if(userData){
            fetchUserDetail(userData.user_id);
        }
    },[userData])

    const ProfilePicChangeHandler = async (img) => {
        setSuccessImg('');
        setErrorImg('');
        try {
            setImgLoading(true);
            // Get the logo file from the form
            const formData = new FormData();

            // Check if a file is selected
            if (!img) {
                setErrorImg('Please select a Profile Pic to upload');
                return;
            }
            formData.append('user_id', userData.user_id);
            formData.append('img', img);

            // Get the admin token from localStorage (if required)
            const token = localStorage.getItem('DJevents');
            if (!token) {
                setErrorImg('Unauthorized. Please log in again.');
                return;
            }

            // Send the request to the backend
            const response = await axios.put(
                `${process.env.REACT_APP_BASE_URL}/user/profile-pic/change`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            // Handle success response
            if (response.data.success) {
                setFormData((prevState) => ({
                    ...prevState,
                    profilePic: response.data.data
                }));
                setSuccessImg('Profile Picture updated successfully');
            } else {
                setErrorImg(response.data.message);
            }
        } catch (error) {
            setErrorImg(error.response?.data?.message || error.message);
        } finally{
            setImgLoading(false);
        }
    };

    const VerifyUserByEmail = async() => {
        setMailError('');
        if(!formData.email){
            setMailError('Please enter your email');
            return;
        }
        try{
            setVerifyLoading(true);
            const token = localStorage.getItem('DJevents');
            if (!token) {
                setErrorImg('Unauthorized. Please log in again.');
                return;
            }
            const response = await fetch(
                `${process.env.REACT_APP_BASE_URL}/user/verify/email`,
                {
                    method:'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: userData.user_id, email: formData.email
                    })
                }
            );
            const data = await response.json();
            if(data.success){
                setMainOtp(data.otp);
                setMailError('Please enter otp');
                toast.success(data.message);
            }
            else{
                setMailError(data.message);
            }
        } catch(err){
            setMailError(err.message);
        } finally{
            setVerifyLoading(false);
        }
    }

    const VerifyOtp  = async () => {
        setMailError('');
        if(formData.otp !== MainOtp){
            setMailError('wrong otp');
            return;
        }
        try{
            setVerifyLoading(true);
            const token = localStorage.getItem('DJevents');
            if (!token) {
                setErrorImg('Unauthorized. Please log in again.');
                return;
            }
            const response = await fetch(
                `${process.env.REACT_APP_BASE_URL}/user/verify/otp`,
                {
                    method:'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: userData.user_id
                    })
                }
            );
            const data = await response.json();
            if(data.success){
                setMainOtp('');
                setMailError('');
                setFormData((prevState) => ({
                    ...prevState,
                    isVarified: true
                }))
                toast.success(data.message);
            }
            else{
                setMailError(data.message);
            }
        } catch(err){
            setMailError(err.message);
        } finally{
            setVerifyLoading(false);
        }
    }

    useEffect(() => {
        if(formData.otp?.length === 6){
            VerifyOtp();
        }
    },[formData.otp]);

    const saveDataHandler = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try{
            setSubmitLoading(true);
            const token = localStorage.getItem('DJevents');
            if (!token) {
                setErrorImg('Unauthorized. Please log in again.');
                return;
            }
            const response = await fetch(
                `${process.env.REACT_APP_BASE_URL}/user/update`,
                {
                    method:'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: userData.user_id,
                        ...formData
                    })
                }
            );
            const data = await response.json();
            if(data.success){
                setSuccess(data.message);
            }
            else{
                setError(data.message);
            }
        } catch(err){
            setError(err.message);
        } finally{
            setSubmitLoading(false);
        }
    }

    if(loading){
        return (
            <div className='w-full min-h-[200px] flex justify-center items-center'><Spinner/></div>
        )
    }
  return (
    <div className='w-full flex flex-col gap-4 p-4 max-md:p-2 max-sm:p-0'>
        <div className="w-full flex justify-center items-center">
            <div className="flex flex-col gap-2">
                <div className="w-full flex flex-col justify-center items-center gap-1">
                    <div 
                        className="w-[100px] h-[100px] shadow-md border-4 border-blue-600 rounded-full overflow-hidden cursor-pointer flex justify-center items-center bg-white relative group" 
                        onClick={() => document.getElementById("profileInput").click()}
                    >
                        {
                            formData.profilePic ?
                            (
                                <img 
                                    src={
                                        formData.profilePic.slice(0,4) !== 'http' 
                                            ? `${process.env.REACT_APP_BASE_URL}${formData.profilePic}`
                                            :
                                                `https://api.dicebear.com/5.x/initials/svg?seed=${userData?.name}`
                                    } 
                                    alt="Profile Pic" 
                                    className="w-full h-full object-cover"
                                />
                            ) : 
                            (
                                <FaUser className='text-4xl text-gray-400'/>
                            )
                        }
                        {imgLoading ? (
                            <div className='absolute top-0 left-0 w-full h-full bg-[#000000b5] flex justify-center items-center'>
                                <MdLoader/>
                            </div>
                        ) : 
                        (
                            <div className='hidden absolute top-0 left-0 w-full h-full bg-[#0000009f] transition-all duration-200 ease-in group-hover:flex justify-center items-center'>
                                <MdEdit className='text-2xl text-white'/>
                            </div>
                        )}
                    </div>
                    <input
                        id="profileInput"
                        type="file"
                        name="profile"
                        onChange={(e) => {
                            ProfilePicChangeHandler(e.target.files[0]);
                        }}
                        accept="image/*"
                        required
                        className="hidden"
                    />
                    <label className="text-gray-400 text-base font-medium text-center">
                        Change Profile Pic
                    </label>
                </div>
                <div className="w-full flex justify-start items-center gap-4">
                    {errorImg && <p className="text-sm font-semibold text-red-600">{errorImg}</p>}
                    {successImg && (
                        <p className="text-sm font-semibold text-green-600">
                            {successImg}
                        </p>
                    )}
                </div>
            </div>
        </div>
        <form onSubmit={saveDataHandler} className='w-full flex flex-col gap-4'>
            <div className='w-full flex max-md:flex-col justify-between gap-8 max-md:gap-4'>
                <div className='w-full flex flex-col'>
                    <label className='w-full flex justify-start text-sm text-gray-400'>Name<span className='text-red-500'>*</span></label>
                    <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={inputHandler}
                        required
                        placeholder='Your Name'
                        className='w-full py-2 px-3 border border-gray-300 rounded-sm focus:border-blue-500 outline-none text-base text-black'
                    />
                </div>

                <div className='w-full flex flex-col'>
                    <label className='w-full flex justify-start text-sm text-gray-400'>Designation<span className='text-red-500'>*</span></label>
                    <input
                        type='text'
                        name='designation'
                        value={formData.designation}
                        onChange={inputHandler}
                        required
                        placeholder='Your Profession'
                        className='w-full py-2 px-3 border border-gray-300 rounded-sm focus:border-blue-500 outline-none text-base text-black'
                    />
                </div>
            </div>

            <div className='w-full flex max-md:flex-col justify-between gap-8 max-md:gap-4'>
                <div className='w-full flex flex-col relative'>
                    <label className='w-full flex justify-start text-sm text-gray-400'>Phone<span className='text-red-500'>*</span></label>
                    <input
                        type='number'
                        name='phone'
                        value={formData.phone}
                        onChange={inputHandler}
                        required
                        placeholder='Your Phone No'
                        className='w-full py-2 px-3 pl-10 border border-gray-300 rounded-sm focus:border-blue-500 outline-none text-base text-black'
                    />
                    <div className=' absolute top-7 left-2 text-base'>+91</div>
                </div>

                <div className='w-full flex flex-col relative'>
                    <label className='w-full flex justify-start text-sm text-gray-400'>{MainOtp ? 'Email OTP' : 'Email'}<span className='text-red-500'>*</span></label>
                    <input
                        type={MainOtp ? 'text' : 'mail'}
                        name={MainOtp ? 'otp' : 'email'}
                        value={MainOtp ? formData.otp : formData.email}
                        onChange={inputHandler}
                        required
                        placeholder={MainOtp ? 'Enter 6-digit OTP' : 'Your email'}
                        className={`w-full py-2 px-3 pr-[80px] border rounded-sm outline-none text-base text-black ${mailError ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'} ${formData.isVarified && 'cursor-not-allowed bg-gray-100'}`}
                        readOnly={formData.isVarified}
                        disabled={formData.isVarified}
                    />
                    {!formData.isVarified ? 
                    (
                        <button onClick={VerifyUserByEmail} className={`absolute top-7 right-2 text-blue-500 bg-blue-100 py-1 px-2 text-sm rounded-full transition duration-200 ease-in ${verifyLoading ? 'cursor-not-allowed' : 'hover:bg-blue-600 hover:text-white'}`}>{verifyLoading ? 'Please wait' : 'Verify'}</button>
                    )
                    :
                    (
                        <div className='absolute top-7 right-2 text-green-500 bg-green-100 py-1 px-2 text-sm rounded-full cursor-not-allowed'>Verified</div>
                    )}

                    {
                        mailError && (<span className='text-xs text-red-500 px-2'>{mailError}</span>)
                    }
                </div>
            </div>

            <div className='w-full flex flex-col'>
                <label className='w-full flex justify-start text-sm text-gray-400'>Address<span className='text-red-500'>*</span></label>
                <input
                    type='text'
                    name='address'
                    value={formData.address}
                    onChange={inputHandler}
                    required
                    placeholder='Enter Your Address'
                    className='w-full py-2 px-3 border border-gray-300 rounded-sm focus:border-blue-500 outline-none text-base text-black'
                />
            </div>

            <div className='w-full flex justify-start items-center gap-4 max-md:flex-col max-md:gap-4'>
                <button type='submit' className='w-[150px] max-sm:w-full h-[40px] flex justify-center items-center bg-blue-500 border-none outline-none transition duration-200 ease-in hover:bg-blue-700 text-white text-base font-semibold rounded-sm'>
                    {submitLoading ? (<MdLoader/>) : 'Save'}
                </button>
                {
                    error && (<span className='text-sm text-red-600 font-semibold'>{error}</span>)
                }
                {
                    success && (<span className='text-sm text-green-600 font-semibold'>{success}</span>)
                }
            </div>
        </form>
    </div>
  )
}

export default UserSetting