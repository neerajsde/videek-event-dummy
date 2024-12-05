import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const { adminData, webData } = useContext(AppContext);
    const [greeting, setGreeting] = useState('');
    const [currentTime, setCurrentTime] = useState('');

    // Function to determine the greeting based on the current hour
    const updateGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) {
            setGreeting('Good Morning');
        } else if (hour < 18) {
            setGreeting('Good Afternoon');
        } else {
            setGreeting('Good Evening');
        }
    };

    // Function to update real-time
    const updateTime = () => {
        const time = new Date().toLocaleTimeString(); // Formats time as HH:MM:SS
        setCurrentTime(time);
    };

    useEffect(() => {
        updateGreeting(); // Set initial greeting
        updateTime(); // Set initial time

        // Update the time every second
        const interval = setInterval(() => {
            updateTime();
        }, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='w-full flex justify-between items-center bg-[#111] border-b border-[#333] px-2'>
            {/* Logo Section */}
            <div className='w-[300px] h-auto'>
                <img
                    src={`${process.env.REACT_APP_BASE_URL}/webImg${webData?.logo}`}
                    alt='logo'
                    className='w-[150px] h-full'
                />
            </div>

            {/* Greetings and Real-Time Section */}
            <div className='w-full flex justify-between items-center'>
                <div className='text-lg text-white font-semibold'>
                    {greeting}, <span className='text-gray-400 font-normal'>{adminData?.name || 'Admin'}</span>
                </div>
                <div className='pr-4 text-white text-lg'>{currentTime}</div>
            </div>
        </div>
    );
};

export default Navbar;
