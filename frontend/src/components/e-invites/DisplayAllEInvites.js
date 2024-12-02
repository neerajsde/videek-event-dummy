import React, { useEffect, useState } from 'react'
import Spinner from '../spinner/Spinner';
import { Link } from 'react-router-dom';

const DisplayAllEInvites = () => {
    const [loading, setLoading] = useState(false);
    const [cardData, setCardData] = useState(null);

    const fetchAllCards = async () => {
        try{
            setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/einvites/dummy`);
            const data = await response.json();
            if(data.success){
                setCardData(data.data);
            }
            else{
                setCardData(null);
            }
        } catch(err){
            setCardData(null);
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if(!cardData){
            fetchAllCards();
        }
    },[]);

  return (
    <div className='w-full'>
        {
            loading ?
            (<div className='w-full h-[300px] flex justify-center items-center'><Spinner/></div>) 
            :
            cardData ?
            (
                <div className='w-full grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-2'>
                    {
                        cardData && cardData.map((item, index) => (
                            <Link to={item._id} key={item._id} className='w-full h-[400px] max-sm:h-auto relative'>
                                <img
                                    src={`${process.env.REACT_APP_BASE_URL}/invitationsCard${item.dummy_img}`}
                                    alt='card'
                                    className='w-full h-full object-cover'
                                />
                            </Link>
                        ))
                    }
                </div>
            ) 
            :
            (
                <div className='w-full h-[300px] flex justify-center items-center text-xl font-semibold text-gray-400'>Empty Cards</div>
            )
        }
    </div>
  )
}

export default DisplayAllEInvites