import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import SmLoader from '../spinner/SmLoader';

const PhotosTab = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const {setTab, setIsMenuBarActive} = useContext(AppContext);
  const [categoryData, setCategoryData] = useState(null);
  const [tabLoading, setTabLoading] = useState(false);

  const getGalleryCategory = async () => {
    try {
      setTabLoading(true);
      const response = await axios.get(
        `${baseUrl}/gallery/category`
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
    <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-4 px-8 max-md:px-4'>
      <div className="flex flex-col gap-3 max-md:gap-2">
        <h2 className="text-[#411530] font-semibold text-base">
          Gallery Category
        </h2>
        <div className="flex flex-col gap-1">
          {categoryData &&
            categoryData.map((item, index) => (
              <Link
                key={index}
                to={`/gallery/${item.label.replace(/\s+/g, "-").toLowerCase()}`}
                onClick={() => {setTab({isActive: false, name:''}); setIsMenuBarActive(false);}}
                className="text-sm font-normal text-gray-500 transition duration-200 ease-in hover:text-[#411530]"
              >
                {item.label}
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}

export default PhotosTab