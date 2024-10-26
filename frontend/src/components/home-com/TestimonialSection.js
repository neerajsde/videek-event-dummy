import React, { useEffect, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import banner from "../../assets/testimonialbanner.jpg";

const TestimonialSection = () => {
  const [testimonialData, setTestimonalData] = useState(null);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const fetchTestimonals = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/testimonals`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch testimonals");
      }

      const data = await response.json();
      setTestimonalData(data.data);
    } catch (error) {
      setTestimonalData(null);
    }
  };

  useEffect(() => {
    if(!testimonialData){
      fetchTestimonals();
    }
  },[]);

  if(!testimonialData){
    return(
      <div className="w-full py-2 text-center">
        <h3>...Not Found Testimonals Data</h3>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col justify-evenly items-center px-8 max-sm:px-6 pt-4 pb-20 gap-8 max-sm:gap-2">
      <h2 className="text-4xl max-md:text-xl max-lg:text-2xl font-bold text-black">
        What our customers say
      </h2>
      <div className="w-full h-[400px] max-md:h-[300px] max-sm:h-[350px] flex justify-center items-center relative">
        <img
          src={banner}
          alt="banner"
          className="w-[650px] max-md:hidden rounded-xl max-md:w-full h-full object-cover opacity-50"
          loading="lazy"
        />
        <section className="w-full h-full absolute top-0 left-0 blog-card px-12 max-md:px-8 max-sm:px-2">
          <Slider {...settings}>
            {testimonialData &&
              testimonialData.map((item) => (
                <div
                  key={item._id}
                  className="w-[350px] flex flex-col bg-[#ffffffcd] rounded-xl border border-gray-400 p-4 max-sm:p-2 max-sm:gap-2 gap-4"
                >
                  <FaQuoteLeft className="text-3xl text-[#AB1C49]" />
                  <p className="text-sm max-sm:text-xs max-sm:font-normal font-semibold text-black">{`“${item?.message}”`}</p>
                  <div className="w-full flex justify-between items-center">
                    <div className="flex flex-col items-start">
                      <h4 className="text-base max-sm:text-sm font-bold text-black">
                        {item.user_name}
                      </h4>
                      <span className="text-sm max-sm:text-xs font-normal text-gray-400">{`${item.designation}`}</span>
                    </div>
                    <div className="w-[45px] h-[45px] max-sm:w-[35px] max-sm:h-[35px] rounded-full border-2 border-[#AB1C49]">
                      <img
                        src={item.img}
                        alt="user"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
          </Slider>
        </section>
      </div>
    </div>
  );
};

export default TestimonialSection;
