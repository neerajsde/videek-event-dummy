import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import MdLoader from '../spinner/MdLoader';
import Select from "react-select";
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { HiOutlineEye } from "react-icons/hi";
import DownloadContactUs from '../common-com/DownloadContactUsData';

const Contact = () => {
  const { setEditBlog, isActiveConformation, setIsActiveConformation } = useContext(AppContext);
  const [realWeddingData, setRealWeddingData] = useState(null);
  const [Data, setData] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: 'All',
  })

  const handleCategoryChange = (selectedOption) => {
    setFormData((prevState) => ({
      ...prevState,
      category: selectedOption.value,
    }));
  };

  useEffect(() => {
    if(formData.category === 'All'){
      setRealWeddingData(Data);
    }
    else{
      const filterData = Data.filter((item) => item.name === formData.category);
      setRealWeddingData(filterData);
    }
  },[formData.category]);

  const getAllServicesCategory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/all/contacts`
      );

      if (response.data.success) {
        setData(response.data.data);
        setRealWeddingData(response.data.data);
        const formattedSubCategories = response.data.services.map((sub) => ({
          label: sub,
          value: sub,
        }));
        formattedSubCategories.unshift({
          label: 'All',
          value: 'All',
        })
        setCategoryOptions(formattedSubCategories);
      } else {
        setRealWeddingData(null)
        console.log(response.data.message)
      }
    } catch (err) {
      setRealWeddingData(null);
      console.log(err.message)
    } finally{
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllServicesCategory();
  },[]);

  if (loading) {
    return (
      <div className="w-full h-[90vh] flex justify-center items-center">
        <MdLoader />
      </div>
    );
  }

  return (
    <div className="w-full login h-full flex flex-col gap-8 border border-[#333]">
      <div className="w-full flex flex-col gap-4">
        <div className="w-full grid grid-cols-3 p-4 border-b items-center border-[#333] gap-4">
            <h2 className="w-full text-xl font-semibold uppercase text-teal-600">
                {`(${realWeddingData?.length}) Contacts`}
            </h2>
            <DownloadContactUs/>
            <div className='w-full flex justify-end items-center gap-4'>
              <div className="w-full flex items-center gap-2">
                <Select
                  required
                  options={categoryOptions}
                  onChange={handleCategoryChange}
                  value={categoryOptions.find(
                    (option) => option.value === formData.category
                  )}
                  placeholder="Choose Category"
                  className="w-full h-[45px]"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      backgroundColor: "#111",
                      borderColor: "#333",
                      color: "white",
                    }),
                    menu: (provided) => ({
                      ...provided,
                      backgroundColor: "#222",
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isFocused ? "#444" : "#222",
                      color: "white",
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "white",
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: "#555",
                    }),
                  }}
                />
              </div>
            </div>
        </div>
        <div className="w-full">
            {!realWeddingData ? (
            <div className="w-full h-[400px] flex justify-center items-center text-center text-gray-500">Empty Services</div>
            ) : (
            <table className="w-full table-auto border-collapse">
                <thead>
                <tr className="border-b border-gray-600">
                    <th className="py-2 px-4 text-left login">Name</th>
                    <th className="py-2 px-4 text-left login">Phone</th>
                    <th className="py-2 px-4 text-left login">Email</th>
                    <th className="py-2 px-4 text-center login">Date</th>
                    <th className="py-2 px-4 text-center login">Time</th>
                    <th className="py-2 px-4 text-center login">Action</th>
                </tr>
                </thead>
                <tbody>
                {realWeddingData &&
                  realWeddingData.map((item, idx) => (
                    <tr key={item.id} className="border-b border-gray-300">
                        <td className="py-2 px-4">{item.name}</td>
                        <td className="py-2 px-4"><Link to={`tel:${item.phone}`}>{item.phone}</Link></td>
                        <td className="py-2 px-4"><Link to={`mailto:${item.email}`}>{item.email}</Link></td>
                        <td className="py-2 px-4">{item.date}</td>
                        <td className="py-2 px-4">{item.time}</td>
                        <td className="py-2 px-4 flex justify-center gap-4">
                          <button
                              className="px-2 py-1 bg-transparent text-blue-600 border border-blue-600 rounded-md flex items-center justify-center gap-1 transition duration-200 ease-in hover:bg-blue-600 hover:text-white"
                          >
                              <HiOutlineEye/> View
                          </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            )}
        </div>
      </div>
    </div>
  )
}

export default Contact