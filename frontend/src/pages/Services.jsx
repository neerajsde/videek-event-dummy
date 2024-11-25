import React, { useEffect, useState } from "react";
import Header from "../components/section/Header";
import Navbar from "../components/section/Navbar";
import SuperHeading from "../components/common/SuperHeading";
import { Link, useLocation } from "react-router-dom";
import ModernContactUs from "../components/common/ModernContactUs";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Footer from "../components/section/Footer";
import LeftMenu from "../components/section/LeftMenu";
import toast from "react-hot-toast";
import Spinner from "../components/spinner/Spinner";
import EmptyImg from '../assets/empty-banner.jpg';

const Services = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [servicesData, setServicesData] = useState({});
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [pageName, setPageName] = useState(
    location.pathname.split("/").at(-1).replaceAll("-", " ")
  );

  useEffect(() => {
    setPageName(location.pathname.split("/").at(-1).replaceAll("-", " "));
  }, [location]);

  const breadcrumbSegments = location.pathname.split("/");

  const getServiceByName = async (serviceName) => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/services/${serviceName}`, {
        method: "GET",
      });

      const result = await response.json();
      if (result.success) {
        setServicesData(result.data);
      } else {
        setServicesData(null);
      }
    } catch (err) {
      setServicesData(null);
      toast.error("Error fetching the service");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const serviceName = location.pathname.split("/").at(-1);
    getServiceByName(serviceName); 
  }, [location.pathname]);


  const scrollToDiv = (id) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
      document.title = `${location.pathname.split("/").at(-1).replaceAll('-', ' ').toUpperCase()}`
      scrollToDiv("toview");
  }, [location.pathname]);

  useEffect(() => {
    scrollToDiv("services");
  },[])

  return (
    <div id="services" className="w-full h-full flex flex-col items-center">
      <Header />
      <Navbar />
      <SuperHeading title={pageName} />

      {/* Breadcrumb Section */}
      <div className="w-full flex justify-start items-center gap-2 px-8 py-6 max-md:px-4 max-sm:gap-1">
        <Link
          to="/"
          className="text-base max-sm:text-sm font-medium text-gray-600 transition duration-200 ease-in hover:text-[#AB1C49] hover:underline"
        >
          Home
        </Link>

        {breadcrumbSegments.length > 3 && (
          <>
            <span>
              <MdKeyboardDoubleArrowRight className="text-lg max-sm:text-base" />
            </span>
            <div className="text-base max-sm:text-sm capitalize font-medium text-gray-600">
              {breadcrumbSegments.at(-3).replaceAll("-", " ")}
            </div>
          </>
        )}

        {breadcrumbSegments.length > 2 && (
          <>
            <span>
              <MdKeyboardDoubleArrowRight className="text-lg max-sm:text-base" />
            </span>
            <div className="text-base max-sm:text-sm max-sm:hidden capitalize font-medium text-gray-600">
              {breadcrumbSegments.at(-2).replaceAll("-", " ")}
            </div>
            <div className="text-base max-sm:text-sm sm:hidden capitalize font-medium text-gray-600">
              ...
            </div>
          </>
        )}

        {pageName !== "" && (
          <div className="flex items-center gap-2 max-sm:gap-1">
            <span>
              <MdKeyboardDoubleArrowRight className="text-lg max-sm:text-base" />
            </span>
            <span className="text-base max-sm:text-sm capitalize font-medium text-gray-600 transition duration-200 ease-in">
              {pageName}
            </span>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-full flex justify-between items-start max-md:flex-col gap-4">
        <LeftMenu pageName={pageName} />

        <div id="toview" className="w-[700px] max-md:w-full max-lg:w-[600px] max-md:px-4 flex flex-col items-start">
          {/* Content Block */}

          {loading ? (
            <div className="w-full h-[300px] flex justify-center items-center">
              <Spinner />
            </div>
          ) : servicesData ? (
            <div className="w-full rounded-xl">
              <div className="w-full h-[300px]">
                <img
                  src={`${baseUrl}${servicesData.img}`}
                  alt={servicesData.name}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <div className="w-full flex flex-col py-4">
                <h2 className="text-lg font-semibold">{servicesData.title}</h2>
                <p
                  className="text-base text-black"
                  dangerouslySetInnerHTML={{ __html: servicesData.description }}
                ></p>
              </div>
            </div>
          ) : (
            <div className="w-full h-[500px] flex flex-col justify-center items-center gap-2">
              <img src={EmptyImg} alt="Empty Not Found" className="w-[300px]"/>
              <h2 className="text-2xl font-bold text-gray-500">Not Found</h2>
            </div>
          )}
        </div>

        {/* Sticky Contact Us Form */}
        <div className="sticky top-[80px] max-md:w-full p-4">
          <ModernContactUs />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Services;
