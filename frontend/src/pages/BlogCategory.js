import React from 'react'
import Header from '../components/section/Header'
import Navbar from '../components/section/Navbar'
import BlogSection from '../components/home-com/BlogSection'
import ContactForm from '../components/common/ContactForm'
import Footer from '../components/section/Footer'

const BlogCategory = () => {
  return (
    <div className='w-full flex flex-col'>
        <Header/>
        <Navbar/>

        <BlogSection/>
        <ContactForm/>
        <Footer/>
    </div>
  )
}

export default BlogCategory