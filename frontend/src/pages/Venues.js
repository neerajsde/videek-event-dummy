import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Headers from "../components/section/Header";
import Navbar from "../components/section/Navbar";
import Footer from "../components/section/Footer";
import Spinner from "../components/spinner/Spinner";
import AllVenueImg from "../assets/all_venue.jpg";
import { Link, useLocation } from "react-router-dom";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { AppContext } from "../context/AppContext";

const Venues = () => {
  const { contactHandler } = useContext(AppContext);
  const [venues, setVenues] = useState([]);
  const [venuesCatgory, setVenuesCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currTab, setCurrTab] = useState("all");
  const location = useLocation();

  const fetchPopularVenues = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/venue/popular`
      );
      if (response.data.success) {
        setVenues(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Failed to fetch venues.");
    }
  };

  const fetchVenuesWithCategory = async (category) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/venue-category/${category}`
      );
      if (response.data.success) {
        setVenuesCategory(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Failed to fetch venues.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currTab === "all") {
      fetchVenuesWithCategory("all");
    } else {
      fetchVenuesWithCategory(currTab);
    }
  }, [currTab]);

  useEffect(() => {
    if (location.hash) {
      setCurrTab(location.hash.replace("#", ""));
    }
  }, [location.hash]);

  useEffect(() => {
    fetchPopularVenues();
  }, []);

  const scrollToDiv = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    document.title = "Venue Types";
    scrollToDiv("venetypes");
  }, []);

  return (
    <div id="venetypes" className="w-full flex flex-col">
      <Headers />
      <Navbar />

      <div className="w-full flex flex-col px-8 pt-8 gap-8 max-sm:px-4 max-sm:gap-4 max-sm:pt-4">
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col">
            <h2 className="text-xl max-sm:text-lg text-gray-700 font-semibold">
              Venue Types
            </h2>
            <p className="text-sm max-sm:text-xs text-gray-500">
              Showing{" "}
              <strong className="text-gray-600">{venuesCatgory?.length}</strong>{" "}
              results as per your search criteria
            </p>
          </div>
          <button
            onClick={() => setCurrTab("all")}
            className="text-sm font-semibold underline text-gray-700"
          >
            Clear all
          </button>
        </div>

        <div className="w-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 max-sm:gap-2">
          <Link
            to={`#all`}
            className="w-full flex flex-col cursor-pointer items-center justify-center"
          >
            <img
              src={AllVenueImg}
              alt="all"
              className={`w-[100px] h-[100px] max-sm:w-[70px] max-sm:h-[70px] rounded-full object-cover border-4 ${
                currTab === "all" ? "border-red-500" : "border-gray-400"
              }`}
            />
            <div
              className={`text-base max-md:text-sm max-sm:text-xs font-semibold ${
                currTab === "all" ? "text-red-600" : "text-gray-500"
              }`}
            >
              All Venues
            </div>
          </Link>
          {venues &&
            venues.map((item) => (
              <Link
                key={item.id}
                to={`#${item.name
                  .replaceAll(" ", "-")
                  .replace("/", "-")
                  .toLowerCase()}`}
                className="w-full cursor-pointer flex flex-col items-center justify-center"
              >
                <img
                  src={`${process.env.REACT_APP_BASE_URL}/venue${item.img}`}
                  alt={item.image_missing}
                  className={`w-[100px] h-[100px] max-sm:w-[70px] max-sm:h-[70px] rounded-full object-cover border-4 ${
                    currTab ===
                    item.name
                      .replaceAll(" ", "-")
                      .replace("/", "-")
                      .toLowerCase()
                      ? "border-red-500"
                      : "border-gray-400"
                  }`}
                />
                <div
                  className={`text-base max-md:text-sm max-sm:text-xs font-semibold ${
                    currTab ===
                    item.name
                      .replaceAll(" ", "-")
                      .replace("/", "-")
                      .toLowerCase()
                      ? "text-red-600"
                      : "text-gray-500"
                  }`}
                >
                  {item.name}
                </div>
              </Link>
            ))}
        </div>
      </div>

      {!venuesCatgory && loading && (
        <div className="w-full h-[400px] flex justify-center items-center">
          <Spinner />
        </div>
      )}

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-8 gap-6 max-sm:px-2 max-sm:py-4">
        {venuesCatgory ? (
          venuesCatgory.map((item) => (
            <div
              key={item._id}
              className={`w-full shadow-lg border border-gray-200 rounded-xl p-4 gap-2 flex flex-col`}
            >
              <Link
                to={`/venue/${item.type
                  .toLowerCase()
                  .replaceAll(/\s+/g, "-")
                  .replaceAll("/", "-")}/${item.name
                  .toLowerCase()
                  .replaceAll(/\s+/g, "-")}`}
                className="w-full h-[200px] relative"
              >
                <img
                  src={`${process.env.REACT_APP_BASE_URL}/venue${item.img}`}
                  alt="vendor-img"
                  className="w-full h-full object-cover rounded"
                  loading="lazy"
                />
                <div className="w-full h-full absolute top-0 left-0 bg-[#1111] rounded flex justify-between items-end">
                  <div className="m-1 p-1 flex gap-1 items-center justify-center rounded-sm bg-[#111111b3] text-white">
                    <MdOutlinePhotoSizeSelectActual />
                    <span className="text-xs">
                      {item.total_images}
                      <span>+</span>
                    </span>
                  </div>

                  <div className="m-1 p-1 flex gap-1 items-center justify-center rounded-sm bg-[#111111b3] text-white">
                    <span className="text-xs">{item.rooms}</span>
                    <span className="text-xs">Rooms</span>
                  </div>
                </div>
              </Link>

              <div className="w-full flex flex-col gap-1 max-sm:gap-1 relative">
                <span className="text-lg font-semibold text-black">
                  {item.name.length > 40
                    ? `${item.name.slice(0, 40)}...`
                    : item.name}
                </span>
                <div className="w-full flex justify-between items-center">
                  <p className="text-base text-black">{item.type}</p>
                  <p className="text-base font-bold text-black">
                    {item.price_range}
                  </p>
                </div>
                <p className="text-sm text-gray-500">{item.location}</p>
              </div>

              <div className="w-full flex justify-between items-center gap-2">
                <div className="w-full flex items-center justify-start gap-1">
                  <div className="flex justify-start items-center">
                    {Array.from(
                      { length: Math.floor(item.avg_ratings) },
                      (_, index) => (
                        <FaStar
                          key={index}
                          className="text-base text-[#ffc107]"
                        />
                      )
                    )}
                    {item.avg_ratings.split(".").at(1) != 0 && (
                      <FaStarHalfAlt className="text-base text-[#ffc107]" />
                    )}
                  </div>
                  <span className="text-sm text-gray-400">
                    {item.avg_ratings}
                  </span>
                </div>
                <button
                  onClick={() => contactHandler(item._id)}
                  className="w-full border border-[#AB1C49] text-[#AB1C49] py-1 rounded-sm font-normal transition duration-300 ease-in hover:bg-[#AB1C49] hover:text-white flex justify-center items-center gap-2"
                >
                  Send Message
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-center text-2xl font-semibold text-gray-400">
            Empty Vendors
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Venues;
