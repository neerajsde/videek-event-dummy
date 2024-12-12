import React, { useContext } from "react";
import MContactUs2 from "./MContactUs2";
import { MdVerified } from "react-icons/md";
import { IoStar } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { HiPhoto } from "react-icons/hi2";
import { BsShare } from "react-icons/bs";
import { LiaPenNibSolid } from "react-icons/lia";
import { SlHeart } from "react-icons/sl";
import { MdKeyboardArrowRight } from "react-icons/md";
import VendorReviews from "./VendorReviews";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AppContext } from "../../context/AppContext";

const VendorPage = ({ data }) => {
  const { setImageViewActive } = useContext(AppContext);

  return (
    <div className="w-full flex flex-col bg-[#ececec]">
      <div className="w-full flex justify-start items-start gap-8 p-8 max-lg:gap-4 max-lg:p-4 max-sm:px-2 max-sm:pb-2 max-md:flex-col">
        <div className="w-full flex flex-col gap-4">
          <div className="w-full h-[500px] max-lg:h-[400px] flex flex-col relative">
            <div className="w-full h-[400px] shadow-lg max-lg:h-[300px]">
              <img
                src={`${process.env.REACT_APP_BASE_URL}${data.img}`}
                alt="vendor-img"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="w-full absolute bottom-[0px] left-0 px-8 max-lg:px-2 max-md:px-4 max-sm:px-2">
              <div className="w-full flex flex-col bg-white shadow-sm shadow-gray-500">
                <div className="w-full flex justify-between items-start p-4 max-sm:p-2">
                  <div className="w-full flex justify-start max-sm:items-center gap-4 max-sm:gap-1">
                    {data && (
                      <div className="w-[100px] h-[100px] max-sm:w-[50px] max-sm:h-[50px] flex justify-center items-center border-2 border-yellow-600 rounded-lg">
                        <img
                          src={
                            data.user_img === ""
                              ? `https://api.dicebear.com/5.x/initials/svg?seed=${data.name}`
                              : `${process.env.REACT_APP_BASE_URL}${data.user_img}`
                          }
                          alt={data.name}
                          className="w-full h-full object-cover rounded-md"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="flex flex-col gap-2 max-sm:gap-0">
                      <h2 className="flex justify-start items-center gap-2 max-sm:gap-1">
                        <span className="text-2xl text-black font-semibold max-sm:text-lg">
                          {data.name}
                        </span>{" "}
                        <MdVerified className="text-blue-500 text-xl max-sm:text-base" />
                      </h2>

                      <Link className="flex gap-2 items-center">
                        <FaPhone className="text-teal-600 max-sm:text-sm" />
                        <span className="text-base max-sm:text-sm font-semibold text-teal-600">
                          Contact
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex justify-center items-center rounded-sm gap-2 bg-green-500 p-2 max-sm:py-1 max-sm:gap-1 text-white">
                      <IoStar className="max-sm:text-base" />
                      <span className="max-sm:text-sm">{data.avg_ratings}</span>
                    </div>
                    <div className="flex justify-start items-center gap-2">
                      <span>{data.total_reviews}</span>reviews
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-between items-center bg-[#ececec]">
                  <button className="w-full py-2 flex justify-center items-center text-gray-500 text-base max-lg:text-sm gap-1">
                    <HiPhoto className="text-lg" />
                    <span>{data.albums.length}</span>
                    <span className="max-sm:hidden">Photos</span>
                  </button>
                  <div className="w-[4px] h-[30px] bg-gray-300"></div>
                  <button className="w-full py-2 flex justify-center items-center text-gray-500 text-base max-lg:text-sm gap-1">
                    <SlHeart className="text-lg" />
                    <span className="max-sm:hidden">Shortlist</span>
                  </button>
                  <div className="w-[4px] h-[30px] bg-gray-300"></div>
                  <button className="w-full py-2 flex justify-center items-center text-gray-500 text-base max-lg:text-xs max-md:text-sm gap-1">
                    <LiaPenNibSolid className="text-lg" />
                    <span className="max-sm:hidden">Write a Review</span>
                  </button>
                  <div className="w-[4px] h-[30px] bg-gray-300"></div>
                  <button className="w-full py-2 flex justify-center items-center text-gray-500 text-base max-lg:text-sm gap-1">
                    <BsShare className="text-lg" />
                    <span className="max-sm:hidden">Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[800px] max-md:w-full max-lg:w-[600px] flex flex-col gap-4">
          <div className="bg-white p-2">
            <MContactUs2
              vendorData={{ name: data.name, category: data.category }}
            />
          </div>
        </div>
      </div>

      <div className="w-full px-8 pb-8 max-lg:px-4 max-lg:pb-4 max-sm:px-2 max-sm:pb-2">
        <div className="w-full flex flex-col bg-white shadow-sm shadow-gray-400 p-4 gap-4">
          <div className="w-full flex justify-between items-center">
            <h2 className="text-xl font-semibold text-black max-md:text-base">{`Albums (${data.albums.length})`}</h2>
            <Link className="text-base max-sm:text-sm text-[#AB1C49] flex items-center gap-1">
              View All{" "}
              <MdKeyboardArrowRight className="text-xl max-sm:text-base" />
            </Link>
          </div>
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 grid-rows-5 md:grid-rows-2 sm:grid-rows-3 gap-4">
            {data.albums &&
              data.albums.map((img, index) => (
                <img
                  key={index}
                  src={`${process.env.REACT_APP_BASE_URL}/vendor${img}`}
                  alt={`Wedding image ${index + 1}`}
                  className="w-full h-[150px] max-sm:h-[120px] object-cover cursor-pointer"
                  onClick={() => {
                    setImageViewActive({
                      isActive: true,
                      index: index,
                      AllImages: data.albums,
                      dirName: "vendor",
                    });
                  }}
                />
              ))}
          </div>
        </div>
      </div>

      <div className="w-full px-8 pb-8 max-lg:px-4 max-lg:pb-4 max-sm:px-2 max-sm:pb-2">
        <div className="w-full flex flex-col bg-white shadow-sm shadow-gray-400 p-4 gap-4">
          <div className="w-full flex justify-between items-center">
            <h2 className="text-xl font-semibold text-black max-md:text-lg max-sm:text-base">{`Vendor's YouTube Videos (${data.ytLinksLength})`}</h2>
            <Link className="text-base max-sm:text-sm text-[#AB1C49] flex items-center gap-1">
              View All{" "}
              <MdKeyboardArrowRight className="text-xl max-sm:text-sm" />
            </Link>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-3 md:grid-rows-1 gap-4">
            {data.youtube_links &&
              data.youtube_links.map((item, index) => (
                <iframe
                  width="100%"
                  height="220"
                  src={item}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              ))}
          </div>
        </div>
      </div>

      <div className="w-full flex px-8 max-lg:px-4 max-sm:px-2 gap-4 max-sm:gap-2 max-md:flex-col-reverse">
        <div className="w-full flex flex-col bg-white shadow-sm shadow-gray-400 p-4 gap-4">
          <div className="w-full flex justify-between items-center ">
            <h2 className="text-xl font-semibold text-black max-md:text-lg max-sm:text-base">
              <span>{`(${data.total_reviews})`} </span> Reviews & Ratings
            </h2>
            <Link className="text-base text-[#AB1C49] flex items-center gap-1 max-sm:text-sm">
              View All{" "}
              <MdKeyboardArrowRight className="text-xl max-md:text-lg max-sm:text-base" />
            </Link>
          </div>
          <div className="w-full flex flex-col">
            {data.reviews &&
              data.reviews.map((item, vId) => (
                <div
                  key={vId}
                  className="w-full flex flex-col border-y py-4 gap-2"
                >
                  <div className="w-full flex justify-between">
                    <div className="flex justify-start items-center gap-2">
                      <div className="w-[45px] h-[45px] rounded-full border-2 border-gray-300">
                        <img
                          src={
                            item.user_img &&
                            item.user_img.slice(0, 4) !== "http"
                              ? `${process.env.REACT_APP_BASE_URL}${item.user_img}`
                              : `https://api.dicebear.com/5.x/initials/svg?seed=${item?.user_name}`
                          }
                          alt="Profile Pic"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center justify-start gap-1">
                          <span className="text-base font-semibold max-sm:text-sm">
                            {item.user_name}
                          </span>
                          {item.user_Verified && (
                            <span className="text-blue-500 max-sm:text-sm">
                              <MdVerified />
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-start gap-1">
                          <span className="text-xs text-gray-400">{`Reviewed ${item.date}`}</span>
                          <div className="flex justify-center items-center rounded-sm gap-1 bg-green-500 px-1 text-white text-sm max-sm:text-xs">
                            <IoStar className="text-sm max-sm:text-xs" />
                            <span>{item.stars}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-[40px] h-[40px] flex justify-center items-center rounded-full cursor-pointer transition duration-200 ease-in hover:bg-gray-200">
                      <BsThreeDotsVertical className="text-xl" />
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 max-sm:text-xs">
                    {item.comment}
                  </div>
                  <div className="w-full grid grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-4 max-sm:gap-2">
                    {item.images &&
                      item.images.map((img, index) => (
                        <img
                          key={index}
                          src={`${process.env.REACT_APP_BASE_URL}/vendor${img}`}
                          alt={`Review image ${index + 1}`}
                          className="w-full h-[50px] object-cover cursor-pointer"
                          onClick={() => {
                            setImageViewActive({
                              isActive: true,
                              index: index,
                              AllImages: item.images,
                              dirName: "vendor",
                            });
                          }}
                        />
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="w-[800px] max-lg:w-[600px] max-md:w-full gap-4">
          {/* Review  */}
          <VendorReviews data={data} />
        </div>
      </div>
      {/* FAQs  */}
      <div className="w-full flex flex-col px-8 py-8 max-lg:p-4 max-sm:p-2">
        <div className="w-full flex flex-col bg-white shadow-sm shadow-gray-400 p-4 gap-4">
          <h2 className="text-xl text-gray-700 font-semibold max-md:text-lg max-sm:text-base">
            FAQ about <span className="text-black">{data.name}</span>
          </h2>
          <div className="w-full flex flex-col gap-2">
            {data.FAQs &&
              data.FAQs.map((item, index) => (
                <div className="w-full flex flex-col bg-gray-100 rounded p-2">
                  <h2 className="text-lg text-gray-700 font-semibold max-md:text-base max-sm:text-sm">
                    {item.question}
                  </h2>
                  <p
                    className="text-base text-gray-600 max-md:text-sm max-sm:text-xs"
                    dangerouslySetInnerHTML={{ __html: item.answere }}
                  ></p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorPage;
