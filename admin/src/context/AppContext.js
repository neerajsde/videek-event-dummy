import { createContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const AppContext = createContext();

function AppContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [imageViewActive, setImageViewActive] = useState({isActive: false, AllImages:'', dirName:'', index:0})

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

  const value = {
    AuthAdmin,
    isLoggedIn,
    setIsLoggedIn,
    adminData,
    setAdminData,
    isLoading,
    setIsLoading,
    imageViewActive, setImageViewActive
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppContextProvider;
