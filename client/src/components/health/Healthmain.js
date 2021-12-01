import React, { useContext, useState, useRef} from 'react';
import "../../assets/css/healthmain.css"
import { UserContext } from '../../contexts/UserProvider';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import back from "../../assets/img/health3.png"
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { NavigationMenu, Header } from '../basic/Header'
import EatenCard from './EatenCard';
import axios from 'axios'
import Box from '@mui/material/Box';
import { firestore } from '../../services/firebase';
import { useNavigate } from "react-router-dom"


const Healthmain = () => {
    const[arr,setArr] = useState([]);
    const[cal,setCal] = useState(0)
    const foodRef = useRef()
    const quantRef = useRef()
    const currencyRef = useRef()
    const navigate = useNavigate()
    const user = useContext(UserContext)

////////////////////////////////////// for Header ///////////////////////////////    
    
    const[navOpen,setNavOpen] = useState(false)
    const[navIsAnimating,setNavIsAnimating] = useState(false)
    const loggedInUser = {'GET JOBS':'/jobs','MY PRODUCTIVITY':'/','MY PROFILE':'/myprofile','HOW WE WORK?':'/','HOME':'/'}
 
    const toggleNav = (event) => {
        event.preventDefault();

        if (event) event.preventDefault();
        setNavIsAnimating(true)
        if (navOpen) document.body.classList.remove('nav-open');
        if (!navOpen) document.body.classList.add('nav-open');
        setTimeout(() => {
            setNavIsAnimating(false)
            setNavOpen((navOpen)=>!navOpen)
        }, 500);
      };
    
      const openNav = (event) => {
        if (event) event.preventDefault();
        document.body.classList.add('nav-open');
        setNavOpen(true)
      };
    
      const closeNav = () => {
        document.body.classList.remove('nav-open');
        setNavOpen(false)
      };
////////////////////////////////////// for Header ///////////////////////////////    
const quantity = [
    {
      value: 'bar',
      label: 'bar',
    },
    {
        value: 'bowl',
        label: 'bowl',
      },
    {
        value: 'cup',
        label: 'cup',
      },
      {
        value: 'glass',
        label: 'glass',
      },
      {
        value: 'jar',
        label: 'jar',
      },
      {
        value: 'plate',
        label: 'plate',
      },
      {
        value: 'serving',
        label: 'serving',
      },
      {
        value: 'slice',
        label: 'slice',
      },
      {
        value: 'tablespoon',
        label: 'tablespoon',
      },
      {
        value: 'kgs',
        label: 'kgs',
      },
      {
        value: 'gms',
        label: 'gms',
      },
      {
        value: 'just number',
        label: 'just number',
      },
    
  ];

const fillcaldb=async ()=>{
  console.log(cal)
  const res = await firestore.collection('balances').add({
    user:user['uid'],
    food:cal,
    exercise:0
  });
  
  console.log('Added document with ID: ', res.id);
  navigate(`/health/exercisecalories/${res.id}`)
  
}

async function handleSubmit(event){
    event.preventDefault();
    var query = `${quantRef.current.value} ${currencyRef.current.value} of ${foodRef.current.value}`
    console.log(query)
    // console.log(foodRef.current.value)
    const res = await axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients', { 'query':query }, {
      headers: {
        'x-app-id': '8f6d6929',
        'x-app-key':'320f4fcb8d9537a8aafb58d95f06d166',
        'x-remote-user-id':'0'
      }
    });
    console.log(res.data['foods'][0]['nf_calories'])
    setCal((x)=>x+res.data['foods'][0]['nf_calories'])
    setArr((oldval)=>
        [...oldval,{'name':foodRef.current.value,'quant':quantRef.current.value,'scoop':currencyRef.current.value}]
    )
}



    return (
        <div className="layout">
            
            <Header
                navOpen={navOpen}
                toggleNavHandler={event => toggleNav(event)}
                navIsAnimating={navIsAnimating}
            />
            <NavigationMenu
                a="1"
                tabs={loggedInUser}
                navOpen={navOpen}
                navIsAnimating={navIsAnimating}
                closeNav={event => closeNav(event)}
                toggleNavHandler={event => toggleNav(event)}
            />
            
            <div className="div1">
                <div className="div2">
                    <h1 className='head1'>Whatcha Eating?</h1>
                    <div className="div3">
                        <div className="div4">
                        <p style={{fontSize: "1.25em", lineHeight: "1.4", marginTop: "-5px"}}>
                            Just fill in the boxes to tell us what you had and how much. (Don't forget to include the cheat dishes 😁)
                            So I ate a hearty ❤️ meal of ....
                        </p>
                        
                            
                        </div>
                        <div className="div5">
                                <form onSubmit={handleSubmit}>
                                    <Stack direction="row" spacing={2}>
                                        <div><TextField style={{marginTop:'20px',width:'200px'}} id="outlined-basic" label="What?" variant="outlined" inputRef={foodRef} /></div>
                                
                                        <div><TextField style={{marginTop:'20px',width:'200px'}} type="number" id="outlined-basic" label="How much?" variant="outlined" inputRef={quantRef} /></div>
                                    
                                        <div>
                                            <TextField
                                            id="outlined-select-currency"
                                            select
                                            label="Measure"
                                            inputRef={currencyRef}
                                            style={{marginTop:'20px',width:'120px'}}
                                            >
                                            {quantity.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                                </MenuItem>
                                            ))}
                                            </TextField>
                                        </div>
                                        <div><Button variant="contained" type="submit" style={{width:'150px',height:'60px',fontFamily:'inherit',fontWeight:'bold',fontSize:'20px',backgroundColor:'darkblue',color:'white',marginTop:'15px'}}>Done</Button></div>
                                        {/* <div><Button variant="contained" onClick={()=>alert('yes')} style={{width:'150px',height:'60px',fontFamily:'inherit',fontWeight:'bold',fontSize:'20px',backgroundColor:'darkblue',color:'white',marginTop:'15px'}}>Let's Balance</Button></div> */}
                                    </Stack>
                                </form>
                        
                        </div>
                        
                    </div>
                        <h1 style={{fontSize:'30px'}}>Your calorie intake is <span style={{lineHeight:'50px',fontWeight:'bold'}}>{cal}</span> calories!</h1>
                        <Box sx={{ width:'50%',marginLeft:'350px', marginTop:'70px' }}>
                          
                            <EatenCard arr={arr}/>
                          
                        </Box>
                        <Button variant="contained" onClick={()=>fillcaldb()} style={{width:'150px',height:'60px',fontFamily:'inherit',fontWeight:'bold',fontSize:'20px',backgroundColor:'darkblue',color:'white',marginTop:'15px'}}>Let's Balance</Button>
                        
                        
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
        </div>
    )
}

export default Healthmain

