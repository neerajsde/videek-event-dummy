import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext';
import { LuLogOut } from "react-icons/lu";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
    const { userData, setIsLoggedIn, setActiveUserMenu, setUserData } = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("DJevents");
        setIsLoggedIn(false);
        setUserData(null);
        navigate("/");
        setActiveUserMenu(false);
        toast.success("Log Out Successfully");
    };

  return (
    <div className='w-full flex flex-col'>
        <div className='w-full flex justify-start items-center gap-2 px-4 py-2 border-b-2 border-gray-300'>
            <div className='w-[40px] h-[40px] rounded-full border-2 border-gray-500'>
              <img src={userData.user_img} alt='user-img' className='w-full h-full rounded-full'/>
            </div>

            <div className='flex flex-col gap-0'>
                <span className='text-base text-black font-semibold'>{userData.name}</span>
                <span className='text-sm text-gray-500 border'>{userData.email || userData.mobile}</span>
            </div>
        </div>

        <div className='w-full flex justify-start items-center py-2 bg-white cursor-pointer transition duration-200 ease-in hover:text-blue-600'>
            <div className='w-[2px] h-[40px] bg-blue-500'></div>
            <span className='w-full px-4 py-2 bg-blue-100'>User Settings</span>
        </div>

        <div onClick={handleLogout} className='w-full px-4 py-3 border-t-2 border-gray-300 flex justify-start items-center gap-4 transition duration-200 ease-in hover:text-red-500 cursor-pointer'>
            <LuLogOut/>
            <span>Logout</span>
        </div>
    </div>
  )
}

export default UserMenu