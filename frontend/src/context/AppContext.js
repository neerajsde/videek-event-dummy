import { createContext, useState } from "react";
import toast from "react-hot-toast";


export const AppContext = createContext();

function AppContextProvider({children}){
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [tab, setTab] = useState({isActive: false, name:''});
    const [isActiveLoginPage, setIsActiveLoginPage] = useState(false);
    const [isMenuBarActive, setIsMenuBarActive] = useState(false);
    const [isOpenRate, setIsOpenRate] = useState(false);
    const [activeUserMenu, setActiveUserMenu] = useState(false);

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

    const contactHandler = async(Id, emailId, phone) => {
      if(!isLoggedIn && !userData){
        setIsActiveLoginPage(true);
        return;
      }
      // console.log(Id, emailId, phone);
    }

    const value = {
        AuthUser,
        isLoading, setIsLoading,
        isLoggedIn, setIsLoggedIn,
        userData, setUserData,
        tab, setTab,
        isActiveLoginPage, setIsActiveLoginPage,
        isMenuBarActive, setIsMenuBarActive,
        isOpenRate, setIsOpenRate,
        activeUserMenu, setActiveUserMenu,
        contactHandler
    }

    return <AppContext.Provider value={value}>
                {children}
            </AppContext.Provider>
}

export default AppContextProvider;