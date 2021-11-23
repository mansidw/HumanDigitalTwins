import React,{useEffect, useContext, useState} from 'react'
import { UserContext } from '../../contexts/UserProvider';
import { logOut } from '../../services/firebase';
import { useNavigate } from "react-router-dom"
import '../../assets/css/login.css'
import '../../assets/css/tailwind.css'
import { useAuth } from '../../contexts/EmailContext';



const Logout = () => {
    const navigate = useNavigate()
    const user = useContext(UserContext);
    const {currentUser} = useAuth();
    if (user){
        alert(user['uid'])
    }
    else if(currentUser){
        alert(currentUser.uid)
    }
    return (
    <div className='App'>
        <button
            className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
            type="button" onClick={logOut}
        >
            <img
            alt="..."
            className="w-5 mr-1"
            src={require("../../assets/img/google.svg").default}
            />          
        </button> 
    </div>
    )
    
    
    // useEffect(()=>{
        
    //     if(!user){
    //         setX("/login")
    //     }
    // },[user])

    // if(x){
    //     navigate(x)
    // }
    
}

export default Logout