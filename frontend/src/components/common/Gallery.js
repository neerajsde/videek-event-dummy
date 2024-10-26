import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import axios from "axios";

const Gallery = () => {
  const [galleryData, setGalleryData] = useState(null);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows:true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  const getGalleyCategory = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/gallery`);

      if (response.data.success) {
        setGalleryData(response.data.data);
      } else {
        setGalleryData(null);
      }
    } catch (error) {
      setGalleryData(null);
    }
  };

  useEffect(() => {
    if (!galleryData) {
      getGalleyCategory();
    }
  }, []);

  return (
    <div className='w-full flex flex-col p-8 max-md:p-6 max-sm:p-4 gap-8 bg-white'>
      <div className='w-full flex justify-center items-center'>
        <h2 className=' text-2xl max-sm:text-lg font-bold'>Gallery to Look for</h2>
      </div>
      <section className="gallery-section px-8 pr-10 max-sm:px-6">
        <Slider {...settings} className="w-full">
            {
              galleryData && galleryData.map((item) => (
                    <Link 
                        key={item._id} 
                        to={`/gallery/${item.category.replaceAll(' ','-').toLowerCase()}`}
                        className='w-[250px] p-4 flex flex-col shadow rounded gap-4 group'
                        // Add gap between slider items
                        >
                        <div className="w-full h-[260px] max-sm:h-[240px] rounded overflow-hidden">
                            <img 
                                src={`${process.env.REACT_APP_BASE_URL}/gallery${item.images[0]}`} 
                                alt={item.category} 
                                className='w-full h-full object-cover rounded transition duration-300 ease-in-out group-hover:transition-transform group-hover:scale-105' 
                            />
                        </div>
                        <div className='w-full flex justify-center items-center mt-2 text-base font-semibold text-gray-500 group-hover:text-[#f03b9e]'>
                            {item.category}
                        </div>
                    </Link>
                ))
            }
        </Slider>
      </section>
    </div>
  );
}

export default Gallery;
