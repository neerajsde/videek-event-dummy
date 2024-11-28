import React, { useContext } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import { TbCloudHeart } from "react-icons/tb";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { BiSolidDashboard } from "react-icons/bi";
import { AppContext } from "../../context/AppContext";

const WhyVideek = () => {
  const {webData} = useContext(AppContext);

  return (
    <div className="w-full flex flex-col p-8 max-md:p-6 max-sm:p-4 pb-10 max-sm:py-8 gap-8 max-sm:gap-4 bg-white">
      <h3 className="text-[#AB1C49] font-bold text-2xl text-center max-sm:text-lg">
        Why {webData?.title} ?
      </h3>
      <div className="w-full flex justify-between items-center gap-4 flex-wrap">
        <div className="w-[280px] max-sm:w-full rounded-xl flex flex-col gap-4 p-4 bg-blue-100">
          <div className="w-full flex flex-col">
            <div className="relative w-full">
              <MdVerified className="text-7xl text-[#b0afaf37]" />
              <FaMapLocationDot className=" absolute top-4 left-4 text-4xl text-blue-400" />
            </div>

            <div className="text-lg max-md:text-base max-sm:text-sm font-semibold text-gray-500">
              <span className="font-extrabold text-black">{`2.8 Lakh+`}</span>{" "}
              trusted vendors across{" "}
              <span className="font-extrabold text-black">{`40+ Cities`}</span>
            </div>
          </div>
        </div>

        <div className="w-[280px] max-sm:w-full rounded-xl flex flex-col gap-4 p-4 bg-emerald-100">
          <div className="w-full flex flex-col">
            <div className="relative w-full">
              <MdVerified className="text-7xl text-[#b0afaf37]" />
              <TbCloudHeart className="absolute top-[18px] left-[18px] text-4xl text-emerald-400" />
            </div>

            <div className="text-lg  max-md:text-base max-sm:text-sm font-semibold text-gray-500">
              <span className="font-extrabold text-black">{`2.3 million`}</span>{" "}
              connetions with{" "}
              <span className="font-extrabold text-black">{`60K+`}</span>{" "}
              vendors
            </div>
          </div>
        </div>

        <div className="w-[280px] max-sm:w-full rounded-xl flex flex-col gap-4 p-4 bg-purple-100">
          <div className="w-full flex flex-col">
            <div className="relative w-full">
              <MdVerified className="text-7xl text-[#b0afaf37]" />
              <HiOutlineEmojiHappy className="absolute top-[18px] left-[18px] text-4xl text-purple-400" />
            </div>

            <div className="text-lg max-md:text-base max-sm:text-sm font-semibold text-gray-500">
              <span className="font-extrabold text-black">{`20 Lakh+`}</span>{" "}
              and counting{" "}
              <span className="font-extrabold text-black">{`happy`}</span>{" "}
              customers
            </div>
          </div>
        </div>

        <div className="w-[280px] max-sm:w-full rounded-xl flex flex-col gap-4 p-4 bg-lime-100">
          <div className="w-full flex flex-col">
            <div className="relative w-full">
              <MdVerified className="text-7xl text-[#b0afaf37]" />
              <BiSolidDashboard className="absolute top-[18px] left-[18px] text-4xl text-pink-400" />
            </div>

            <div className="text-lg max-md:text-base max-sm:text-sm font-semibold text-gray-500">
              Choose best vendors based on{" "}
              <span className="font-extrabold text-black">{`user reviews`}</span>{" "}
              vendors
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyVideek;
