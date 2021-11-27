import React, { useContext, useState, useRef, useEffect} from 'react';
import {useParams} from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "../../assets/css/healthmain.css"
import { UserContext } from '../../contexts/UserProvider';
import back from "../../assets/img/suc1.png"
import Button from '@mui/material/Button';
import { firestore } from '../../services/firebase';



const Success = (props) => {
    const user = useContext(UserContext)
    const navigate = useNavigate()

    const fillcaldb = async (id)=>{
        const res = await firestore.collection('balances').doc(id).delete();
        navigate('/')
    }

    return (
        <>
            <div className="div1">
                <div className="div2">
                    <h1 className='head1'>Yayy You're Ahead!</h1>
                    <div className="div3">
                        <div className="div4">
                        <p style={{fontSize: "1.25em", lineHeight: "1.4", marginTop: "-5px"}}>
                            Heyy you're flying today 🤘. So sit back have a hearty meal and let the {props.cal} calories flow in, after which come to your twin again 🤩
                        </p>
                        
                            
                        </div>
                        <div className="div5">
                                
                        
                        </div>
                        
                        
                    </div>
                    <h1 style={{fontSize:'30px'}}>The extra calories you've dissipated is <span style={{lineHeight:'50px',fontWeight:'bold'}}>{props.cal}</span> calories!</h1>
                    
                    <Button variant="contained" onClick={()=>fillcaldb(props.id)} style={{width:'150px',height:'60px',fontFamily:'inherit',fontWeight:'bold',fontSize:'20px',backgroundColor:'darkblue',color:'white',marginTop:'15px'}}>Back to Home</Button>  
                        
                    <div className="div7">
                      

                    </div>
                </div>
            </div>
            <div className="col col-image">
                <img
                className="astro"
                src={back}
                height="150px" />
            
            </div>
            </>
    )
}

export default Success;

