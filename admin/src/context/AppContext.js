import { createContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from 'axios'

export const AppContext = createContext();

function AppContextProvider({ children }) {
  const [webData, setWebData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isActiveConformation, setIsActiveConformation] = useState({isActive: false, name:'', data: null, tab:'', response:false});
  const [imageViewActive, setImageViewActive] = useState({isActive: false, AllImages:'', dirName:'', index:0})
  const [editServices, setEditServices] = useState({isActive: false, data: null});
  const [editBlog, setEditBlog] = useState({isActive: false, data: null});
  const [editWedding, setEditWedding] = useState({isActive: false, data: null});
  const [viewContactUs, setViewContactUs] = useState({isActive: false, data: null});

  const AuthAdmin = async () => {
    try {
      const token = localStorage.getItem("VideekAdmin");
      if (!token) {
        throw new Error("Token not found. Please log in again.");
      }
      const url = `${process.env.REACT_APP_BASE_URL}/admin/dashboard`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setIsLoggedIn(true);
        setAdminData(data.adminData);
        if(location.hash){
          navigate(`/dashboard${location.hash}`)
        }
        else{
          navigate("/dashboard");
        }
        toast.success("Your Dashboard");
      } else {
        toast.error(
          data.message || "Failed to authenticate. Please try again."
        );
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchGeneralSettingData = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/web/data`);
        if (response.data.success) {
            setWebData(response.data.data);
        }
    } catch (err) {
      console.log(err.message)
    }
  };

  useState(() => {
      if(!webData){
        fetchGeneralSettingData();
      }
  },[]);

  const value = {
    webData,
    AuthAdmin,
    isLoggedIn,
    setIsLoggedIn,
    adminData,
    setAdminData,
    isLoading,
    setIsLoading,
    isActiveConformation, setIsActiveConformation,
    imageViewActive, setImageViewActive,
    editServices, setEditServices,
    editBlog, setEditBlog,
    editWedding, setEditWedding,
    viewContactUs, setViewContactUs
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppContextProvider;
