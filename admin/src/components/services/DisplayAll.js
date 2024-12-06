import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import MdLoader from '../spinner/MdLoader';
import Select from "react-select";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { AppContext } from '../../context/AppContext';

const DisplayAll = () => {
  const { setEditServices, isActiveConformation, setIsActiveConformation } = useContext(AppContext);
  const [servicesData, setServicesData] = useState(null);
  const [Data, setData] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: 'All',
    subCategory: ''
  })

  const handleCategoryChange = (selectedOption) => {
    setFormData((prevState) => ({
      ...prevState,
      category: selectedOption.value,
    }));
    setFormData((prevState) => ({
      ...prevState,
      subCategory: '',
    }));
  };

  const handleSubCategoryChange = (selectedOption) => {
    setFormData((prevState) => ({
      ...prevState,
      subCategory: selectedOption.value,
    }));
  };

  useEffect(() => {
    if(formData.category === 'All'){
      setServicesData(Data);
    }
    else{
      const filterData = Data.filter((item) => item.category === formData.category);
      setServicesData(filterData);
    }
  },[formData.category]);

  useEffect(() => {
    if(formData.subCategory === ''){
      return;
    }
    else{
      const filterData = Data.filter((item) => item.subCategory === formData.subCategory);
      setServicesData(filterData);
    }
  },[formData.subCategory]);

  const getAllServicesCategory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/all/services`
      );

      if (response.data.success) {
        setData(response.data.data);
        setServicesData(response.data.data);
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
        servicesData(null);
        console.log(response.data.message)
      }
    } catch (err) {
      setServicesData(null);
      console.log(err.message)
    } finally{
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllServicesCategory();
  },[]);

  const getServicesByCategory = async (category) => {
    if (!category) return;
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/services-select/${category}`
      );

      if (response.data.success) {
        const formattedSubCategories = response.data.data.map((sub) => ({
          label: sub,
          value: sub,
        }));
        setSubCategoryOptions(formattedSubCategories);
      } else {
        setSubCategoryOptions([]);
      }
    } catch (error) {
      setSubCategoryOptions([]);
    }
  };

  useEffect(() => {
    getServicesByCategory(formData.category);
  }, [formData.category]);

  function deleteHandler(data){
    setIsActiveConformation({isActive: true, data: data, name:data.name, tab:'services', response:false});
  }

  useEffect(() => {
    if(((isActiveConformation.tab === 'services') && isActiveConformation.response) && servicesData){
      const filterData = servicesData.filter((item) => item._id !== isActiveConformation.data._id);
      setServicesData(filterData);
    }
  },[isActiveConformation])

  if (loading) {
    return (
      <div className="w-full h-[90vh] flex justify-center items-center">
        <MdLoader />
      </div>
    );
  }

  return (
    <div className="w-full login h-full flex flex-col gap-8">
      <div className="w-full flex flex-col gap-4">
        <div className="w-full grid grid-cols-4 p-4 border-b items-center border-[#333]">
            <h2 className="w-full text-xl font-semibold uppercase text-teal-600">
                All Services
            </h2>
            <h2 className="w-full text-xl font-semibold uppercase text-teal-600"></h2>
            <div className='w-full col-span-2 flex justify-end items-center gap-4'>
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
              <div className="w-full flex items-center gap-2">
                <Select
                  required
                  options={subCategoryOptions}
                  onChange={handleSubCategoryChange}
                  value={subCategoryOptions.find(
                    (option) => option.value === formData.subCategory
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
            {!servicesData ? (
            <div className="w-full h-[400px] flex justify-center items-center text-center text-gray-500">Empty Services</div>
            ) : (
            <table className="w-full table-auto border-collapse">
                <thead>
                <tr className="border-b border-gray-600">
                    <th className="py-2 px-4 text-left login">Tab</th>
                    <th className="py-2 px-4 text-left login">Sub Tab</th>
                    <th className="py-2 px-4 text-left login">Services Name</th>
                    <th className="py-2 px-4 text-center login">Action</th>
                </tr>
                </thead>
                <tbody>
                {servicesData &&
                  servicesData.map((item, idx) => (
                    <tr key={item.id} className="border-b border-gray-300">
                        <td className="py-2 px-4">{item.category}</td>
                        <td className="py-2 px-4">{item.subCategory}</td>
                        <td className="py-2 px-4">{item.name}</td>
                        <td className="py-2 px-4 flex justify-center gap-4">
                          <button
                              onClick={() => setEditServices({isActive: true, data: item})}
                              className="px-2 py-1 bg-transparent text-blue-600 border border-blue-600 rounded-md flex items-center justify-center gap-1 transition duration-200 ease-in hover:bg-blue-600 hover:text-white"
                          >
                              <MdEdit/> Edit
                          </button>
                          <button
                              onClick={() => deleteHandler(item)}
                              className="px-2 py-1 bg-transparent text-red-600 border border-red-600 rounded-md flex items-center justify-center gap-1 transition duration-200 ease-in hover:bg-red-600 hover:text-white"
                          >
                              <RiDeleteBin2Fill/> Delete
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

export default DisplayAll