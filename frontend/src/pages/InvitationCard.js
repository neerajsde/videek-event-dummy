import React, { useEffect, useState } from 'react'
import Header from '../components/section/Header'
import Navbar from '../components/section/Navbar'
import { useLocation } from 'react-router-dom'
import Spinner from '../components/spinner/Spinner'

const InvitationCard = () => {
    const location = useLocation();
    const [cardData, setCardData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('nbvf');

    const fetchCardData = async (cardId) => {
        try{
            setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/invitation/${cardId}`);
            const data = await response.json();
            if(data.success){
                setCardData(data.data);
            }
            else{
                setCardData(null);
                setError(data.message);
            }
        } catch(err){
            setError(err.message);
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        const id = location.pathname.split('/').at(-1);
        fetchCardData(id);
    },[])

  return (
    <div className='w-full flex flex-col'>
        <Header/>
        <Navbar/>

        {
            loading ? 
            (
                <div className='w-full h-[90vh] flex justify-center items-center'><Spinner/></div>
            ) 
            :
            cardData ?
            (
                <div className='w-full flex justify-center items-center p-6 max-sm:p-4'>
                    <img
                        src={`${process.env.REACT_APP_BASE_URL}/invitation${cardData.cardImg}`}
                        alt="card"
                        className="w-full max-w-[700px] h-auto object-cover shadow-md"
                    />
                </div>
            ) 
            :
            (
                <div className='w-full h-[90vh] flex justify-center items-center text-lg text-gray-500'>{error}</div>
            )
        }
    </div>
  )
}

export default InvitationCard