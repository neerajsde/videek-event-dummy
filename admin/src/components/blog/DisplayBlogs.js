import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import MdLoader from '../spinner/MdLoader';
import Select from "react-select";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { AppContext } from '../../context/AppContext';

const DisplayBlogs = () => {
  const { setEditBlog, isActiveConformation, setIsActiveConformation } = useContext(AppContext);
  const [blogsData, setBlogsData] = useState(null);
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
      setBlogsData(Data);
    }
    else{
      const filterData = Data.filter((item) => item.category === formData.category);
      setBlogsData(filterData);
    }
  },[formData.category]);

  const getAllServicesCategory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/all/blogs`
      );

      if (response.data.success) {
        setData(response.data.data);
        setBlogsData(response.data.data);
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
        setBlogsData(null)
        console.log(response.data.message)
      }
    } catch (err) {
      setBlogsData(null);
      console.log(err.message)
    } finally{
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllServicesCategory();
  },[]);

  function deleteHandler(data){
    setIsActiveConformation({isActive: true, data: data, name:`${data.title} ::::: Blog ID: #${data.uId}`, tab:'blog', response:false});
  }

  useEffect(() => {
    if(((isActiveConformation.tab === 'blog') && isActiveConformation.response) && blogsData){
      const filterData = blogsData.filter((item) => item._id !== isActiveConformation.data._id);
      setBlogsData(filterData);
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
        <div className="w-full grid grid-cols-3 p-4 border-b items-center border-[#333]">
            <h2 className="w-full text-xl font-semibold uppercase text-teal-600">
                {`All Blogs, Total blogs - ${blogsData?.length}`}
            </h2>
            <div className='w-full col-span-2 flex justify-end items-center gap-4'>
              <div className="w-[250px] flex items-center gap-2">
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
            {!blogsData ? (
            <div className="w-full h-[400px] flex justify-center items-center text-center text-gray-500">Empty Services</div>
            ) : (
            <table className="w-full table-auto border-collapse">
                <thead>
                <tr className="border-b border-gray-600">
                    <th className="py-2 px-4 text-left login">Blog ID</th>
                    <th className="py-2 px-4 text-left login">Category</th>
                    <th className="py-2 px-4 text-left login">Title</th>
                    <th className="py-2 px-4 text-center login">Action</th>
                </tr>
                </thead>
                <tbody>
                {blogsData &&
                  blogsData.map((item, idx) => (
                    <tr key={item.id} className="border-b border-gray-300">
                        <td className="py-2 px-4">#{item.uId}</td>
                        <td className="py-2 px-4">{item.category}</td>
                        <td className="py-2 px-4">{item.title.length > 40 ? `${item.title.slice(0, 40)}...` : item.title}</td>
                        <td className="py-2 px-4 flex justify-center gap-4">
                          <button
                              onClick={() => setEditBlog({isActive: true, data: item})}
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

export default DisplayBlogs