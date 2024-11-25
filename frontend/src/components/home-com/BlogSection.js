import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Spinner from '../spinner/Spinner'

const BlogSection = () => {
  const [blogsData, setBlogsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currBlog, setCurrBlog] = useState({
    category: "latest",
    data: null,
  });

  const location = useLocation();
  useEffect(() => {
    if(location.hash && blogsData){
      const categoryName = location.hash.replace('#','').replaceAll('-',' ');
      for(let i=0; i<blogsData.length; i++){
        if(blogsData[i].category === categoryName){
          setCurrBlog({
            category: categoryName,
            data: blogsData[i].blogs
          })
        }
      }
    }
  },[location.hash, blogsData]);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 5,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const settings2 = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
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

  const getBlogsCategory = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/blogs`
      );

      if (response.data.success) {
        setBlogsData(response.data.data);
        setCurrBlog({
          category: response.data.data[0].category,
          data: response.data.data[0].blogs,
        })
      } else {
        setBlogsData(null);
      }
    } catch (error) {
      setBlogsData(null);
    } finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBlogsCategory();
  }, []);

  if(isLoading){
    return (
      <div className="w-full flex flex-col justify-center items-center gap-2">
        <Spinner/>
        <h2 className="text-2xl font-semibold text-gray-400">We try to get blogs data...</h2>
      </div>
    )
  }

  if(!blogsData){
    return (
      <div className="text-2xl font-semibold text-gray-400">...Empty Blogs</div>
    )
  }

  return (
    <div className="w-full flex flex-col py-8 px-8 gap-8 max-md:gap-4 max-md:px-6 max-sm:px-4 max-sm:py-4">
      <div className="w-full flex justify-start px-12 max-md:px-0 ">
        <div className="w-full flex flex-col gap-1">
          <h2 className="text-2xl max-md:text-lg font-bold text-black">
            Inspirations & Blogs
          </h2>
          <p className="text-base max-md:text-sm max-sm:text-xs font-normal text-gray-500">
            Get tips and ideas on latest and interesting wedding trends
          </p>
        </div>
      </div>
      <section className="blog-section px-8 pr-10 max-md:px-0 max-md:pr-0">
        <Slider {...settings}>
          {blogsData &&
            blogsData.map((blog, idx) => (
              <div
                id={idx}
                onClick={() =>
                  setCurrBlog({ category: blog.category, data: blog?.blogs })
                }
                className="flex flex-col items-center group"
              >
                <div
                  className={`w-[100px] h-[100px] max-sm:w-[70px] max-sm:h-[70px] rounded-full cursor-pointer ${
                    currBlog.category.toLowerCase() ===
                    blog.category.toLowerCase()
                      ? "border-4 border-[#AB1C49]"
                      : "border-[3px] border-transparent"
                  }`}
                >
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}/blogImg/category/${blog.category.toLowerCase().replace(' ','_')}.png`}
                    alt={blog.category}
                    className="w-full h-full rounded-full object-cover mx-auto"
                  />
                </div>
                <span
                  className={`w-[150px] text-lg max-md:text-base max-sm:text-sm font-noremal text-center cursor-pointer ${
                    currBlog.category.toLowerCase() ===
                    blog.category.toLowerCase()
                      ? "text-black"
                      : "text-gray-400 transition duration-300 ease-in group-hover:underline"
                  }`}
                >
                  {blog.category}
                </span>
              </div>
            ))}
        </Slider>
      </section>
      <section className="blog-card px-8 pr-10 max-sm:px-4">
        <Slider {...settings2}>
          {currBlog.data &&
            currBlog.data.map((blog) => (
              <Link
                key={blog?.id}
                to={`/blog/${blog?.uId}`}
                className="w-[350px] flex flex-col bg-white rounded-lg shadow-md border gap-2"
              >
                <div className="w-full h-[200px] max-sm:h-[150px] rounded-lg">
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}/blogImg${blog?.img}`}
                    alt="blog_img"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="w-full flex flex-col p-4 gap-4 max-sm:gap-2 max-sm:p-2">
                  <p className="text-base max-sm:text-sm font-extrabold text-black">
                    {blog?.title}
                  </p>
                  <div className="w-full flex flex-col">
                    <span className="text-sm font-semibold text-gray-600 uppercase">
                      {blog?.category}
                    </span>
                    <span className="text-xs font-medium text-gray-400">
                      {blog?.dateTime}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
        </Slider>
      </section>
    </div>
  );
};

export default BlogSection;
