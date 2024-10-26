import React from 'react'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link to={'/'}>
      <img
        src={logo} 
        alt='LOGO'
        className='w-[150px] max-lg:w-[100px]'
      />
    </Link>
  )
}

export default Logo