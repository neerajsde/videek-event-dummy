import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { HiMenuAlt3 } from "react-icons/hi";
import { LuUser2 } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";

const NavBtns = () => {
  const {
    setIsActiveLoginPage,
    isMenuBarActive,
    setIsMenuBarActive,
    activeUserMenu,
    setActiveUserMenu,
    isLoggedIn,
    userData,
  } = useContext(AppContext);

  return (
    <div className="flex items-center justify-center gap-4 max-sm:gap-2">
      <div
        onClick={() => setIsMenuBarActive(!isMenuBarActive)}
        className="md:hidden text-white text-3xl"
      >
        <HiMenuAlt3 />
      </div>
      {isLoggedIn && userData ? (
        <div
          onClick={() => setActiveUserMenu(!activeUserMenu)}
          className={`py-1 px-2 border flex items-center rounded gap-1 cursor-pointer ${activeUserMenu ? ' border-[#ab1c49] btn-shadow-active' : 'btn-shadow'}`}
        >
          <div className="p-2 rounded-full border border-gray-500">
            <LuUser2 className="text-xl text-gray-400" />
          </div>
          <IoIosArrowDown className="text-2xl text-gray-400" />
        </div>
      ) : (
        <button
          onClick={() => setIsActiveLoginPage(true)}
          className="w-[150px] max-lg:w-[100px] max-sm:w-[70px] py-2 bg-[#AB1C49] text-zinc-100 rounded-full text-base max-md:text-sm font-semibold"
        >
          Log In
        </button>
      )}
    </div>
  );
};

export default NavBtns;
