import React, { useState } from "react";
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
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import VendorReviews from "./VendorReviews";
import { BsThreeDotsVertical } from "react-icons/bs";

const VendorPage = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpenImg, setIsOpenImg] = useState(false);
  const [currentIndexReview, setCurrentIndexReview] = useState(0);
  const [vendorReviewId, setVendorReviewId] = useState(0);

  // Map images to lightbox-compatible format
  const slides = data.albums.map((img) => ({
    src: `${process.env.REACT_APP_BASE_URL}/vendor${img}`,
  }));

  const slides2 = data?.reviews[vendorReviewId]?.images.map((img) => ({
    src: `${process.env.REACT_APP_BASE_URL}/vendor${img}`,
  }));

  return (
    <div className="w-full flex flex-col bg-[#ececec]">
      <div className="w-full flex justify-start items-start gap-8 p-8">
        <div className="w-full flex flex-col gap-4">
          <div className="w-full h-[500px] flex flex-col relative">
            <div className="w-full h-[400px] shadow-lg">
              <img
                src={`${process.env.REACT_APP_BASE_URL}${data.img}`}
                alt="vendor-img"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="w-full absolute bottom-[0px] left-0 px-8">
              <div className="w-full flex flex-col bg-white shadow-sm shadow-gray-500">
                <div className="w-full flex justify-between p-4">
                  <div className="flex flex-col gap-2">
                    <h2 className="flex justify-start items-center gap-2">
                      <span className="text-2xl text-black font-semibold">
                        {data.name}
                      </span>{" "}
                      <MdVerified className="text-blue-500 text-xl" />
                    </h2>

                    <Link className="flex gap-2 items-center">
                      <FaPhone className="text-teal-600" />
                      <span className="text-base font-semibold text-teal-600">
                        Contact
                      </span>
                    </Link>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-center items-center rounded-sm gap-2 bg-green-500 p-2 text-white">
                      <IoStar />
                      <span>{data.avg_ratings}</span>
                    </div>
                    <div className="flex justify-start items-center gap-2">
                      <span>{data.total_reviews}</span>reviews
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-between items-center bg-[#ececec]">
                  <button className="w-full py-2 flex justify-center items-center text-gray-500 text-base gap-1">
                    <HiPhoto className="text-lg" />
                    <span>{data.albums.length}</span>
                    <span>Photos</span>
                  </button>
                  <div className="w-[4px] h-[30px] bg-gray-300"></div>
                  <button className="w-full py-2 flex justify-center items-center text-gray-500 text-base gap-1">
                    <SlHeart className="text-lg" />
                    <span>{data.albums.length}</span> {/* need to change */}
                    <span>Shortlist</span>
                  </button>
                  <div className="w-[4px] h-[30px] bg-gray-300"></div>
                  <button className="w-full py-2 flex justify-center items-center text-gray-500 text-base gap-1">
                    <LiaPenNibSolid className="text-lg" />
                    <span>Write a Review</span>
                  </button>
                  <div className="w-[4px] h-[30px] bg-gray-300"></div>
                  <button className="w-full py-2 flex justify-center items-center text-gray-500 text-base gap-1">
                    <BsShare className="text-lg" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[800px] flex flex-col gap-4">
          <div className="bg-white p-2">
            <MContactUs2 />
          </div>
        </div>
      </div>

      <div className="w-full px-8 pb-8">
        <div className="w-full flex flex-col bg-white shadow-sm shadow-gray-400 p-4 gap-4">
          <div className="w-full flex justify-between items-center">
            <h2 className="text-xl font-semibold text-black">{`Albums (${data.albums.length})`}</h2>
            <Link className="text-base text-[#AB1C49] flex items-center gap-1">
              View All <MdKeyboardArrowRight className="text-xl" />
            </Link>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {data.albums &&
              data.albums.map((img, index) => (
                <img
                  key={index}
                  src={`${process.env.REACT_APP_BASE_URL}/vendor${img}`}
                  alt={`Wedding image ${index + 1}`}
                  className="w-full h-[150px] object-cover cursor-pointer"
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsOpen(true);
                  }}
                />
              ))}
          </div>

          {isOpen && (
            <Lightbox
              open={isOpen}
              close={() => setIsOpen(false)}
              slides={slides}
              index={currentIndex}
              onIndexChange={setCurrentIndex}
            />
          )}
        </div>
      </div>

      <div className="w-full px-8 pb-8">
        <div className="w-full flex flex-col bg-white shadow-sm shadow-gray-400 p-4 gap-4">
          <div className="w-full flex justify-between items-center">
            <h2 className="text-xl font-semibold text-black">{`Vendor's YouTube Videos (${data.ytLinksLength})`}</h2>
            <Link className="text-base text-[#AB1C49] flex items-center gap-1">
              View All <MdKeyboardArrowRight className="text-xl" />
            </Link>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.youtube_links &&
              data.youtube_links.map((item, index) => (
                <iframe
                  width="100%"
                  height="200"
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

      <div className="w-full flex px-8 gap-4">
        <div className="w-full flex flex-col bg-white shadow-sm shadow-gray-400 p-4 gap-4">
          <div className="w-full flex justify-between items-center ">
            <h2 className="text-xl font-semibold text-black">
              <span>{`(${data.total_reviews})`} </span> Reviews & Ratings
            </h2>
            <Link className="text-base text-[#AB1C49] flex items-center gap-1">
              View All <MdKeyboardArrowRight className="text-xl" />
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
                          src={item.user_img}
                          alt=""
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center justify-start gap-1">
                          <span className="text-base font-semibold">
                            {item.user_name}
                          </span>
                          {item.user_Verified && (
                            <span className="text-blue-500">
                              <MdVerified />
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-start gap-1">
                          <span className="text-xs text-gray-400">{`Reviewed ${item.date}`}</span>
                          <div className="flex justify-center items-center rounded-sm gap-1 bg-green-500 px-1 text-white text-sm">
                            <IoStar className="text-sm" />
                            <span>{item.stars}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-[40px] h-[40px] flex justify-center items-center rounded-full cursor-pointer transition duration-200 ease-in hover:bg-gray-200">
                      <BsThreeDotsVertical className="text-xl" />
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">{item.comment}</div>
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-4">
                    {item.images &&
                      item.images.map((img, index) => (
                        <img
                          key={index}
                          src={`${process.env.REACT_APP_BASE_URL}/vendor${img}`}
                          alt={`Review image ${index + 1}`}
                          className="w-full h-[50px] object-cover cursor-pointer"
                          onClick={() => {
                            setCurrentIndexReview(index);
                            setVendorReviewId(vId);
                            setIsOpenImg(true);
                          }}
                        />
                      ))}
                  </div>
                  {isOpenImg && vendorReviewId === vId && (
                    <Lightbox
                      open={isOpenImg}
                      close={() => setIsOpenImg(false)}
                      slides={slides2}
                      index={currentIndexReview}
                      onIndexChange={setCurrentIndexReview}
                    />
                  )}
                </div>
              ))}
          </div>
        </div>
        <div className="w-[800px] gap-4">
          {/* Review  */}
          <VendorReviews data={data} />
        </div>
      </div>
      {/* FAQs  */}
      <div className="w-full flex flex-col px-8 py-8">
        <div className="w-full flex flex-col bg-white shadow-sm shadow-gray-400 p-4 gap-4">
          <h2 className="text-xl text-gray-700 font-semibold">
            FAQ about <span className="text-black">{data.name}</span>
          </h2>
          <div className="w-full flex flex-col gap-2">
            {data.FAQs &&
              data.FAQs.map((item, index) => (
                <div className="w-full flex flex-col bg-gray-100 rounded p-2">
                  <h2 className="text-lg text-gray-700 font-semibold">
                    {item.question}
                  </h2>
                  <p
                    className="text-base text-gray-600"
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
