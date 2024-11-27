import React, { useEffect, useState } from "react";
import { LuMapPin } from "react-icons/lu";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../spinner/Spinner";

const RealWeddings = () => {
    const [isLoading, setIsLoading] = useState(false);
  const [realWeddingData, setRealWeddingData] = useState(null);

  const getRealWeddingsCategory = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/weddings`
      );

      if (response.data.success) {
        setRealWeddingData(response.data.data);
      } else {
        setRealWeddingData(null);
      }
    } catch (error) {
      setRealWeddingData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRealWeddingsCategory();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full flex flex-col justify-center items-center gap-2">
        <Spinner />
        <h2 className="text-2xl font-semibold text-gray-400">
          We try to get Real Weddings data...
        </h2>
      </div>
    );
  }

  if (!realWeddingData) {
    return (
      <div className="text-2xl font-semibold text-gray-400">
        ...Empty Real Weddings
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col py-8 px-8 gap-8 max-lg:px-0 max-sm:px-4 max-sm:gap-4">
      <div className="w-full flex flex-col items-center">
        <h4 className="text-2xl max-sm:text-lg font-bold text-black">
          Real Weddings
        </h4>
        <p className="text-sm max-sm:text-xs font-normal text-gray-500 max-md:text-center">
          Get inspired by real couples in your area and find wedding suppliers
          you love.
        </p>
      </div>

      <div className="w-full flex justify-center gap-4 px-6 max-md:px-0 max-md:flex-col">
        {realWeddingData &&
          realWeddingData.map((item) => (
            <Link
              key={item.id}
              to={`/real_weddings/${item.couple_name.replaceAll(/\s+/g, '-').toLowerCase()}`}
              className="w-full flex flex-col border border-[#AB1C49] rounded-xl gap-1 max-sm:gap-[2px]"
            >
              <div className="w-full h-[220px] max-sm:h-[180px] relative">
                <img
                  src={`${process.env.REACT_APP_BASE_URL}/weddings${item.images[0]}`}
                  alt={item.couple_name}
                  className="w-full h-full object-cover border-t rounded-t-xl"
                />
                <div className="w-full h-[100px] absolute bottom-0 left-0 real-wedding-card flex flex-col justify-end items-end p-4">
                  <h5 className="text-lg max-sm:text-base font-bold text-[#F5C7A9]">
                    {item.couple_name}
                  </h5>
                  <p className="text-sm max-sm:text-xs font-normal text-gray-200 flex items-center justify-center gap-1">
                    <LuMapPin /> {item.location}
                  </p>
                </div>
              </div>
              <div className="w-full h-[100px] grid grid-cols-3 gap-1 max-sm:gap-[2px]">
                <img
                  src={`${process.env.REACT_APP_BASE_URL}/weddings${item.images[1]}`}
                  alt={item.name}
                  className="w-full h-[100px] object-cover rounded-bl-xl"
                />
                <img
                  src={`${process.env.REACT_APP_BASE_URL}/weddings${item.images[2]}`}
                  alt={item.name}
                  className="w-full h-[100px] object-cover"
                />
                <div className="w-full h-full rounded-br-xl relative ">
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}/weddings${item.images[3]}`}
                    alt={item.name}
                    className="w-full h-[100px] object-cover rounded-br-xl"
                  />
                  <div className="w-full h-full absolute top-0 left-0 bg-[#000000a0] rounded-br-xl flex justify-center items-center">
                    <div className="text-2xl max-sm:text-xl font-bold text-white">{`+${item.images.length - 4}`}</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>

      <div></div>
    </div>
  );
};

export default RealWeddings;
