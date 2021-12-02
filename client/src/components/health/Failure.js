import React, { useContext, useState, useRef, useEffect} from 'react';
import { useNavigate } from "react-router-dom"
import {useAuth} from "../../contexts/EmailContext"
import "../../assets/css/healthmain.css"
import { UserContext } from '../../contexts/UserProvider';
import Stack from '@mui/material/Stack';
import back from "../../assets/img/fail2.png"
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
    
function handleSubmit(e,cal){
    e.preventDefault();
    alert(weight)
    
    if((weight<=60 || weight<=100) && cal<=500 ){
        setArr((old)=>[...old,{'name':'Aerobics, general'},{'name':'Aerobics, high impact'},{'name':'Archery'},
        {'name':'Badminton'},{'name':'Ballroom dancing, fast'},{'name':'Bathing dog'},{'name':'BadBoxing, punching bagminton'},{'name':'Canoeing, rowing, light'},
        {'name':'Carrying moderate loads upstairs'},{'name':'Cross country skiing, moderate'},{'name':'BadmintCycling, 10-11.9mph, lighton'}])
    }
    else if((weight<=60 || weight<=100) && cal>=500){
        alert("yea")
        setArr((old)=>[...old,{'name':'Fire fighter, climbing ladder, full gear'},{'name':'Football, competitive'},{'name':'Forestry, ax chopping, fast'},
        {'name':'Handball'},{'name':'Judo, karate, jujitsu, martial arts'},{'name':'Jumping rope, moderate'},{'name':'Kick boxing'},{'name':'Orienteering'},
        {'name':'Paddleball, competitive'},{'name':'Running, 7.5mph (8 min mile)'},{'name':'Shoveling, digging ditches'}])
    }
    else {

        setArr((old)=>[...old,{'name':'Aerobics, step aerobics'},{'name':'Ballet, twist, jazz, tap'},{'name':'Basketball, shooting baskets'},
        {'name':'Carrying 25 to 49 lbs, upstairs'},{'name':'Cleaning gutters'},{'name':'Crew, sculling, rowing, competition'},{'name':'Cycling, 16-19mph, very fast, racing'},{'name':'Forestry, trimming trees'},
        {'name':'Gymnastics'},{'name':'Hunting, small game'},{'name':'Kayaking'}])
    }
    // return <FailureCards arr={arr}/>
    // const metsRef = firestore.collection('mets');
    // const snapshot = await metsRef.where('Value', '<=','3.0').orderBy('Value').limit(3).get();
    // if (snapshot.empty) {
    //     console.log('No matching documents.');
    // }  

    // snapshot.forEach(doc => {
    //     console.log(doc.id, '=>', doc.data());
    //     console.log(doc)
    //     setArr((old)=>[...old,{'name':doc.data()['Specific Motion'],'id':doc.id}])
    // });
    // navigate('/')
    
}


const fillcaldb = async (id)=>{
    const res = await firestore.collection('balances').doc(id).delete();
    navigate('/')
}

    
    return (
        <>
            <div className="div1">
                <div className="div2">
                    <h1 className='head1'>Aww Follow Gump!</h1>
                    <div className="div3">
                        <div className="div4">
                        <p style={{fontSize: "1.25em", lineHeight: "1.4", marginTop: "-5px"}}>
                            You have extra calories 😬 but NO WORRIES 🤗 just tell us the time you have and then do any of these activities and attain Zen 😌
                        </p>
                        
                            
                        </div>
                        <div className="div5">
                            <form onSubmit={(e)=>handleSubmit(e,props.cal)}>
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
                    <Button variant="contained" type="button" onClick={()=>fillcaldb(props.id)} style={{width:'150px',height:'60px',fontFamily:'inherit',fontWeight:'bold',fontSize:'20px',backgroundColor:'darkblue',color:'white',marginTop:'15px'}}>Back to Home</Button>  
                        
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

