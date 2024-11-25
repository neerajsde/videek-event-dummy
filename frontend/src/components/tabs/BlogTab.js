import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import SmLoader from '../spinner/SmLoader';

const BlogTab = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const {setTab, setIsMenuBarActive} = useContext(AppContext);
  const [categoryData, setCategoryData] = useState(null);
  const [tabLoading, setTabLoading] = useState(false);
  const [blogsData, setBlogsData] = useState(null);

  const getGalleryCategory = async () => {
    try {
      setTabLoading(true);
      const response = await axios.get(
        `${baseUrl}/blog/category`
      );

      if (response.data.success) {
        const formattedSubCategories = response.data.data.map((sub) => ({
          label: sub,
          value: sub,
        }));
        setCategoryData(formattedSubCategories);
      } else {
        setCategoryData(null);
      }
    } catch (error) {
      setCategoryData(null);
    } finally{
      setTabLoading(false);
    }
  };

  useEffect(() => {
      getGalleryCategory();
  }, []);

  const getBlogsCategory = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/blogs/tab`
      );

      if (response.data.success) {
        setBlogsData(response.data.data);
      } else {
        setBlogsData(null);
      }
    } catch (error) {
      setBlogsData(null);
    }
  };

  useEffect(() => {
    getBlogsCategory();
  }, []);

  if(tabLoading){
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <div className='flex flex-col items-center mt-16 gap-1'>
          <SmLoader/>
          <span className='text-base text-gray-400 max-sm:text-sm'>Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-4 px-8 max-md:px-4 gap-4'>
      <div className="w-full flex flex-col gap-3 max-md:gap-2">
        <h2 className="text-[#411530] font-semibold text-base">
          Blog Category
        </h2>
        <div className="flex flex-col gap-1">
          {categoryData &&
            categoryData.map((item, index) => (
              <Link
                key={index}
                to={`/blog#${item.label.replace(/\s+/g, "-")}`}
                onClick={() => {setTab({isActive: false, name:''}); setIsMenuBarActive(false);}}
                className="text-sm font-normal text-gray-500 transition duration-200 ease-in hover:text-[#411530]"
              >
                {item.label}
              </Link>
            ))}
        </div>
      </div>
      <div className='w-full grid col-span-3'>
        <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2'>
          {
            blogsData && blogsData.map((item) => (
              <Link
                to={`/blog#${item.category.replace(/\s+/g, "-")}`}
                onClick={() => {setTab({isActive: false, name:''}); setIsMenuBarActive(false);}}
                className='w-full h-[130px] max-sm:h-[70px] max-md:h-[100px] relative rounded-md'
              >
                <img src={`${process.env.REACT_APP_BASE_URL}/blogImg${item.image}`} className='w-full h-full rounded-md object-cover'/>
                <h4 className='w-full h-full absolute top-0 left-0 bg-[#00000054] flex justify-center items-center rounded-md text-white text-base font-semibold text-center'>{item.category}</h4>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default BlogTab