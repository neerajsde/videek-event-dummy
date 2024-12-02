import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

const EInvitesTab = () => {
  const {setTab, setIsMenuBarActive} = useContext(AppContext);
  const data = [
    {
      title: 'Wedding Card Designs',
    },
    {
      title: 'Save the templates',
    }
  ]
  return (
    <div className="w-full flex justify-between items-start py-4 px-8 max-md:px-4">
      <div className="flex flex-col gap-3 max-md:gap-2">
        <h2 className="text-[#411530] font-semibold text-base">
          Wedding Invitation Maker
        </h2>
        <div className="flex flex-col gap-1">
          {data &&
            data.map((item, index) => (
              <Link
                key={index}
                to={`/wedding-invitations/${item.title
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
                onClick={() => {
                  setTab({ isActive: false, name: "" });
                  setIsMenuBarActive(false);
                }}
                className="text-sm font-normal text-gray-500 transition duration-200 ease-in hover:text-[#411530]"
              >
                {item.title}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default EInvitesTab;
