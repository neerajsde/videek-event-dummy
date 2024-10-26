import React, { useState, useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from "axios";

const VendorCategory = () => {
  const [categoriesData, setCategoriesData] = useState(null);
  const [currPage, setCurrPage] = useState(0);

  const prevBtnHandler = () => {
    if (currPage === 0) {
      return;
    } else {
      setCurrPage(currPage - 1);
    }
  };

  const nextBtnHandler = () => {
    if (currPage + 1 === categoriesData[currPage].totalPages) {
      return;
    } else {
      setCurrPage(currPage + 1);
    }
  };

  const getVendorCategory = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/vendor/category-data`);

      if (response.data.success) {
        setCategoriesData(response.data.data);
      } else {
        setCategoriesData(null);
      }
    } catch (error) {
      setCategoriesData(null);
    }
  };

  useEffect(() => {
    if (!categoriesData) {
      getVendorCategory();
    }
  }, []);

  if(!categoriesData){
    return (
        <div>...Empty Categories</div>
    )
  }

  return (
    <div className="w-full flex flex-col p-8 max-md:p-6 max-sm:p-4 gap-8 bg-white pb-10">
      <div className="w-full flex justify-between items-center">
        <h3 className="text-black font-bold text-2xl max-sm:text-lg">
          Vendor categories
        </h3>
        <div className="flex justify-center gap-4 items-center">
          <div
            onClick={prevBtnHandler}
            className="w-[40px] h-[40px] max-sm:w-[25px] max-sm:h-[25px] flex justify-center items-center bg-white shadow-md shadow-[#00000086] rounded-full cursor-pointer transition duration-200 ease-in hover:shadow-[#0000001d]"
          >
            <FaChevronLeft className="text-xl max-sm:text-base" />
          </div>
          <div
            onClick={nextBtnHandler}
            className="w-[40px] h-[40px] max-sm:w-[25px] max-sm:h-[25px] flex justify-center items-center bg-white shadow-md shadow-[#00000086] rounded-full cursor-pointer transition duration-200 ease-in hover:shadow-[#0000001d]"
          >
            <FaChevronRight className="text-xl max-sm:text-base" />
          </div>
        </div>
      </div>

      <div className="w-full flex justify-between items-start gap-8 flex-wrap transition duration-300">
        {categoriesData[currPage].data &&
          categoriesData[currPage].data.map((item) => (
            <Link
              to={`/vendor-category/${item.name.replaceAll(/\s+/g, '-').toLowerCase()}`}
              key={item._id}
              className="w-[270px] max-sm:w-full flex flex-col p-4 rounded card-shadow gap-4"
            >
              <img
                src={`${process.env.REACT_APP_BASE_URL}${item.image}`}
                alt={item.name}
                className="w-full h-[180px] object-cover rounded"
              />
              <div className="flex flex-col">
                <div className="text-base font-semibold text-black">
                  {item.name}
                </div>
                <div className="flex justify-start gap-1 items-center">
                  <div className="text-sm font-medium text-gray-400">
                    {item.title}
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default VendorCategory;
