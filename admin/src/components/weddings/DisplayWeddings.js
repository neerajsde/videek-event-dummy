import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import MdLoader from '../spinner/MdLoader';
import Select from "react-select";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { AppContext } from '../../context/AppContext';

const DisplayWeddings = () => {
  const { setEditWedding, isActiveConformation, setIsActiveConformation } = useContext(AppContext);
  const [weddingsData, setWeddingsData] = useState(null);
  const [Data, setData] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: 'All',
    name: 'All'
  })

  const handleCategoryChange = (selectedOption) => {
    setFormData((prevState) => ({
      ...prevState,
      category: selectedOption.value,
    }));
    setFormData((prevState) => ({
      ...prevState,
      name: 'All',
    }));
  };

  const handleSubCategoryChange = (selectedOption) => {
    setFormData((prevState) => ({
      ...prevState,
      name: selectedOption.value,
    }));
  };

  useEffect(() => {
    let filteredData = Data;
    // Filter by category
    if (formData.category !== 'All') {
      filteredData = filteredData.filter((item) => item.category === formData.category);
    }

    if(filteredData && filteredData.length > 0){
      const update = filteredData.map((item) => ({
        label: item.couple_name,
        value: item.couple_name,
      }))
      update.unshift({
        label: 'All',
        value: 'All',
      })
      setSubCategoryOptions(update);
    }
  
    // Further filter by name
    if (formData.name !== 'All') {
      filteredData = filteredData.filter((item) => item.couple_name === formData.name);
    }
  
    setWeddingsData(filteredData);
  }, [formData.category, formData.name, Data]);
  

  const getAllServicesCategory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/all/weddings`
      );

      if (response.data.success) {
        setData(response.data.data);
        setWeddingsData(response.data.data);
        // update category data
        const formattedCategories = response.data.services.map((sub) => ({
          label: sub,
          value: sub,
        }));
        formattedCategories.unshift({
          label: 'All',
          value: 'All',
        })
        setCategoryOptions(formattedCategories);
        // update sub-category 
        const formattedSubCategories = response.data.data.map((sub) => ({
          label: sub.couple_name,
          value: sub.couple_name,
        }));
        formattedSubCategories.unshift({
          label: 'All',
          value: 'All',
        })
        setSubCategoryOptions(formattedSubCategories);
      } else {
        weddingsData(null);
      }
    } catch (err) {
      setWeddingsData(null);
    } finally{
      setLoading(false);
    }
  };
  useEffect(() => {
    if(!weddingsData){
      getAllServicesCategory();
    }
  },[]);

  function deleteHandler(data){
    setIsActiveConformation({isActive: true, data: data, name:`Real Wedding: Couple Name -> ${data.couple_name}`, tab:'wedding', response:false});
  }

  useEffect(() => {
    if(((isActiveConformation.tab === 'wedding') && isActiveConformation.response) && weddingsData){
      const filterData = weddingsData.filter((item) => item._id !== isActiveConformation.data._id);
      setWeddingsData(filterData);
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
            <h2 className="w-full text-xl col-span-2 font-semibold uppercase text-teal-600">
                Real Weddings Show Result: {weddingsData?.length}
            </h2>
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
                    (option) => option.value === formData.name
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
            {!weddingsData ? (
            <div className="w-full h-[400px] flex justify-center items-center text-center text-gray-500">Empty Services</div>
            ) : (
            <table className="w-full table-auto border-collapse">
                <thead>
                <tr className="border-b border-gray-600">
                    <th className="py-2 px-4 text-left login">Wedding Category</th>
                    <th className="py-2 px-4 text-left login">Couple Name</th>
                    <th className="py-2 px-4 text-left login">Date</th>
                    <th className="py-2 px-4 text-left login">Location</th>
                    <th className="py-2 px-4 text-center login">Action</th>
                </tr>
                </thead>
                <tbody>
                {weddingsData &&
                  weddingsData.map((item, idx) => (
                    <tr key={item.id} className="border-b border-gray-300">
                        <td className="py-2 px-4">{item.category}</td>
                        <td className="py-2 px-4">{item.couple_name}</td>
                        <td className="py-2 px-4">{item.date}</td>
                        <td className="py-2 px-4">{item.location.length > 25 ? `${item.location.slice(0, 25)}...` : item.location}</td>
                        <td className="py-2 px-4 flex justify-center gap-4">
                          <button
                              onClick={() => setEditWedding({isActive: true, data: item})}
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

export default DisplayWeddings