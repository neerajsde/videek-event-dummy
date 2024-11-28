import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'

const Logo = () => {
  const { webData } = useContext(AppContext);

  return (
    <Link to={'/'}>
      <img
        src={`${process.env.REACT_APP_BASE_URL}/webImg${webData?.logo}`}
        alt='LOGO'
        className='w-[150px] max-lg:w-[100px]'
      />
    </Link>
  )
}

export default Logo