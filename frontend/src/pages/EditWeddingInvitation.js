import React, { useContext, useEffect, useState } from "react";
import { IoMdArrowRoundBack, IoMdSave } from "react-icons/io";
import Draggable from "react-draggable";
import { IoIosColorPalette } from "react-icons/io";
import { AiOutlineFontSize } from "react-icons/ai";
import { AppContext } from '../context/AppContext'
import html2canvas from "html2canvas";
import { FaSave } from "react-icons/fa";
import toast from "react-hot-toast";
import {Link} from 'react-router-dom'

const EditWeddingInvitation = ({ data, fun }) => {
  const {userData} = useContext(AppContext);
  const [resultData, setResultData] = useState({isActive: false, url:null});
  const [formData, setFormData] = useState({
    boyName: "",
    girlName: "",
    description: "",
    weddingDate: "",
    styles: {
      boyName: { fontSize: "32px", color: "#CB7594", maxscreen: "top-[28%] left-[35%] max-sm:top-[24%] max-sm:left-[5%] max-sm:text-sm" },
      girlName: { fontSize: "32px", color: "#CB7594", maxscreen: "top-[40%] left-[35%] max-sm:top-[35%] max-sm:left-[5%] max-sm:text-sm" },
      weddingDate: { fontSize: "22px", color: "#CB7594", maxscreen: "top-[75%] left-[38%] max-sm:left-[5%] max-sm:text-base" },
      description: { fontSize: "20px", color: "#CB7594", maxscreen: "top-[80%] left-[30%] max-sm:left-[5%] max-sm:text-sm" },
    },
  });

  useEffect(() => {
    if(userData){
      setFormData((prevState) => ({
        ...prevState,
        boyName: userData.name.trim().split(' ').at(0)
      }))
    }
  },[userData])

  function inputHandler(e) {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function styleHandler(target, property, value) {
    setFormData((prevState) => ({
      ...prevState,
      styles: {
        ...prevState.styles,
        [target]: {
          ...prevState.styles[target],
          [property]: value,
        },
      },
    }));
  }

  const fields = [
    { name: "boyName", placeholder: "Mr. name" },
    { name: "girlName", placeholder: "Mr's name" },
    { name: "description", placeholder: "Write Message", isTextarea: true },
    { name: "weddingDate", placeholder: "14-Feb-2025" },
  ];

  const handleSaveCard = async () => {
    if(!formData.boyName || !formData.girlName){
      toast.error('Please Update Couple Name');
      return;
    }
    const invitationCard = document.getElementById("invitation-card");
    if (invitationCard) {
      try {
        // Capture the card as a canvas
        const canvas = await html2canvas(invitationCard, {
          useCORS: true, // Allows cross-origin images
          logging: false, // Optional: suppress logging
        });
  
        // Convert canvas to Blob
        canvas.toBlob(async (blob) => {
          if (blob) {
            // Prepare FormData
            const token = localStorage.getItem("DJevents");
            if (!token) {
              throw new Error("Token not found. Please log in again.");
            }
            const surl = `${formData.boyName.trim().split(' ').at(0)}-and-${formData.girlName.trim().split(' ').at(0)}`
            const formXData = new FormData();
            formXData.append("userId", userData.user_id);
            formXData.append("urls", surl);
            formXData.append("card_img", blob, "wedding-invitation.png");
  
            // Send the image to the backend
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/einvites/card/upload`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formXData, // Attach the FormData
            });
  
            const result = await response.json();
            if (result.success) {
              const originUrl = window.location.origin;
              setResultData({isActive: true, url:`${originUrl}/invitation/${surl}/${result.id}`});
              toast.success(result.message);
            } else {
              toast.error(result.message);
            }
          }
        }, "image/png");
      } catch (error) {
        toast.error("Error capturing and sending invitation card:", error);
      }
    } else {
      console.error("No invitation card found!");
    }
  };
  

  return (
    <div className="w-full max-sm:flex max-sm:flex-col min-h-screen relative">
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start p-8 gap-8 max-md:gap-4 max-md:p-4 max-sm:p-2">
        <div className="w-full border flex flex-col gap-4 p-2 bg-gray-100 shadow-md rounded-md">
          <div className="w-full flex justify-start items-center gap-2">
            <IoMdArrowRoundBack onClick={() => fun(false)} className="text-xl cursor-pointer"/>
            <h3 className="font-bold">Edit Text Styles</h3>
          </div>
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col gap-2">
              <label>{field.placeholder} Style</label>
              <div className="flex items-center gap-2">
                <AiOutlineFontSize className="text-xl" />
                <input
                  type="number"
                  min="10"
                  max="100"
                  value={parseInt(formData.styles[field.name].fontSize)}
                  onChange={(e) =>
                    styleHandler(field.name, "fontSize", `${e.target.value}px`)
                  }
                  className="w-full border px-2 py-1 rounded"
                />
                <IoIosColorPalette />
                <input
                  type="color"
                  value={formData.styles[field.name].color}
                  onChange={(e) =>
                    styleHandler(field.name, "color", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
        </div>
        <div id="invitation-card" className="w-full col-span-1 lg:col-span-2 flex relative justify-center items-center">
          <img
            src={`${process.env.REACT_APP_BASE_URL}/invitationsCard${data.img}`}
            alt="card"
            className="w-full h-auto object-cover shadow-md"
          />

          {fields.map((field) => (
            <Draggable key={field.name}>
              {field.isTextarea ? (
                <textarea
                  name={field.name}
                  value={formData[field.name]}
                  onChange={inputHandler}
                  placeholder={field.placeholder}
                  style={formData.styles[field.name]}
                  className={`w-[300px] max-sm:w-[90%] ${formData.styles[field.name].maxscreen} absolute text-center border bg-transparent px-2 py-1 font-semibold dancing-text outline-none border-dashed border-transparent focus:border-black cursor-move`}
                />
              ) : (
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={inputHandler}
                  placeholder={field.placeholder}
                  style={formData.styles[field.name]}
                  className={`w-[300px] max-sm:w-[90%] ${formData.styles[field.name].maxscreen} absolute text-center border bg-transparent px-2 py-1 font-extrabold dancing-text outline-none border-dashed border-transparent focus:border-black cursor-move`}
                />
              )}
            </Draggable>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-center items-center gap-4 mb-4">
        <button onClick={handleSaveCard} className='flex justify-center items-center gap-1 border border-[#ae2c56] bg-[#AB1C49] text-white text-lg py-2 px-4 rounded-sm transition duration-200 ease-in hover:bg-[#822846]'> <FaSave/> Save</button>
      </div>

      {resultData.isActive && (
        <div className="w-full flex justify-center items-center gap-4 mb-4 max-sm:px-2">
          <Link to={resultData.url} target="_blank" className="text-blue-600 text-base hover:underline hover:text-green-600">{resultData.url}</Link>
        </div>
      )}
    </div>
  );
};

export default EditWeddingInvitation;
