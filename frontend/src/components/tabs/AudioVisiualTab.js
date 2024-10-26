import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

const AudioVisiualTab = () => {
  const {setTab, setIsMenuBarActive} = useContext(AppContext);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [audioVisiualData, setAudioVisiualData] = useState(null);

  const getServicesByCategory = async (category) => {
    if (!category) return;
    try {
      const response = await axios.get(
        `${baseUrl}/services-tab/${category}`
      );

      if (response.data.success) {
        setAudioVisiualData(response.data.data);
      } else {
        setAudioVisiualData(null);
      }
    } catch (error) {
      setAudioVisiualData(null);
    }
  };

  useEffect(() => {
    if(!audioVisiualData){
      getServicesByCategory('Audio Visiual');
    }
  }, [])

  
  return (
    <div className="w-full flex justify-start items-start gap-8 py-4 px-8 max-md:px-4">
      {audioVisiualData &&
        audioVisiualData.map((data, index) => (
          <div key={index} className="flex flex-col gap-3 max-md:gap-2">
            <h2 className="text-[#411530] font-semibold text-base">
              {data.heading}
            </h2>
            <div className="flex flex-col gap-1">
              {data.links &&
                data.links.map((item) => (
                  <Link
                    key={item.id}
                    to={`/s/audio-visiual/${data.heading.replace(/\s+/g, "-").toLowerCase()}/${item.title.replace(/\s+/g, "-").toLowerCase()}`}
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

export default AudioVisiualTab;
