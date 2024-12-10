import React, { useContext } from 'react';
import { IoClose } from "react-icons/io5";
import { AppContext } from '../../context/AppContext';

const ViewContacts = () => {
    const {viewContactUs, setViewContactUs} = useContext(AppContext);

  return (
    <div className='w-[500px] bg-stone-200 flex flex-col p-4 gap-4 rounded'>
        <div className='w-full flex justify-between items-center border-b border-gray-200'>
            <h1 className='text-xl font-semibold text-blue-600'>Client Details</h1>
            <button
                onClick={() => setViewContactUs({ isActive: false, data: null })}
                className="text-red-500 hover:text-red-600 text-3xl p-1 rounded-full hover:bg-red-50"
                aria-label="Close"
            >
                <IoClose />
            </button>
        </div>
        <div className='w-full flex flex-col gap-2'>
            <div className='w-full flex justify-start items-center gap-2'>
                <span className='text-lg text-gray-500'>Name:</span>
                <span className='text-lg text-black font-semibold'>{viewContactUs?.data.name}</span>
            </div>
            <div className='w-full flex justify-start items-center gap-2'>
                <span className='text-lg text-gray-500'>Mobile:</span>
                <span className='text-lg text-black font-semibold'>{viewContactUs?.data.phone}</span>
            </div>
            <div className='w-full flex justify-start items-center gap-2'>
                <span className='text-lg text-gray-500'>Email:</span>
                <span className='text-lg text-black font-semibold'>{viewContactUs?.data.email}</span>
            </div>
            <div className='w-full flex justify-start items-center gap-2'>
                <span className='text-lg text-gray-500'>Submitted Date:</span>
                <span className='text-lg text-black font-semibold'>{viewContactUs?.data.date}</span>
            </div>

            <div className='w-full flex justify-start items-center gap-2'>
                <span className='text-lg text-gray-500'>Submitted Time:</span>
                <span className='text-lg text-black font-semibold'>{viewContactUs?.data.time}</span>
            </div>

            <div className='w-full flex justify-start items-center gap-2'>
                <span className='text-lg text-gray-500'>Subject:</span>
                <span className='text-lg text-black font-semibold'>{viewContactUs?.data.subject}</span>
            </div>

            <div className='w-full flex justify-start items-center gap-2'>
                <span className='text-lg text-gray-500'>Message:</span>
                <span className='text-lg text-black font-semibold'>{viewContactUs?.data.message}</span>
            </div>
        </div>
    </div>
  )
}

export default ViewContacts