import { createContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export const AppContext = createContext();

function AppContextProvider({ children }) {
  const [webData, setWebData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [tab, setTab] = useState({ isActive: false, name: "" });
  const [isActiveLoginPage, setIsActiveLoginPage] = useState(false);
  const [isMenuBarActive, setIsMenuBarActive] = useState(false);
  const [isOpenRate, setIsOpenRate] = useState(false);
  const [activeUserMenu, setActiveUserMenu] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);
  const [imageViewActive, setImageViewActive] = useState({
    isActive: false,
    AllImages: "",
    dirName: "",
    index: 0,
  });

  const AuthUser = async () => {
    try {
      const token = localStorage.getItem("DJevents");
      if (!token) {
        throw new Error("Token not found. Please log in again.");
      }
      const url = `${process.env.REACT_APP_BASE_URL}/user/dashboard`;
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
        setUserData(data.userData);
        setIsActiveLoginPage(false);
      } else {
        toast.error(
          data.message || "Failed to authenticate. Please try again."
        );
      }
    } catch (err) {}
  };

  const fetchGeneralSettingData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/web/data`
      );
      if (response.data.success) {
        setWebData(response.data.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useState(() => {
    if (!webData) {
      fetchGeneralSettingData();
    }
  }, []);

  const contactHandler = async (venueId) => {
    if (!isLoggedIn && !userData) {
      setIsActiveLoginPage(true);
      return;
    }
    try {
      setBtnLoader(true);
      const token = localStorage.getItem("DJevents");
      if (!token) {
        throw new Error("Token not found. Please log in again.");
      }
      const url = `${process.env.REACT_APP_BASE_URL}/venue/enquiery`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          venueId: venueId,
          userId: userData.user_id,
        }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        toast.success(data.message);
      } else {
        toast.error(
          data.message || "Failed to authenticate. Please try again."
        );
      }
    } catch (err) {
      toast.error(err.message);
    } finally{
      setBtnLoader(false);
    }
  };

  const value = {
    webData,
    AuthUser,
    isLoading,
    setIsLoading,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    tab,
    setTab,
    isActiveLoginPage,
    setIsActiveLoginPage,
    isMenuBarActive,
    setIsMenuBarActive,
    isOpenRate,
    setIsOpenRate,
    activeUserMenu,
    setActiveUserMenu,
    contactHandler,
    imageViewActive,
    setImageViewActive,
    btnLoader,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppContextProvider;
