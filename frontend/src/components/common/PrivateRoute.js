import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const PrivateRoute = ({children}) => {
    const {isLoggedIn, setIsActiveLoginPage} = useContext(AppContext);

    if(isLoggedIn){
        return children;
    }
    else{
        setIsActiveLoginPage(true);
        return <Navigate to={'/'}/>
    }
}

export default PrivateRoute