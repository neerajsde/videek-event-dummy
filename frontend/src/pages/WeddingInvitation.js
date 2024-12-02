import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/section/Header'
import Navbar from '../components/section/Navbar'
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../components/spinner/Spinner';
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
import { AppContext } from '../context/AppContext';
import EditWeddingInvitation from './EditWeddingInvitation';

const WeddingInvitation = () => {
    const { isLoggedIn, userData, setIsActiveLoginPage } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [cardData, setCardData] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [isActiveEditCard, setIsActiveEditCard] = useState(false);

    const fetchAllCards = async (ID) => {
        try{
            setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/einvites/card/${ID}`);
            const data = await response.json();
            if(data.success){
                setCardData(data.data);
            }
            else{
                setCardData(null);
                console.log(data);
            }
        } catch(err){
            setCardData(null);
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        const Id = location.pathname.split('/').at(-1);
        fetchAllCards(Id);
    },[location.pathname]);

    const editorHandler = () => {
        if(isLoggedIn && userData && cardData){
            setIsActiveEditCard(true);
        }
        else{
            setIsActiveLoginPage(true);
        }
    }

  return (
    <div className='w-full flex flex-col bg-neutral-200'>
        <Header/>
        <Navbar/>

        <div className={`w-full ${isActiveEditCard ? 'hidden' : 'flex'}`}>
            {
                loading ?
                (<div className='w-full h-[300px] flex justify-center items-center'><Spinner/></div>) 
                :
                cardData ?
                (
                    <div className='w-full flex justify-center items-center py-4 gap-8 relative max-sm:flex-col'>
                        <div className=' absolute top-2 left-2'>
                            <button onClick={() => navigate(-1)} className='flex justify-center items-center gap-2 border py-1 px-3 border-gray-600 bg-gray-400 rounded-sm'>
                                <IoMdArrowRoundBack/> Back
                            </button>
                        </div>
                        <div className='max-sm:w-full max-sm:px-2 flex max-sm:pt-8'>
                            <img
                                src={`${process.env.REACT_APP_BASE_URL}/invitationsCard${cardData.dummy_img}`}
                                alt='card'
                                className='w-[400px] max-sm:w-full h-auto object-cover'
                            />
                        </div>
                        <div>
                            <button onClick={editorHandler} className='flex justify-center items-center gap-1 border border-[#ae2c56] bg-[#AB1C49] text-white text-lg py-2 px-4 rounded-sm transition duration-200 ease-in hover:bg-[#822846]'> <MdModeEditOutline/> Customise the card</button>
                        </div>
                    </div>
                ) 
                :
                (
                    <div className='w-full h-[300px] flex justify-center items-center text-xl font-semibold text-gray-400'>Empty Cards</div>
                )
            }
        </div>

        {isActiveEditCard && (<EditWeddingInvitation data={cardData} fun={setIsActiveEditCard} />)}
    </div>
  )
}

export default WeddingInvitation