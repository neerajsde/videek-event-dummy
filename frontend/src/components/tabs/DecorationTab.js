import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import SmLoader from "../spinner/SmLoader";

const DecorationTab = () => {
  const {setTab, setIsMenuBarActive} = useContext(AppContext);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [decorationData, setdecorationData] = useState(null);
  const [tabLoading, setTabLoading] = useState(false);

  const getServicesByCategory = async (category) => {
    if (!category) return;
    try {
      setTabLoading(true);
      const response = await axios.get(
        `${baseUrl}/services-tab/${category}`
      );

      if (response.data.success) {
        setdecorationData(response.data.data);
      } else {
        setdecorationData(null);
      }
    } catch (error) {
      setdecorationData(null);
    } finally{
      setTabLoading(false);
    }
  };

  useEffect(() => {
    if(!decorationData){
      getServicesByCategory('Decoration');
    }
  }, [])

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
    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-4 px-8 max-md:px-4">
      {decorationData &&
        decorationData.map((data, index) => (
          <div key={index} className="flex flex-col gap-3 max-md:gap-2">
            <h2 className="text-[#411530] font-semibold text-base">
              {data.heading}
            </h2>
            <div className="flex flex-col gap-1">
              {data.links &&
                data.links.map((item) => (
                  <Link
                    key={item.id}
                    to={`/s/decoration/${data.heading.replace(/\s+/g, "-").toLowerCase()}/${item.title.replace(/\s+/g, "-").toLowerCase()}`}
                    onClick={() => {setTab({isActive: false, name:''}); setIsMenuBarActive(false);}}
                    className="text-sm font-normal text-gray-500 transition duration-200 ease-in hover:text-[#411530]"
                  >
                    {item.title}
                  </Link>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default DecorationTab;
