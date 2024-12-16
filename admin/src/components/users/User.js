import React, { useContext, useEffect, useState } from "react";
import MdLoader from "../spinner/MdLoader";
import Select from "react-select";
import { AppContext } from "../../context/AppContext";
import { ImBlocked } from "react-icons/im";
import {Link} from 'react-router-dom'
import { FaUnlock } from "react-icons/fa6";

const User = () => {
  const { isActiveConformation, setIsActiveConformation } = useContext(AppContext);
  const [usersData, setUsersData] = useState([]);
  const [Data, setData] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: "All",
    subCategory: "All",                                                                                                     
  });

  useEffect(() => {
    setSubCategoryOptions([
      { label: "All", value: "All" },
      { label: "Active", value: true },
      { label: "Un Active", value: false },
    ]);
  }, []);

  const handleCategoryChange = (selectedOption) => {
    setFormData((prevState) => ({
      ...prevState,
      category: selectedOption.value,
      subCategory: "All",
    }));
  };

  const handleSubCategoryChange = (selectedOption) => {
    setFormData((prevState) => ({
      ...prevState,
      subCategory: selectedOption.value,
    }));
  };

  useEffect(() => {
    if (formData.category === "All") {
      setUsersData(Data);
    } else {
      const filterData = Data.filter((item) => item.name === formData.category);
      setUsersData(filterData);
    }
  }, [formData.category, Data]);

  useEffect(() => {
    if (formData.subCategory === "All") {
      setUsersData(Data);
    } else if (formData.subCategory === true) {
      const filterData = Data.filter((item) => item?.isActive === true);
      setUsersData(filterData);
    } else if (formData.subCategory === false) {
      const filterData = Data.filter((item) => item?.isActive === false);
      setUsersData(filterData);
    }
  }, [formData.subCategory, Data]);

  const getAllUsersCategory = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("VideekAdmin");
      if (!token) {
        throw new Error("Token not found. Please log in again.");
      }
      const url = `${process.env.REACT_APP_BASE_URL}/all/users`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (data.success) {
        setData(data.data);
        setUsersData(data.data);

        // Ensure `uniqueName` exists and is an array
        const formattedSubCategories =
          Array.isArray(data.uniqueNames) && data.uniqueNames.length
            ? data.uniqueNames.map((sub) => ({
                label: sub,
                value: sub,
              }))
            : [];

        formattedSubCategories.unshift({ label: "All", value: "All" });
        setCategoryOptions(formattedSubCategories);
      } else {
        setUsersData([]);
        console.log(data.message);
      }
    } catch (err) {
      setUsersData([]);
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsersCategory();
  }, []);

  const deleteHandler = (data) => {
    setIsActiveConformation({
      isActive: true,
      data: data,
      name: (data.block ? `and un-block user: ${data.name}` : `and block user: ${data.name}`),
      tab: (data.block ? "user/unblock" : "user/block"),
      response: false,
    });
  };

  useEffect(() => {
        if(((isActiveConformation.tab === "user/unblock" || isActiveConformation.tab === "user/block") && isActiveConformation.response) && usersData){
            getAllUsersCategory();
          }
    }, [isActiveConformation]);


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
        <div className="w-full grid grid-cols-4 p-4 border-b items-center border-[#333]">
          <h2 className="w-full text-xl font-semibold uppercase text-teal-600">
            All Users
          </h2>
          <div className="w-full col-span-2 flex justify-end items-center gap-4">
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
                placeholder="Choose Sub Category"
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
          {!usersData || usersData.length === 0 ? (
            <div className="w-full h-[400px] flex justify-center items-center text-center text-gray-500">
              Empty Users
            </div>
          ) : (
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="py-2 px-4 text-center login">Active</th>
                  <th className="py-2 px-4 text-left login">Name</th>
                  <th className="py-2 px-4 text-left login">Phone</th>
                  <th className="py-2 px-4 text-left login">Email</th>
                  <th className="py-2 px-4 text-center login">Action</th>
                </tr>
              </thead>
              <tbody>
                {usersData.map((item) => (
                  <tr key={item._id} className="border-b border-gray-300">
                    <td className="py-2 px-4">
                      {item.isActive ? (
                        <div className="w-full flex justify-center items-center">
                          <div className="w-[10px] h-[10px] bg-green-500 rounded-full shadow-md shadow-green-500"></div>
                        </div>
                      ) : (
                        <div className="w-full flex justify-center items-center">
                          <div className="w-[10px] h-[10px] bg-red-500 rounded-full shadow-md shadow-red-500"></div>
                        </div>
                      )}
                    </td>
                    <td className="py-2 px-4">{item.name}</td>
                    <td className="py-2 px-4">
                      {item.phone ? (
                        <Link to={`tel:${item.phone}`}>{item.phone}</Link>
                      ) : (
                        "empty"
                      )}
                    </td>
                    <td className="py-2 px-4">
                      {item.email ? (
                        <Link to={`mailto:${item.email}`}>{item.email}</Link>
                      ) : (
                        "empty"
                      )}
                    </td>
                    <td className="py-2 px-4 flex justify-center gap-4">
                      <button
                        onClick={() => deleteHandler(item)}
                        className={`px-2 py-1 rounded-md flex items-center justify-center gap-1 transition duration-200 ease-in ${item.block ? 'text-white border border-green-600 bg-green-600' : 'bg-transparent hover:text-white text-red-600 border border-red-600 hover:bg-red-600'}`}
                      >
                        {!item.block ? (<span className="flex justify-center items-center gap-1"><ImBlocked />Block</span>) : (<span className="flex justify-center items-center gap-1"><FaUnlock />Blocked</span>)}
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
  );
};

export default User;
