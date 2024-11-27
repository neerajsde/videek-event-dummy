import React, { useContext, useState } from "react";
import MdLoader from "../spinner/MdLoader";
import { AppContext } from "../../context/AppContext";
import axios from "axios"

const VenueReviews = ({ data }) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { isLoggedIn, setIsActiveLoginPage, userData } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [experience, setExperience] = useState("");
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState([]);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRating = (index) => {
    setRating(index + 1);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleImageRemove = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const uploadImg = async (index, review_id) => {
    try {
      const formXData = new FormData();
      formXData.append("id", review_id);
      formXData.append("img", images[index]);

      const response = await axios.post(
        `${baseUrl}/venue/review/img-upload`,
        formXData
      );

      if (response.data.success) {
        return "success";
      } else {
        return "error";
      }
    } catch (error) {
      return "something went wrong";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    if (!isLoggedIn) {
      setIsActiveLoginPage(true);
    }

    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/venue/review/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({
          user_id: userData.user_id,
          venue_id: data._id,
          experience: experience,
          rating: rating,
          amount: amount,
        }),
      });
      const responseData = await response.json();
      if (responseData.success) {
        if (images.length > 0) {
          // Sequential Upload Approach (Current)
          for (let index = 0; index < images.length; index++) {
            const res = await uploadImg(index, responseData.review_id);
            if (res !== "success") {
              setSuccess('');
              setError(`Error uploading image ${index + 1}`);
              return;
            }
          }
          setImages([]);
        }
        setSuccess(responseData.message);
        setError('');
      }
      else{
        setSuccess('');
        setError(responseData.message);
      }
    } catch (error) {
      setSuccess('');
      setError("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-col bg-white shadow-sm shadow-gray-400 p-4 gap-4">
        <h2 className="text-xl text-gray-700 font-semibold max-md:text-lg max-sm:text-base">
          Write review about <span className="text-black">{data.name}</span>
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Experience Text Area */}
          <textarea
            placeholder="Tell us about your experience*"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Ratings */}
          <div className="w-full flex max-sm:justify-between items-center gap-2 px-2">
            <span className="text-sm font-medium">Rate*</span>
            <div className="flex justify-center items-center gap-2">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  onClick={() => handleRating(index)}
                  className={`cursor-pointer text-2xl ${
                    rating > index ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* Price Input */}
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="How much did you spend on this venue?"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Image Upload */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Upload Images
            </label>
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              accept="image/*"
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border file:rounded-md file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-100 hover:file:bg-gray-200"
            />
          </div>

          {/* Display Selected Images */}
          {images.length > 0 && (
            <div className="flex flex-wrap gap-4 max-sm:gap-1 mt-2">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="uploaded"
                    className="w-24 h-24 max-sm:w-12 max-sm:h-12 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageRemove(index)}
                    className="absolute top-1 right-1 max-sm:top-[2px] max-sm:right-[2px] bg-red-500 text-white text-xs rounded-full p-1 max-sm:py-0 group-hover:opacity-100 opacity-0 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {
            error !== '' && (<div className="text-xs text-red-500 font-semibold">{error}</div>)
          }

          {
            success !== '' && (<div className="text-xs text-green-500 font-semibold">{success}</div>)
          }

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-[40px] flex justify-center items-center bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition"
          >
            {loading ? <MdLoader /> : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VenueReviews;
