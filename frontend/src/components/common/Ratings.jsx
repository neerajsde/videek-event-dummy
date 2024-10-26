import React, { useContext, useState, useRef } from "react";
import { AppContext } from "../../context/AppContext";
import { FcRating } from "react-icons/fc";
import { HiOutlineStar, HiStar } from "react-icons/hi2";
import { FaRegImages } from "react-icons/fa6";
import { MdError } from "react-icons/md";
import { VscVerifiedFilled } from "react-icons/vsc";
import toast from "react-hot-toast";
import MdLoader from "../spinner/MdLoader";

const Ratings = () => {
  const baseUrl =
    process.env.REACT_APP_BASE_URL || "http://localhost:5050/api/v1";
  const { setIsOpenRate, isLoggedIn } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [ratingArr, setRatingArr] = useState([
    true,
    false,
    false,
    false,
    false,
  ]);
  const [ratings, setRatings] = useState(1);
  const [error, setError] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    title: "",
    description: "",
  });

  function inputHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
      setImageName(file.name);
    }
  };

  const handleChangeImage = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const ratingHandler = (index) => {
    const newArr = [];
    setRatings(index + 1);
    for (let i = 0; i < 5; i++) {
      if (i <= index) {
        newArr.push(true);
      } else {
        newArr.push(false);
      }
    }
    setRatingArr(newArr);
  };

  const uploadRating = async () => {
    try {
      setIsLoading(true);

      const url = `${baseUrl}/rate/add`;

      // Create a FormData object to handle file uploads
      const formDataX = new FormData();
      formDataX.append("email", isLoggedIn ? "" : formData.email);
      // formDataX.append('user_id', isLoggedIn ? userData.user._id : '');
    //   formDataX.append("product_id", productId);
      formDataX.append("noOfStars", ratings);
      formDataX.append("title", formData.title);
      formDataX.append("description", formData.description);

      // Append the file to FormData
      if (file) {
        formDataX.append("file", file);
      }

      const response = await fetch(url, {
        method: "POST",
        body: formDataX,
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setError("");
        setSubmitMessage(data.message);
      } else {
        setError(data.message);
        setSubmitMessage("");
      }
    } catch (err) {
      setSubmitMessage("");
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[500px] h-full bg-white p-4 max-sm:w-full">
      <div className="w-full flex flex-col items-center gap-4">
        <h1 className="w-full flex justify-center items-center gap-1 text-lg font-medium">
          <FcRating className="text-2xl" />
          Give Ratings
        </h1>

        {!isLoggedIn && (
          <label className="w-full flex flex-col gap-1">
            <p className="text-md font-medium">
              Email<span className="text-lg text-red-500">*</span>
            </p>
            <input
              type="email"
              placeholder="enter email address"
              required
              name="email"
              value={formData.email}
              onChange={inputHandler}
              className="w-full text-md font-semibold border-none bg-gray-200 py-2 px-4 outline-2 rounded-sm focus:outline-green-600"
            />
          </label>
        )}

        <label className="w-full flex flex-col gap-1">
          <p className="text-md font-medium">
            Heading<span className="text-lg text-red-500">*</span>
          </p>
          <input
            type="text"
            placeholder="Enter title of rating"
            required
            name="title"
            value={formData.title}
            onChange={inputHandler}
            className="w-full text-md font-semibold border-none bg-gray-200 py-2 px-4 outline-2 rounded-sm focus:outline-green-600"
          />
        </label>

        <label className="w-full flex flex-col gap-1">
          <p className="text-md font-medium">
            Description<span className="text-lg text-red-500">*</span>
          </p>
          <textarea
            type="text"
            rows={2}
            name="description"
            value={formData.description}
            onChange={inputHandler}
            placeholder="Write review about the product"
            className="w-full text-md font-semibold border-none bg-gray-200 py-2 px-4 outline-2 rounded-sm focus:outline-green-600"
          />
        </label>

        <div
          className="w-full flex items-center justify-start gap-4 px-4 py-2 border-2 border-dashed rounded-md border-gray-300 cursor-pointer"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
        >
          <FaRegImages
            className={`text-gray-400 ${
              uploadedImage ? "text-4xl" : "text-2xl"
            }`}
          />
          {uploadedImage ? (
            <div className="w-full flex justify-between items-center">
              <div className="w-full flex flex-col items-start justify-center">
                <p>{imageName}</p>
                <button
                  className="text-sm border font-semibold rounded py-1 px-2 bg-slate-400 border-black"
                  onClick={handleChangeImage}
                >
                  Change Image
                </button>
              </div>
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="w-[80px] max-h-[80px] object-cover"
              />
            </div>
          ) : (
            <p className="text-md font-semibold text-gray-400">
              upload or select image
            </p>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        <div className="w-full flex items-center justify-evenly">
          <div className="flex items-center gap-4">
            <div
              className="text-2xl cursor-pointer"
              onClick={() => ratingHandler(0)}
            >
              {ratingArr[0] ? (
                <HiStar className="text-orange-500" />
              ) : (
                <HiOutlineStar />
              )}
            </div>
            <div
              className="text-2xl cursor-pointer"
              onClick={() => ratingHandler(1)}
            >
              {ratingArr[1] ? (
                <HiStar className="text-orange-500" />
              ) : (
                <HiOutlineStar />
              )}
            </div>
            <div
              className="text-2xl cursor-pointer"
              onClick={() => ratingHandler(2)}
            >
              {ratingArr[2] ? (
                <HiStar className="text-orange-500" />
              ) : (
                <HiOutlineStar />
              )}
            </div>
            <div
              className="text-2xl cursor-pointer"
              onClick={() => ratingHandler(3)}
            >
              {ratingArr[3] ? (
                <HiStar className="text-orange-500" />
              ) : (
                <HiOutlineStar />
              )}
            </div>
            <div
              className="text-2xl cursor-pointer"
              onClick={() => ratingHandler(4)}
            >
              {ratingArr[4] ? (
                <HiStar className="text-orange-500" />
              ) : (
                <HiOutlineStar />
              )}
            </div>
          </div>
          <div className="flex items-center gap-1 text-md font-medium border px-4 bg-gray-300 rounded">
            <span className="text-lg font-bold text-green-600">{ratings}</span>{" "}
            Stars
          </div>
        </div>

        {error !== "" && (
          <div className="w-full flex items-center justify-start border border-red-600 bg-red-200 py-1 px-2 gap-2">
            <MdError className="text-xl" />
            <div className="text-md font-semibold">{error}</div>
          </div>
        )}

        <button
          onClick={() => uploadRating()}
          className="w-full text-lg font-bold text-white rounded uppercase flex items-center justify-center gap-4 py-2 bg-slate-600 transition duration-300 ease-in-out hover:bg-slate-800"
        >
          Submit {isLoading && <MdLoader />}
        </button>

        {submitMessage !== "" && (
          <div className="w-full flex items-center justify-start border border-green-600 bg-green-200 py-1 px-2 gap-2">
            <VscVerifiedFilled className="text-xl" />
            <div className="text-md font-semibold">{submitMessage}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ratings;
