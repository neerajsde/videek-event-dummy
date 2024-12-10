import React, { useContext, useEffect } from 'react'
import Navbar from '../components/section/Navbar'
import Header from '../components/section/Header'
import Footer from '../components/section/Footer'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Privacy = () => {
    const { webData } = useContext(AppContext);

    const scrollToDiv = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        document.title = 'Our Privacy Policy'
        scrollToDiv("privacy");
    }, []);

    return (
        <div id='privacy' className='w-full flex flex-col'>
            <Header />
            <Navbar />

            <div className='w-full flex flex-col p-8 max-sm:p-4 max-md:p-6'>
                <h2 className='text-black font-semibold text-xl max-sm:text-lg'>Privacy Policy</h2>
                <p className='text-lg text-gray-500 max-sm:text-base'>At {webData?.title}, we are committed to protecting your privacy and ensuring the security of your personal data. This Privacy Policy outlines how we collect, use, and protect the information you provide to us through our platform.</p>

                <ol className='w-full flex flex-col'>
                    <li className='text-black font-semibold text-lg mt-4'>Information We Collect</li>
                    <ul className='list-disc pl-6'>
                        <li>We collect personal information such as your name, email address, phone number, and any other details you provide when creating an account or contacting us.</li>
                        <li>We may also collect non-personal information such as browser type, device details, and website usage patterns for analytics purposes.</li>
                    </ul>

                    <li className='text-black font-semibold text-lg mt-4'>How We Use Your Information</li>
                    <ul className='list-disc pl-6'>
                        <li>To provide and improve our services, including user support and vendor matchmaking.</li>
                        <li>To communicate with you regarding your account, inquiries, or service updates.</li>
                        <li>To analyze user behavior and enhance the platform's functionality and user experience.</li>
                        <li>To send you promotional materials or newsletters, with your consent.</li>
                    </ul>

                    <li className='text-black font-semibold text-lg mt-4'>Sharing Your Information</li>
                    <ul className='list-disc pl-6'>
                        <li>We do not sell or rent your personal information to third parties.</li>
                        <li>We may share your information with vendors and service providers for the purpose of fulfilling your requests.</li>
                        <li>We may disclose your information to comply with legal obligations or protect our rights and safety.</li>
                    </ul>

                    <li className='text-black font-semibold text-lg mt-4'>Data Security</li>
                    <ul className='list-disc pl-6'>
                        <li>We implement appropriate technical and organizational measures to protect your data from unauthorized access, alteration, or disclosure.</li>
                        <li>While we strive to protect your information, no method of transmission or storage is 100% secure. We encourage you to take precautions to protect your own data.</li>
                    </ul>

                    <li className='text-black font-semibold text-lg mt-4'>Cookies and Tracking Technologies</li>
                    <ul className='list-disc pl-6'>
                        <li>Our website uses cookies and similar technologies to enhance your browsing experience and gather usage data.</li>
                        <li>You can manage your cookie preferences through your browser settings. However, disabling cookies may affect your ability to use some features of the platform.</li>
                    </ul>

                    <li className='text-black font-semibold text-lg mt-4'>Your Rights</li>
                    <ul className='list-disc pl-6'>
                        <li>You have the right to access, correct, or delete your personal information stored on our platform.</li>
                        <li>You may opt out of receiving marketing communications at any time by following the unsubscribe instructions provided in our emails.</li>
                    </ul>

                    <li className='text-black font-semibold text-lg mt-4'>Third-Party Links</li>
                    <ul className='list-disc pl-6'>
                        <li>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these websites.</li>
                        <li>We recommend reviewing the privacy policies of any third-party sites you visit.</li>
                    </ul>

                    <li className='text-black font-semibold text-lg mt-4'>Changes to This Privacy Policy</li>
                    <ul className='list-disc pl-6'>
                        <li>{webData?.title} reserves the right to update this Privacy Policy at any time. Any changes will be communicated through updates on this page.</li>
                        <li>We encourage users to review this policy periodically to stay informed about how we protect their data.</li>
                    </ul>

                    <li className='text-black font-semibold text-lg mt-4'>Contact Information</li>
                    <ul className='list-disc pl-6'>
                        <li>If you have any questions or concerns regarding this Privacy Policy, please contact us at <Link to={`mailto:${webData?.email}`} className="text-blue-500">{webData?.email}</Link>.</li>
                    </ul>
                </ol>
            </div>

            <Footer />
        </div>
    )
}

export default Privacy