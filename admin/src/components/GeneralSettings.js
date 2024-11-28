import React, { useState } from 'react';
import MdLoader from './spinner/MdLoader';
import axios from 'axios';
import toast from 'react-hot-toast'

const GeneralSettings = () => {
    const [error, setError] = useState("");
    const [errorImg, setErrorImg] = useState("");
    const [successImg, setSuccessImg] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [imgLoading, setImgLoading] = useState(false);
    const [logo, setLogo] = useState(null);
    const [formData, setFormData] = useState({
        title:'',
        email:'',
        alt_email:'',
        phone:'',
        whatsapp:'',
        logo: '',
        fb_url:'',
        ins_url:'',
        twi_url:'',
        yt_url:'',
        address:'',
        meta_keywords:'',
        meta_desc:'',
        google_analytics:'',
        facebook_analytics:''
    })

    function inputHandler(e){
        const name = e.target.name;
        const value = e.target.value;
        if(name === 'phone' && value > 9999999999) return;
        if(name === 'whatsapp' && value > 9999999999) return;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleFileChange = (e) => {
        setLogo(e.target.files[0]);
    };

    const fetchGeneralSettingData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/web/data`);
            if (response.data.success) {
                setFormData(response.data.data); // Populate formData with API response
            } else {
                toast.error(response.data.message || 'Failed to fetch settings data');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'An error occurred while fetching data');
            console.error('Error in fetchGeneralSettingData:', err.message);
        }
    };

    useState(() => {
        fetchGeneralSettingData();
    },[]);

    const submitGeneralSettings = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setError('');

        try {
            setLoading(true);
            const token = localStorage.getItem('VideekAdmin');
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };

            // Make the API call to submit settings
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/admin/setting`,
                formData,
                config
            );

            if (response.data.success) {
                setSuccessMessage(response.data.message);
                setFormData(response.data.data);
            } else {
                setError(response.data.message || 'Failed to update settings');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while submitting settings');
        } finally{
            setLoading(false);
        }
    };


    const LogoChangeHandler = async () => {
        setSuccessImg('');
        setErrorImg('');
        try {
            setImgLoading(true);
            // Get the logo file from the form
            const formData = new FormData();
            const logoFile = logo;

            // Check if a file is selected
            if (!logoFile) {
                setErrorImg('Please select a logo to upload');
                return;
            }

            formData.append('img', logoFile);

            // Get the admin token from localStorage (if required)
            const token = localStorage.getItem('VideekAdmin');
            if (!token) {
                setErrorImg('Unauthorized. Please log in again.');
                return;
            }

            // Send the request to the backend
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/general-settings/change-logo`,
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
                setFormData(response.data.data);
                setSuccessImg('Logo updated successfully');
            } else {
                setErrorImg(response.data.message);
            }
        } catch (error) {
            setErrorImg(error.response?.data?.message || error.message);
        } finally{
            setImgLoading(false);
        }
    };


  return (
    <div className='w-full flex flex-col bg-[#111] rounded-sm !border !border-[#333] p-4 gap-6'>
        <h2 className="text-2xl font-bold text-cyan-600">Update General Setting</h2>
        {/* logo  */}
        <div className="w-full flex justify-between items-start gap-8">
            <div className='w-full flex flex-col gap-2'>
                <div className="w-full flex flex-col gap-1">
                    <label className="text-gray-400 text-base font-medium">Upload new logo</label>
                    <input
                        type="file"
                        name="logo" 
                        onChange={handleFileChange}
                        accept="image/*"
                        required
                        className="w-full h-[45px] placeholder:text-gray-700 py-1 px-2 bg-[#111] border-2 border-[#333] border-dashed outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                    />
                </div>
                <div className="w-full flex justify-start items-center gap-4">
                    <div className="flex gap-1">
                        <button 
                            onClick={LogoChangeHandler}
                            className="h-[45px] w-[200px] rounded-sm flex justify-center items-center py-2 px-4 border-none outline-none text-lg text-white bg-cyan-600 transition duration-200 ease-in hover:bg-cyan-800"
                        >
                        {imgLoading ? <MdLoader /> : "Upload"}
                        </button>
                    </div>
                    {/* Error and Success Messages */}
                    {errorImg && <p className="text-sm font-semibold text-red-600">{errorImg}</p>}
                    {successImg && (
                        <p className="text-sm font-semibold text-green-600">
                            {successImg}
                        </p>
                    )}
                </div>
            </div>
            <div className="w-full flex flex-col gap-1">
                <img 
                    src={`${process.env.REACT_APP_BASE_URL}/webImg${formData.logo}`} 
                    alt='logo'
                    className='w-[200px] h-auto'
                />
            </div>
        </div>
        {/* info */}
        <form onSubmit={submitGeneralSettings} className='w-full flex flex-col gap-4'>
            <div className="w-full flex flex-col gap-1">
                <label className="text-gray-400 text-base font-medium">Website Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={inputHandler}
                    required
                    placeholder="enter web meta title"
                    className="w-full py-2 px-4 bg-[#111] border placeholder:text-gray-700 border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                />
            </div>
            <div className="w-full flex justify-between gap-4">
                <div className="w-full flex flex-col gap-1">
                    <label className="text-gray-400 text-base font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={inputHandler}
                        required
                        placeholder="enter email"
                        className="w-full py-2 px-4 bg-[#111] border placeholder:text-gray-700 border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                    />
                </div>
                <div className="w-full flex flex-col gap-1">
                    <label className="text-gray-400 text-base font-medium">Email Alternative</label>
                    <input
                        type="email"
                        name="alt_email"
                        value={formData.alt_email}
                        onChange={inputHandler}
                        required
                        placeholder="enter another email"
                        className="w-full py-2 px-4 bg-[#111] border placeholder:text-gray-700 border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                    />
                </div>
            </div>
            <div className="w-full flex justify-between gap-4">
                <div className="w-full flex flex-col gap-1 relative">
                    <label className="text-gray-400 text-base font-medium">Phone Number</label>
                    <input
                        type="number"
                        name="phone"
                        value={formData.phone}
                        onChange={inputHandler}
                        required
                        placeholder="enter mobile no"
                        className="w-full py-2 px-4 pl-14 bg-[#111] border placeholder:text-gray-700 border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                    />
                    <div className='absolute bottom-2 left-3 text-lg text-gray-400'>+91</div>
                </div>
                <div className="w-full flex flex-col gap-1 relative">
                    <label className="text-gray-400 text-base font-medium">WhatsApp</label>
                    <input
                        type="number"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={inputHandler}
                        required
                        placeholder="enter whatsapp no"
                        className="w-full py-2 px-4 pl-14 bg-[#111] border placeholder:text-gray-700 border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                    />
                    <div className='absolute bottom-2 left-3 text-lg text-gray-400'>+91</div>
                </div>
            </div>
            <div className="w-full flex justify-between gap-4">
                <div className="w-full flex flex-col gap-1">
                    <label className="text-gray-400 text-base font-medium">Facebook Url</label>
                    <input
                        type="text"
                        name="fb_url"
                        value={formData.fb_url}
                        onChange={inputHandler}
                        required
                        placeholder="paste your facebook profile url"
                        className="w-full py-2 px-4 bg-[#111] border placeholder:text-gray-700 border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                    />
                </div>
                <div className="w-full flex flex-col gap-1">
                    <label className="text-gray-400 text-base font-medium">Instagram Url</label>
                    <input
                        type="text"
                        name="ins_url"
                        value={formData.ins_url}
                        onChange={inputHandler}
                        required
                        placeholder="paste your instagram profile url"
                        className="w-full py-2 px-4 bg-[#111] border placeholder:text-gray-700 border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                    />
                </div>
            </div>
            <div className="w-full flex justify-between gap-4">
                <div className="w-full flex flex-col gap-1">
                    <label className="text-gray-400 text-base font-medium">Twitter Url</label>
                    <input
                        type="text"
                        name="twi_url"
                        value={formData.twi_url}
                        onChange={inputHandler}
                        required
                        placeholder="paste your twitter profile url"
                        className="w-full py-2 px-4 bg-[#111] border placeholder:text-gray-700 border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                    />
                </div>
                <div className="w-full flex flex-col gap-1">
                    <label className="text-gray-400 text-base font-medium">YouTube Url</label>
                    <input
                        type="text"
                        name="yt_url"
                        value={formData.yt_url}
                        onChange={inputHandler}
                        required
                        placeholder="paste your youtube profile url"
                        className="w-full py-2 px-4 bg-[#111] border placeholder:text-gray-700 border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                    />
                </div>
            </div>
            <div className="w-full flex flex-col gap-1">
                <label className="text-gray-400 text-base font-medium">Address</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={inputHandler}
                    required
                    placeholder="enter company location"
                    className="w-full py-2 px-4 bg-[#111] border placeholder:text-gray-700 border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                />
            </div>
            {/* meta  */}
            <div className="w-full flex flex-col gap-1">
                <label className="text-gray-400 text-base font-medium">Meta Keywords</label>
                <input
                    type="text"
                    name="meta_keywords"
                    value={formData.meta_keywords}
                    onChange={inputHandler}
                    required
                    placeholder="enter meta keywords"
                    className="w-full py-2 px-4 bg-[#111] border placeholder:text-gray-700 border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                />
            </div>
            <div className="w-full flex flex-col gap-1">
                <label className="text-gray-400 text-base font-medium">Meta Description</label>
                <input
                    type="text"
                    name="meta_desc"
                    value={formData.meta_desc}
                    onChange={inputHandler}
                    required
                    placeholder="enter meta descriprion"
                    className="w-full py-2 px-4 bg-[#111] border placeholder:text-gray-700 border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                />
            </div>
            <div className="w-full flex flex-col gap-1">
                <label className="text-gray-400 text-base font-medium">Google Analytics</label>
                <input
                    type="text"
                    name="google_analytics"
                    value={formData.google_analytics}
                    onChange={inputHandler}
                    required
                    placeholder="enter google analytics"
                    className="w-full py-2 px-4 bg-[#111] border placeholder:text-gray-700 border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                />
            </div>
            <div className="w-full flex flex-col gap-1">
                <label className="text-gray-400 text-base font-medium">Facebook Analytics</label>
                <input
                    type="text"
                    name="facebook_analytics"
                    value={formData.facebook_analytics}
                    onChange={inputHandler}
                    required
                    placeholder="enter facebook analytics"
                    className="w-full py-2 px-4 bg-[#111] border placeholder:text-gray-700 border-[#333] outline-none text-lg text-white focus:border-yellow-600 rounded-sm"
                />
            </div>
            <div className="w-full flex justify-start items-center gap-4">
                <div className="flex gap-1">
                    <button
                    type="submit"
                    className="h-[45px] w-[200px] rounded-sm flex justify-center items-center py-2 px-4 border-none outline-none text-lg text-white bg-cyan-600 transition duration-200 ease-in hover:bg-cyan-800"
                    >
                    {loading ? <MdLoader /> : "Submit"}
                    </button>
                </div>
                {/* Error and Success Messages */}
                {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
                {successMessage && (
                    <p className="text-sm font-semibold text-green-600">
                        {successMessage}
                    </p>
                )}
            </div>
        </form>
    </div>
  )
}

export default GeneralSettings