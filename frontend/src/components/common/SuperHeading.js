import React from 'react';
import AboutBannerImg1 from '../../assets/about-banner.jpeg'
import AboutBannerImg2 from '../../assets/couple-img/couple-2.jpg'
import AboutBannerImg3 from '../../assets/about-banner.avif'

const SuperHeading = ({title}) => {
  return (
    <div className='w-full h-[250px] max-md:h-[200px] max-lg:h-[220px] relative flex'>
        <img src={AboutBannerImg2} alt='about-banner' loading='lazy' className='w-full h-full object-cover'/>
        <img src={AboutBannerImg1} alt='about-banner' loading='lazy' className='w-full h-full object-cover max-sm:hidden'/>
        <img src={AboutBannerImg3} alt='about-banner' loading='lazy' className='w-full h-full object-cover max-lg:hidden'/>

        <div className='absolute capitalize top-0 left-0 w-full h-full bg-[#00000084] flex justify-center items-center text-white text-5xl max-lg:text-3xl max-md:text-2xl font-bold'>{title}</div>
    </div>
  )
}

export default SuperHeading