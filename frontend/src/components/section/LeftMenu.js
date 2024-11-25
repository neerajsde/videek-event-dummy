import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const LeftMenu = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const location = useLocation();
  const [tabData, setTabData] = useState(null);
  
  const [menuTab, setMenuTab] = useState({ active: true, name: location.pathname.split('/').at(-2) });
  const [menuSubTab, setMenuSubTab] = useState({ active: true, name: location.pathname.split('/').at(-1) });

  useEffect(() => {
    const tabFromURL = location.pathname.split('/').at(-3);
    const subTabFromURL = location.pathname.split('/').at(-2);
    
    // Automatically set the active menu and sub-menu based on URL path
    setMenuTab({
      active: true, 
      name: tabFromURL
    });

    setMenuSubTab({
      active: true, 
      name: subTabFromURL
    });
  }, [location]);

  const getServicesTabsData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/serverces-tab`
      );

      if (response.data.success) {
        setTabData(response.data.data);
      } else {
        setTabData(null);
      }
    } catch (error) {
      setTabData(null);
    }
  };

  useEffect(() => {
    getServicesTabsData();
  }, []);

  return (
    <div className="w-[280px] sticky top-[80px] max-md:hidden flex flex-col border border-[#411530]">
      {
        tabData && tabData.map((data, idx) => (
          <div key={idx} className="w-full flex flex-col">
            <div
              onClick={() => setMenuTab({
                active: menuTab.name === data.heading.toLowerCase().replaceAll(' ', '-') ? !menuTab.active : true,
                name: data.heading.toLowerCase().replaceAll(' ', '-')
              })}
              className="w-full flex justify-start items-center gap-2 text-white py-1 px-4 bg-[#411530] cursor-pointer"
            >
              {menuTab.active && menuTab.name === data.heading.toLowerCase().replaceAll(' ', '-') ? (
                <FaAngleDown className="text-lg" />
              ) : (
                <FaAngleRight className="text-lg" />
              )}
              <span>{data.heading}</span>
            </div>

            {
              data.subCategories && menuTab.active && menuTab.name === data.heading.toLowerCase().replaceAll(' ', '-') && (
                data.subCategories.map((item, idn) => (
                  <div key={idn} className="w-full flex flex-col">
                    <div
                      onClick={() => setMenuSubTab({
                        active: menuSubTab.name === item.heading.toLowerCase().replaceAll(' ', '-') ? !menuSubTab.active : true,
                        name: item.heading.toLowerCase().replaceAll(' ', '-')
                      })}
                      className="w-full flex justify-start items-center gap-2 text-white py-1 pl-8 pr-4 bg-[#732354] cursor-pointer"
                    >
                      {menuSubTab.active && menuSubTab.name === item.heading.toLowerCase().replaceAll(' ', '-') ? (
                        <FaAngleDown className="text-lg" />
                      ) : (
                        <FaAngleRight className="text-lg" />
                      )}
                      <span>{item.heading}</span>
                    </div>

                    <div
                      className={`w-full flex flex-col ${
                        menuSubTab.active && menuSubTab.name === item.heading.toLowerCase().replaceAll(' ', '-') ? "flex flex-col" : "hidden"
                      }`}
                    >
                      {
                        item.links &&
                        item.links.map((link) => (
                          <Link
                            key={link.id}
                            to={`/s/${menuTab.name}/${menuSubTab.name}/${link.title.replace(/\s+/g, "-").toLowerCase()}`}
                            className={`w-full text-sm border-t py-1 pl-10 pr-2 text-white transition duration-200 ease-in ${
                              link.title.replace(/\s+/g, "-").toLowerCase() === location.pathname.split('/').at(-1).replaceAll(' ', '-')
                                ? "bg-[#f23c76]"
                                : "bg-[#AB1C49] hover:bg-[#f23c76]"
                            }`}
                          >
                            {link.title}
                          </Link>
                        ))
                      }
                    </div>
                  </div>
                ))
              )
            }
          </div>
        ))
      }
    </div>
  );
};

export default LeftMenu;
