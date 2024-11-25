import React, { useEffect } from 'react'
import Header from '../components/section/Header'
import Navbar from '../components/section/Navbar'
import BlogSection from '../components/home-com/BlogSection'
import ContactForm from '../components/common/ContactForm'
import Footer from '../components/section/Footer'

const BlogCategory = () => {
  const scrollToDiv = (id) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
    };

    useEffect(() => {
    document.title = "Blogs - Category"
    scrollToDiv("blogs");
  }, []);

  return (
    <div id='blogs' className='w-full flex flex-col'>
        <Header/>
        <Navbar/>

        <BlogSection/>
        <ContactForm/>
        <Footer/>
    </div>
  )
}

export default BlogCategory