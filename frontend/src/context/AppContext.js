import { createContext, useState } from "react";


export const AppContext = createContext();

function AppContextProvider({children}){
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [tab, setTab] = useState({isActive: false, name:''});
    const [isActiveLoginPage, setIsActiveLoginPage] = useState(false);
    const [isMenuBarActive, setIsMenuBarActive] = useState(false);
    const [isOpenRate, setIsOpenRate] = useState(false);

    const value = {
        isLoading, setIsLoading,
        isLoggedIn, setIsLoggedIn,
        userData, setUserData,
        tab, setTab,
        isActiveLoginPage, setIsActiveLoginPage,
        isMenuBarActive, setIsMenuBarActive,
        isOpenRate, setIsOpenRate
    }

    return <AppContext.Provider value={value}>
                {children}
            </AppContext.Provider>
}

export default AppContextProvider;