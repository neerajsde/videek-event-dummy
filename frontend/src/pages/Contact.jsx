import React, { useEffect } from "react";
import Header from "../components/section/Header";
import Navbar from "../components/section/Navbar";
import Footer from "../components/section/Footer";
import SuperHeading from "../components/common/SuperHeading";
import ContactForm from "../components/common/ContactForm";

const Contact = () => {

  const scrollToDiv = (id) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
    };

    useEffect(() => {
    document.title = "Contact Us"
    scrollToDiv("contact");
  }, []);

  return (
    <div id="contact" className="w-full h-full flex flex-col items-center">
      <Header />
      <Navbar />
      <SuperHeading title={"Contact Us"} />

      <ContactForm />

      <div className="w-full ">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.4749262685896!2d77.03514317380679!3d28.435096493022115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d186d9353c93d%3A0xfa0e71ded1a5422d!2sSector%2038%20Rd%2C%20Islampur%20Village%2C%20Sector%2038%2C%20Gurugram%2C%20Haryana%20122022!5e0!3m2!1sen!2sin!4v1728560830099!5m2!1sen!2sin"
          height="300"
          className="w-full"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
