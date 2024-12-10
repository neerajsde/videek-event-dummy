import React, { useContext, useEffect } from 'react'
import Navbar from '../components/section/Navbar'
import Header from '../components/section/Header'
import Footer from '../components/section/Footer'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TermsConditions = () => {
    const {webData} = useContext(AppContext);

    const scrollToDiv = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        document.title = 'Our Terms and Conditions'
        scrollToDiv("terms");
    }, []);

  return (
    <div id='terms' className='w-full flex flex-col'>
        <Header/>
        <Navbar/>

        <div className='w-full flex flex-col p-8 max-sm:p-4 max-md:p-6'>
            <h2 className='text-black font-semibold text-xl max-sm:text-lg'>Terms and Conditions</h2>
            <p className='text-lg text-gray-500 max-sm:text-base'>Welcome to {webData?.title}, your trusted wedding planning platform. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. If you do not agree to these terms, please refrain from using the website.</p>

            <ol className='w-full flex flex-col'>
                <li className='text-black font-semibold text-lg mt-4'>General Terms</li>
                <ul className='list-disc pl-6'>
                    <li>{webData?.title} serves as an intermediary platform to list vendors, venues, and other wedding-related services. The website itself does not provide any services or products but facilitates connections between users and service providers.</li>
                    <li>By using this website, you confirm that you are at least 18 years old or are using the website under the supervision of a parent or legal guardian.</li>
                </ul>

                <li className='text-black font-semibold text-lg mt-4'>User Responsibilities</li>
                <ul className='list-disc pl-6'>
                    <li>Users are responsible for maintaining the confidentiality of their account details and ensuring that all activities under their account comply with these terms.</li>
                    <li>Users must not upload or share false, misleading, or inappropriate content.</li>
                    <li>Users are encouraged to provide honest feedback about vendors but must refrain from posting defamatory or abusive reviews.</li>
                </ul>

                <li className='text-black font-semibold text-lg mt-4'>Vendor and Service Listings</li>
                <ul className='list-disc pl-6'>
                    <li>Vendors and service providers listed on the platform are independent third parties. {webData?.title} does not guarantee the quality, reliability, or performance of any services provided.</li>
                    <li>All negotiations, contracts, and transactions are strictly between the user and the vendor.</li>
                </ul>

                <li className='text-black font-semibold text-lg mt-4'>Payments and Bookings</li>
                <ul className='list-disc pl-6'>
                    <li>{webData?.title} does not handle payments directly. Users must verify payment terms and conditions with vendors before proceeding with transactions.</li>
                    <li>{webData?.title} is not responsible for any disputes related to payments or refunds.</li>
                </ul>

                <li className='text-black font-semibold text-lg mt-4'>Content and Intellectual Property</li>
                <ul className='list-disc pl-6'>
                    <li>All content on the website, including text, images, logos, and graphics, is the property of {webData?.title} or its licensors and is protected under intellectual property laws.</li>
                    <li>Users may not reproduce, distribute, or use website content without prior written consent.</li>
                </ul>

                <li className='text-black font-semibold text-lg mt-4'>Limitation of Liability</li>
                <ul className='list-disc pl-6'>
                    <li>{webData?.title} is not liable for any direct, indirect, incidental, or consequential damages resulting from the use of the platform.</li>
                    <li>{webData?.title} does not guarantee the accuracy or completeness of information provided by vendors.</li>
                </ul>

                <li className='text-black font-semibold text-lg mt-4'>Termination of Use</li>
                <ul className='list-disc pl-6'>
                    <li>{webData?.title} reserves the right to terminate or suspend access to the website for users who violate these terms or engage in fraudulent activities.</li>
                </ul>

                <li className='text-black font-semibold text-lg mt-4'>Privacy Policy</li>
                <ul className='list-disc pl-6'>
                    <li>Refer to our Privacy Policy for information about how we collect, use, and protect your personal data.</li>
                </ul>

                <li  className='text-black font-semibold text-lg mt-4'>Changes to Terms</li>
                <ul className='list-disc pl-6'>
                    <li>{webData?.title} reserves the right to update these terms and conditions at any time. Continued use of the platform constitutes acceptance of the updated terms.</li>
                </ul>

                <li className='text-black font-semibold text-lg mt-4'>Contact Information</li>
                <ul className='list-disc pl-6'>
                    <li>For any queries or support, please contact us at <Link to={`mailto:${webData?.email}`} className="text-blue-500">{webData?.email}</Link>.</li>
                </ul>
            </ol>
        </div>

        <Footer/>
    </div>
  )
}

export default TermsConditions
