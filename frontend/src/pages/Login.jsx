import React from 'react';
import { FaFacebookF } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="w-[500px] flex items-center justify-center bg-white rounded-lg mt-10 max-sm:mt-0">
      <div className="w-full flex flex-col gap-4 p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Sign In/Sign Up</h2>
        <form className='w-full flex flex-col gap-4'>
          <div className="">
            <input
              type="text"
              id="email"
              placeholder="Enter email or mobile*"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700"
            />
          </div>
          <div className="relative my-4 flex items-center justify-center">
            <span className="absolute bg-white px-2 text-gray-500">OR</span>
            <hr className="w-full border-gray-300" />
          </div>
          <div className="flex justify-between items-center mb-6">
            <button
              type="button"
              className="flex items-center justify-center w-full px-4 py-2 mr-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100"
            >
              <FaFacebookF className="mr-2 text-blue-600" />
              Facebook
            </button>
            <button
              type="button"
              className="flex items-center justify-center w-full px-4 py-2 ml-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100"
            >
              <FcGoogle className="mr-2" />
              Google
            </button>
          </div>
        </form>
        <div className="w-full flex justify-center items-center gap-4">
          <p className="text-sm text-gray-600">Are you a vendor?</p>
          <Link
            to={`vendor.${window.origin.replace('https://', '').replace('http://','')}/`}
            className="mt-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white"
          >
            Business Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
