import React, { useContext, useState, useRef, useEffect} from 'react';
import { useNavigate } from "react-router-dom"
import {useAuth} from "../../contexts/EmailContext"
import "../../assets/css/healthmain.css"
import { UserContext } from '../../contexts/UserProvider';
import Stack from '@mui/material/Stack';
import back from "../../assets/img/fail1.png"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { firestore } from '../../services/firebase';
import FailureCards from './FailureCards';


const Failure = (props) => {
    const user = useContext(UserContext)
    const navigate = useNavigate()
    const timeRef = useRef()
    const[weight,setWeight] = useState(0)
    const[arr,setArr] = useState([])
    const { currentUser } = useAuth()

useEffect(async ()=>{
    const userRef = firestore.collection('users').doc(currentUser.uid);
    const doc = await userRef.get();
    if (!doc.exists) {
        console.log('No such document!');
    } else {
        setWeight(doc.data()['weight'])
    }
    
},[])
    
const handleSubmit =async (cal)=>{
    let met = cal/(timeRef.current.value*weight)
    alert(weight,met)
    const metsRef = firestore.collection('mets');
    const snapshot = await metsRef.where('Value', '<=','3').get();
    if (snapshot.empty) {
        console.log('No matching documents.');
    }  

    snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        setArr((old)=>[...old,{'name':doc.data()['Specific Motion'],'id':doc.id}])
    });
}


const fillcaldb = async (id)=>{
    const res = await firestore.collection('balances').doc(id).delete();
    navigate('/')
}

    
    return (
        <>
            <div className="div1">
                <div className="div2">
                    <h1 className='head1'>Aww Snap Follow Gump!</h1>
                    <div className="div3">
                        <div className="div4">
                        <p style={{fontSize: "1.25em", lineHeight: "1.4", marginTop: "-5px"}}>
                            You have extra calories 😬 but NO WORRIES 🤗 just tell us the time you have and then do any of these activities and attain Zen 😌
                        </p>
                        
                            
                        </div>
                        <div className="div5">
                            <form onSubmit={()=>handleSubmit(props.cal)}>
                                <Stack direction="row" spacing={2}>
                            
                                    <div><TextField style={{marginTop:'20px',width:'200px'}} type="number" id="outlined-basic" label="How much?" variant="outlined" inputRef={timeRef} /></div>
                                    <div><Button variant="contained" type="submit" style={{width:'150px',height:'60px',fontFamily:'inherit',fontWeight:'bold',fontSize:'20px',backgroundColor:'darkblue',color:'white',marginTop:'15px'}}>Go Ahead</Button></div>
                                    
                                </Stack>
                            </form>
                        </div>
                        
                        
                    </div>
                    <h1 style={{fontSize:'30px'}}>The calories you still need to burn is <span style={{lineHeight:'50px',fontWeight:'bold'}}>{props.cal}</span> calories!</h1>
                    <Box sx={{ width:'50%',marginLeft:'350px', marginTop:'70px' }}>
                        <FailureCards arr={arr}/>
                    </Box>
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

export default Failure;

