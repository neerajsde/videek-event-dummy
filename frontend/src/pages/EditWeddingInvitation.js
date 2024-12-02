import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import Draggable from "react-draggable";
import { IoIosColorPalette } from "react-icons/io";
import { AiOutlineFontSize } from "react-icons/ai";

const EditWeddingInvitation = ({ data, fun }) => {
  const [formData, setFormData] = useState({
    boyName: "",
    girlName: "",
    boyStyle: {
      fontSize: "30px",
      color: "#000000",
    },
    girlStyle: {
      fontSize: "30px",
      color: "#000000",
    },
  });

  // Handler to update text content
  function inputHandler(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  // Handler to update styles (fontSize or color)
  function styleHandler(target, property, value) {
    setFormData((prevState) => ({
      ...prevState,
      [target]: {
        ...prevState[target],
        [property]: value,
      },
    }));
  }

  return (
    <div className="w-full max-sm:flex max-sm:flex-col min-h-screen relative">
      {/* Back Button */}
      <div className="absolute max-sm:relative top-2 left-2">
        <button
          onClick={() => fun(false)}
          className="flex justify-center items-center gap-2 border py-1 px-3 border-gray-600 bg-gray-400 rounded-sm"
        >
          <IoMdArrowRoundBack /> Back
        </button>
      </div>

      {/* Edit Controls */}
      <div className="max-sm:w-[90%] fixed top-[50%] max-sm:top-0 max-sm:relative right-2 max-sm:right-0 border flex flex-col gap-2 p-2 bg-gray-100 shadow-md rounded-md">
        <h3 className="font-bold mb-2">Edit Text</h3>

        {/* Font Size */}
        <div className="flex items-center gap-2">
          <AiOutlineFontSize className="text-xl"/>
          <input
            type="number"
            min="10"
            max="100"
            value={parseInt(formData.boyStyle.fontSize)}
            onChange={(e) => styleHandler("boyStyle", "fontSize", `${e.target.value}px`)}
            placeholder="Font Size"
            className="w-full border px-2 py-1 rounded"
          />
          <input
            type="number"
            min="10"
            max="100"
            value={parseInt(formData.girlStyle.fontSize)}
            onChange={(e) => styleHandler("girlStyle", "fontSize", `${e.target.value}px`)}
            placeholder="Font Size"
            className="w-full border px-2 py-1 rounded"
          />
        </div>

        {/* Font Color */}
        <div className="flex items-center gap-2">
          <IoIosColorPalette />
          <input
            type="color"
            value={formData.boyStyle.color}
            onChange={(e) => styleHandler("boyStyle", "color", e.target.value)}
          />
          <input
            type="color"
            value={formData.girlStyle.color}
            onChange={(e) => styleHandler("girlStyle", "color", e.target.value)}
          />
        </div>
      </div>

      {/* Invitation Card Area */}
      <div className="w-full h-full flex justify-center items-center p-4">
        <div className="w-[500px] flex relative">
          {/* Background Invitation Card Image */}
          <img
            src={`${process.env.REACT_APP_BASE_URL}/invitationsCard${data.img}`}
            alt="card"
            className="w-full h-auto object-cover"
          />

          {/* Draggable Input Fields */}
          <Draggable>
            <input
              type="text"
              name="boyName"
              value={formData.boyName}
              onChange={inputHandler}
              placeholder="Boy's Name"
              style={{
                ...formData.boyStyle,
              }}
              className="w-[200px] max-sm:w-[90%] absolute top-[190px] max-sm:top-[60px] text-center left-[150px] max-sm:left-3 border bg-transparent px-2 py-1 font-extrabold dancing-text outline-none border-dashed border-transparent focus:border-black cursor-move"
            />
          </Draggable>

          <Draggable>
            <input
              type="text"
              name="girlName"
              value={formData.girlName}
              onChange={inputHandler}
              placeholder="Girl's Name"
              style={{
                ...formData.girlStyle,
              }}
              className="w-[200px] max-sm:w-[90%] absolute top-[280px] max-sm:top-[150px] text-center left-[150px] max-sm:left-3 border bg-transparent px-2 py-1 font-extrabold dancing-text outline-none border-dashed border-transparent focus:border-black cursor-move"
            />
          </Draggable>
        </div>
      </div>
    </div>
  );
};

export default EditWeddingInvitation;
